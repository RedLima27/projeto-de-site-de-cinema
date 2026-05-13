// ============================================================
//  CineDragon — Servidor Node.js / Express (Seguro)
// ============================================================

const express      = require('express');
const mysql        = require('mysql2/promise');
const cors         = require('cors');
const crypto       = require('crypto');
const path         = require('path');
const helmet       = require('helmet');
const rateLimit    = require('express-rate-limit');
const validator    = require('validator');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Security Headers ─────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'"],
      styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:    ["'self'", "https://fonts.gstatic.com"],
      imgSrc:     ["'self'", "data:", "https://image.tmdb.org", "https://media.themoviedb.org", "https://imgs.search.brave.com"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// ── CORS ─────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:3000').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) return cb(null, true);
    cb(new Error('CORS: origem nao permitida'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// ── Body limit ───────────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, '..')));

// ── Rate Limiting ────────────────────────────────────────────
app.use('/api/', rateLimit({ windowMs: 15*60*1000, max: 100, message: { error: 'Muitas requisicoes. Tente em alguns minutos.' } }));
app.use('/api/age-verify', rateLimit({ windowMs: 15*60*1000, max: 20, message: { error: 'Muitas tentativas. Aguarde.' } }));
app.use('/api/tickets',    rateLimit({ windowMs: 15*60*1000, max: 20, message: { error: 'Muitas tentativas. Aguarde.' } }));

// ── MySQL Pool ───────────────────────────────────────────────
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'cinedragon',
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: false,
});

// ── Utils ────────────────────────────────────────────────────
const hashCPF = (cpf) => crypto.createHash('sha256').update(cpf.replace(/\D/g,'')).digest('hex');
const calcAge = (dob) => {
  const [y,m,d] = dob.split('-').map(Number);
  const t = new Date();
  let age = t.getFullYear() - y;
  if (t.getMonth()+1 < m || (t.getMonth()+1===m && t.getDate()<d)) age--;
  return age;
};
const genCode = (p) => p+'-'+Date.now().toString(36).toUpperCase().slice(-4)+'-'+crypto.randomBytes(3).toString('hex').toUpperCase();
const sanitizeStr = (s, max=200) => typeof s==='string' ? validator.escape(s.trim()).slice(0,max) : '';

// ── Validators ───────────────────────────────────────────────
const VALID_CATS  = ['comum','vip','imax'];
const VALID_PAY   = ['pix','credit','debit'];
const VALID_ENTRY = ['inteira','meia-estudante','meia-60'];
const SEAT_RE     = /^[A-O]([1-9]|1[0-2])$/;

function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g,'');
  if (cpf.length!==11 || /^(\d)\1+$/.test(cpf)) return false;
  let s=0; for(let i=0;i<9;i++) s+=+cpf[i]*(10-i);
  let r=11-(s%11); if(r>=10)r=0; if(r!==+cpf[9]) return false;
  s=0; for(let i=0;i<10;i++) s+=+cpf[i]*(11-i);
  r=11-(s%11); if(r>=10)r=0; return r===+cpf[10];
}
function validateDOB(dob) {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return false;
  const d=new Date(dob); if(isNaN(d.getTime())) return false;
  const age=calcAge(dob); return age>=0 && age<=130;
}
function fail(res, msg, status=400) { res.status(status).json({error: msg}); }

// ============================================================
//  FILMES
// ============================================================
app.get('/api/films', async (req,res) => {
  try { const [r]=await db.query('SELECT * FROM films WHERE is_active=1 ORDER BY id'); res.json(r); }
  catch(e) { fail(res,'Erro ao buscar filmes.',500); }
});

app.get('/api/films/soon', async (req,res) => {
  try { const [r]=await db.query('SELECT * FROM soon_films ORDER BY release_date'); res.json(r); }
  catch(e) { fail(res,'Erro ao buscar filmes.',500); }
});

app.get('/api/films/:id', async (req,res) => {
  try {
    const id=parseInt(req.params.id);
    if(!id||id<1) return fail(res,'ID invalido.');
    const [r]=await db.query('SELECT * FROM films WHERE id=? AND is_active=1',[id]);
    if(!r.length) return fail(res,'Filme nao encontrado.',404);
    res.json(r[0]);
  } catch(e) { fail(res,'Erro.',500); }
});

// ============================================================
//  SESSOES
// ============================================================
app.get('/api/sessions', async (req,res) => {
  try {
    const filmId = req.query.filmId ? parseInt(req.query.filmId) : null;
    const date   = req.query.date || null;
    if(filmId && (isNaN(filmId)||filmId<1)) return fail(res,'filmId invalido.');
    if(date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return fail(res,'date invalido.');
    let sql=`SELECT s.*,f.title AS film_title,f.min_age,f.rating FROM sessions s JOIN films f ON f.id=s.film_id WHERE s.is_active=1`;
    const p=[];
    if(filmId){sql+=' AND s.film_id=?';p.push(filmId);}
    if(date){sql+=' AND s.date=?';p.push(date);}
    else sql+=' AND s.date=CURDATE()';
    sql+=' ORDER BY s.start_time';
    const [r]=await db.query(sql,p); res.json(r);
  } catch(e) { fail(res,'Erro.',500); }
});

app.get('/api/sessions/:id/seats', async (req,res) => {
  try {
    const id=parseInt(req.params.id);
    if(!id||id<1) return fail(res,'ID invalido.');
    const [r]=await db.query('SELECT seat_code FROM booked_seats WHERE session_id=?',[id]);
    res.json(r.map(x=>x.seat_code));
  } catch(e) { fail(res,'Erro.',500); }
});

// ============================================================
//  VERIFICACAO DE IDADE
// ============================================================
app.post('/api/age-verify', async (req,res) => {
  try {
    const {filmId,cpf,dob}=req.body;
    const fid=parseInt(filmId);
    if(!fid||fid<1) return res.status(400).json({ok:false,error:'filmId invalido.'});
    if(!cpf||!validateCPF(cpf)) return res.status(400).json({ok:false,error:'CPF invalido.'});
    if(!dob||!validateDOB(dob)) return res.status(400).json({ok:false,error:'Data de nascimento invalida.'});

    const [films]=await db.query('SELECT id,title,min_age,rating FROM films WHERE id=? AND is_active=1',[fid]);
    if(!films.length) return res.status(404).json({ok:false,error:'Filme nao encontrado.'});

    const film=films[0], age=calcAge(dob);
    const minBuy=film.min_age===18?16:Math.max(film.min_age,16);
    let result,message;
    if(age<16){result='blocked';message=`Bloqueado. Minimo 16 anos (voce tem ${age}).`;}
    else if(film.min_age>0&&age<minBuy){result='blocked';message=`Bloqueado. "${film.title}" e ${film.rating} anos.`;}
    else{result='approved';message=film.min_age===0?'Filme livre.':'Acesso liberado.';}

    await db.query('INSERT INTO age_verifications (film_id,cpf_hash,age_years,dob,result) VALUES (?,?,?,?,?)',
      [fid,hashCPF(cpf),age,dob,result]);
    res.json({ok:result==='approved',result,message,age});
  } catch(e) { res.status(500).json({ok:false,error:'Erro.'}); }
});

// ============================================================
//  INGRESSOS
// ============================================================
app.post('/api/tickets', async (req,res) => {
  const conn=await db.getConnection();
  try {
    await conn.beginTransaction();
    const {filmId,sessionId,buyerName,cpf,email,seats,seatTypes,category,paymentMethod}=req.body;

    const fid=parseInt(filmId), sid=parseInt(sessionId);
    if(!fid||fid<1) throw new Error('filmId invalido.');
    if(!sid||sid<1) throw new Error('sessionId invalido.');
    if(!buyerName||typeof buyerName!=='string'||buyerName.trim().length<2) throw new Error('Nome invalido.');
    if(!validateCPF(cpf)) throw new Error('CPF invalido.');
    if(!email||!validator.isEmail(email)) throw new Error('Email invalido.');
    if(!Array.isArray(seats)||!seats.length||seats.length>12) throw new Error('Poltronas invalidas (max 12).');
    if(!VALID_CATS.includes(category)) throw new Error('Categoria invalida.');
    if(!VALID_PAY.includes(paymentMethod)) throw new Error('Pagamento invalido.');
    if(!seats.every(s=>SEAT_RE.test(s))) throw new Error('Codigo de poltrona invalido.');
    if(seatTypes&&typeof seatTypes==='object') {
      for(const [s,t] of Object.entries(seatTypes))
        if(!SEAT_RE.test(s)||!VALID_ENTRY.includes(t)) throw new Error('Tipo de entrada invalido.');
    }

    const [[session]]=await conn.query('SELECT s.*,f.min_age FROM sessions s JOIN films f ON f.id=s.film_id WHERE s.id=?',[sid]);
    if(!session) throw new Error('Sessao nao encontrada.');

    const ph=seats.map(()=>'?').join(',');
    const [already]=await conn.query(`SELECT seat_code FROM booked_seats WHERE session_id=? AND seat_code IN (${ph})`,[sid,...seats]);
    if(already.length) throw new Error(`Poltronas ja ocupadas: ${already.map(r=>r.seat_code).join(', ')}`);

    // Price calculated server-side
    const pm={comum:28,vip:38,imax:46};
    const base=pm[category]; let total=0;
    const items=seats.map(seat=>{
      const t=(seatTypes?.[seat]&&VALID_ENTRY.includes(seatTypes[seat]))?seatTypes[seat]:'inteira';
      const price=t==='inteira'?base:Math.round(base/2);
      total+=price; return {seat,t,price};
    });

    const safeName=sanitizeStr(buyerName,120);
    const safeEmail=validator.normalizeEmail(email)||email;
    const cpfHash=hashCPF(cpf);
    await conn.query('INSERT INTO buyers (full_name,cpf_hash,email) VALUES (?,?,?) ON DUPLICATE KEY UPDATE full_name=VALUES(full_name),email=VALUES(email)',
      [safeName,cpfHash,safeEmail]);
    const [[buyer]]=await conn.query('SELECT id FROM buyers WHERE cpf_hash=?',[cpfHash]);

    const ticketCode=genCode('CD'), foodCode=genCode('BP');
    const [tkt]=await conn.query(
      `INSERT INTO tickets (ticket_code,buyer_id,session_id,category,seat_codes,total_price,payment_method,status,food_code) VALUES (?,?,?,?,?,?,?,'paid',?)`,
      [ticketCode,buyer.id,sid,category,seats.join(', '),total,paymentMethod,foodCode]);
    const tid=tkt.insertId;

    for(const i of items) {
      await conn.query('INSERT INTO ticket_items (ticket_id,seat_code,entry_type,unit_price) VALUES (?,?,?,?)',[tid,i.seat,i.t,i.price]);
    }
    for(const s of seats) {
      await conn.query('INSERT INTO booked_seats (session_id,seat_code,ticket_id) VALUES (?,?,?)',[sid,s,tid]);
    }

    await conn.commit();
    res.json({ok:true,ticketCode,foodCode,totalPrice:total,seats,itemPrices:items});
  } catch(e) {
    await conn.rollback();
    res.status(400).json({ok:false,error:e.message});
  } finally { conn.release(); }
});

app.get('/api/tickets/:code', async (req,res) => {
  try {
    const code=req.params.code;
    if(!/^[A-Z]{2}-[A-Z0-9]+-[A-Z0-9]+$/.test(code)) return fail(res,'Codigo invalido.');
    const [r]=await db.query(
      `SELECT t.*,b.full_name,b.email,f.title AS film_title,f.emoji,
              s.start_time,s.category AS room_category,s.room,s.date AS session_date
       FROM tickets t JOIN buyers b ON b.id=t.buyer_id JOIN sessions s ON s.id=t.session_id JOIN films f ON f.id=s.film_id
       WHERE t.ticket_code=?`,[code]);
    if(!r.length) return fail(res,'Ingresso nao encontrado.',404);
    const [items]=await db.query('SELECT seat_code,entry_type,unit_price FROM ticket_items WHERE ticket_id=?',[r[0].id]);
    res.json({...r[0],items});
  } catch(e) { fail(res,'Erro.',500); }
});

// ============================================================
//  BOMBONIERE
// ============================================================
app.post('/api/snacks', async (req,res) => {
  const conn=await db.getConnection();
  try {
    await conn.beginTransaction();
    const {buyerName,cpf,items,paymentMethod}=req.body;
    if(!buyerName||typeof buyerName!=='string'||buyerName.trim().length<2) throw new Error('Nome invalido.');
    if(!validateCPF(cpf)) throw new Error('CPF invalido.');
    if(!Array.isArray(items)||!items.length||items.length>20) throw new Error('Itens invalidos.');
    if(!VALID_PAY.includes(paymentMethod)) throw new Error('Pagamento invalido.');
    for(const i of items) {
      if(typeof i.name!=='string'||i.name.length>100) throw new Error('Item invalido.');
      if(!Number.isInteger(i.qty)||i.qty<1||i.qty>20) throw new Error('Quantidade invalida.');
      if(typeof i.unitPrice!=='number'||i.unitPrice<0||i.unitPrice>1000) throw new Error('Preco invalido.');
    }
    const total=items.reduce((s,i)=>s+i.unitPrice*i.qty,0);
    const orderCode=genCode('BP');
    const [result]=await conn.query(
      `INSERT INTO snack_orders (order_code,buyer_name,cpf_hash,total_price,payment_method,status) VALUES (?,?,?,?,?,'paid')`,
      [orderCode,sanitizeStr(buyerName,120),hashCPF(cpf),total,paymentMethod]);
    for(const i of items) {
      await conn.query('INSERT INTO snack_order_items (order_id,snack_name,quantity,unit_price) VALUES (?,?,?,?)',
        [result.insertId,sanitizeStr(i.name,80),i.qty,i.unitPrice]);
    }
    await conn.commit();
    res.json({ok:true,orderCode,totalPrice:total});
  } catch(e) {
    await conn.rollback();
    res.status(400).json({ok:false,error:e.message});
  } finally { conn.release(); }
});

// ============================================================
//  HEALTH
// ============================================================
app.get('/api/health', async (req,res) => {
  try { await db.query('SELECT 1'); res.json({ok:true,db:'connected',time:new Date().toISOString()}); }
  catch(e) { res.status(503).json({ok:false,db:'error'}); }
});

app.use('/api/*', (req,res) => res.status(404).json({error:'Endpoint nao encontrado.'}));

app.listen(PORT, () => {
  console.log(`✅  CineDragon API rodando em http://localhost:${PORT}`);
  console.log(`📋  Health: http://localhost:${PORT}/api/health`);
});