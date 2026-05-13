/* ── CONFIG ── */
const API_URL = window.location.origin;

/* ── DATA ── */
const FILMS = [
  {id: 1, theme: "michael", accentColor: "#c4a000", accentBg: "rgba(196,160,0,.13)", title: "Michael", genre: "Biopic / Musical", rating: "12", minAge: 12, emoji: "🎤", dur: "2h 08min", year: 2026,
   dir: "Antoine Fuqua", cast: "Jaafar Jackson, Colman Domingo, Nia Long, Miles Teller",
   desc: "A cinebiografia definitiva do Rei do Pop. O filme acompanha a trajetória de Michael Jackson desde sua infância em Gary, Indiana, passando pelo sucesso dos Jackson 5 nos anos 70, até se tornar o maior artista pop do mundo nos anos 80. Interpretado pelo sobrinho real Jaafar Jackson.",
   img: "https://image.tmdb.org/t/p/w500/2FYFBgdNVVaUgVfNSh9z5WVTZ9y.jpg"},
  {id: 2, theme: "mario", accentColor: "#e53935", accentBg: "rgba(229,57,53,.13)", title: "Super Mario Galaxy: O Filme", genre: "Animação / Aventura", rating: "L", minAge: 0, emoji: "🍄", dur: "1h 39min", year: 2026,
   dir: "Aaron Horvath, Michael Jelenic", cast: "Chris Pratt, Anya Taylor-Joy, Charlie Day",
   desc: "Mario e seus aliados embarcam em uma aventura galáctica após salvar o Reino dos Cogumelos. Cheio de ação e emoção para toda a família, o filme expande o universo do encanador mais famoso do mundo até as estrelas.",
   img: "https://image.tmdb.org/t/p/w500/b3WeTp42eJSRuE4UZfyPCOJW4c.jpg"},
  {id: 3, theme: "prada", accentColor: "#e91e8c", accentBg: "rgba(233,30,140,.13)", title: "O Diabo Veste Prada 2", genre: "Comédia / Drama", rating: "12", minAge: 12, emoji: "👠", dur: "2h 05min", year: 2026,
   dir: "David Frankel", cast: "Meryl Streep, Anne Hathaway, Emily Blunt",
   desc: "Miranda Priestly e Andy Sachs retornam em uma nova era da moda digital. Com as redes sociais transformando a indústria, a editora da Runway precisa se reinventar enquanto enfrenta uma rivalidade inesperada. Meryl Streep está mais deslumbrante do que nunca.",
   img: "https://image.tmdb.org/t/p/w500/50yWyY981TyUHhoxxSEKwO70FmQ.jpg"},
  {id: 4, theme: "exit8", accentColor: "#00e676", accentBg: "rgba(0,230,118,.1)", title: "Exit 8", genre: "Terror / Suspense", rating: "16", minAge: 16, emoji: "🚇", dur: "1h 45min", year: 2026,
   dir: "Genki Kawamura", cast: "Kazunari Ninomiya, Yamato Kôchi",
   desc: "Adaptação do viral jogo de terror japonês. Um homem fica preso em um corredor de metrô infinito e precisa encontrar a saída, mas a cada tentativa algo muda sutilmente. Um pesadelo psicológico que desafia percepção e sanidade.",
   img: "https://image.tmdb.org/t/p/w500/naszJRWpzgbrR9vdifVoQ9IpNqW.jpg"},
  {id: 5, theme: "hokum", accentColor: "#9c27b0", accentBg: "rgba(156,39,176,.13)", title: "Hokum: O Pesadelo da Bruxa", genre: "Terror", rating: "16", minAge: 16, emoji: "🔮", dur: "1h 52min", year: 2026,
   dir: "Damian McCarthy", cast: "Adam Scott, David Wilmot, Austin Amelio",
   desc: "Uma família se muda para uma casa aparentemente perfeita, mas algo sinistro os observa. Uma bruxa adormecida por séculos acorda com a chegada dos novos moradores. Terror psicológico e sobrenatural em dose dupla.",
   img: "https://image.tmdb.org/t/p/w500/b9fyqIgQKW0VK1eKTsKKa5ijHOn.jpg"}
];
const SOON = [
  {title: "Mestres do Universo", genre: "Ação", rating: "12", minAge: 12, emoji: "⚔️", date: "04/06/2026", dir: "Yann Demange", cast: "Nicholas Galitzine, Elodie Yung, Sarah Michelle Gellar", desc: "He-Man enfrenta uma ameaça cósmica em live action que mistura fantasia e aventura. Com visual épico, o filme traz o retorno de heróis lendários do universo Eternia.", img: "https://media.themoviedb.org/t/p/w500/dobbDBQC0G9m65pcVaDM2D2aMr8.jpg"},
  {title: "Mortal Kombat 2", genre: "Ação", rating: "16", minAge: 16, emoji: "⚔️", date: "04/06/2026", dir: "Simon McQuoid", cast: "Ludi Lin, Jessica Henwick, Tadanobu Asano", desc: "Liu Kang reúne guerreiros de todas as dimensões para enfrentar uma nova invasão de Outworld. Prepare-se para combates brutais e fatalidades icônicas.", img: "https://media.themoviedb.org/t/p/w500/jWOUkeXhlyDAmOm6RoznLVHKXRy.jpg"},
  {title: "Dia D", genre: "Ficção Científica", rating: "14", minAge: 14, emoji: "🌍", date: "11/06/2026", dir: "Steven Spielberg", cast: "Emily Blunt, Tom Holland, John David Washington", desc: "Um grupo de cientistas descobre um portal temporal que pode mudar o destino da Terra. Spielberg volta ao sci-fi com emoção e suspense.", img: "https://media.themoviedb.org/t/p/w500/pmff1wjKrgJi92PPr346lAifzlg.jpg"},
  {title: "Supergirl", genre: "Super-Herói", rating: "12", minAge: 12, emoji: "🦸‍♀️", date: "25/06/2026", dir: "Jenna Malone", cast: "Sasha Calle, Helen Slater, Michael Keaton", desc: "Kara Zor-El chega à Terra em um filme solo repleto de ação, identidade e luta por justiça.", img: "https://media.themoviedb.org/t/p/w500/lJVug1z4VFIEAEopgiCxZy2yOzX.jpg"},
  {title: "Toy Story 5", genre: "Animação", rating: "L", minAge: 0, emoji: "🤠", date: "09/07/2026", dir: "Josh Cooley", cast: "Tom Hanks, Tim Allen, Annie Potts", desc: "Woody e Buzz retornam para uma nova aventura repleta de nostalgia. Quando Bonnie ganha um tablet misterioso, os brinquedos precisam salvar seu novo amigo.", img: "https://media.themoviedb.org/t/p/w500/dlZR5AE2NfKeZYxCKAvLGKSjncS.jpg"},
  {title: "A Odisseia", genre: "Épico", rating: "14", minAge: 14, emoji: "🌊", date: "16/07/2026", dir: "Christopher Nolan", cast: "Timothée Chalamet, Zendaya, Oscar Isaac", desc: "Nolan reinventa o clássico de Homero como uma jornada grandiosa pelo Mediterrâneo. Guerreiros, monstros e deuses colidem em uma versão cinematográfica épica.", img: "https://media.themoviedb.org/t/p/w500/lkShxOPlelgr3R7zYAcG00w6Z94.jpg"},
  {title: "Vingadores: Doutor Destino", genre: "Super-Herói", rating: "12", minAge: 12, emoji: "🦾", date: "17/12/2026", dir: "Sharmeen Obaid-Chinoy", cast: "Robert Downey Jr., Elizabeth Olsen, Patrick Stewart", desc: "Doutor Destino assume o controle das realidades em uma trama épica que junta X-Men, Quarteto Fantástico e Vingadores.", img: "https://media.themoviedb.org/t/p/w500/i29O7K4n3z5qB2SAJmSc0kR5dPj.jpg"},
  {title: "Duna: Parte 3", genre: "Ficção Científica", rating: "14", minAge: 14, emoji: "🏜️", date: "17/12/2026", dir: "Denis Villeneuve", cast: "Timothée Chalamet, Zendaya, Florence Pugh", desc: "A conclusão da saga de Paul Atreides traz guerras interplanetárias, profecias e a luta pelo controle de Arrakis.", img: "https://media.themoviedb.org/t/p/w500/b4wekkUaxExzOeGe7hKXzhnyXHt.jpg"}
];
const SNACKS = [
  {id: 1, emoji: "🍿", name: "Pipoca Doce G", desc: "Manteiga caramelada", price: 18},
  {id: 2, emoji: "🍿", name: "Pipoca Salgada G", desc: "Manteiga clássica", price: 18},
  {id: 3, emoji: "🥤", name: "Refrigerante 500ml", desc: "Coca, Guaraná ou Pepsi", price: 14},
  {id: 4, emoji: "🧃", name: "Suco Natural", desc: "Laranja, Uva ou Maracujá", price: 16},
  {id: 5, emoji: "🍫", name: "Chocolate / Candy", desc: "Kit Kat, M&Ms", price: 12},
  {id: 6, emoji: "🌭", name: "Cachorro-Quente", desc: "Com ketchup e mostarda", price: 22},
  {id: 7, emoji: "🍕", name: "Fatia de Pizza", desc: "Quatro Queijos", price: 24},
  {id: 8, emoji: "🎉", name: "Combo Pipoca + Refri", desc: "Pipoca G + Refri 500ml", price: 28},
];

/* ── STATE ── */
let cart = {};
let payTarget = null;
let payMethod = null;
let promoState = null;
const SEAT_ROWS = 'ABCDEFGHIJKLMNO'.split('');
const SEAT_COLS = Array.from({ length: 12 }, (_, i) => i + 1);
const SEAT_BOOKED = new Set([]);
const PREFERENTIAL_ROW = 'H';
let selectedSeats = [];
let seatTypes = {};
let seatRA = {};

/* ── MASKS ── */
function maskCPF(el) {
  let v = el.value.replace(/\D/g, '');
  if (v.length > 3) v = v.slice(0, 3) + '.' + v.slice(3);
  if (v.length > 7) v = v.slice(0, 7) + '.' + v.slice(7);
  if (v.length > 11) v = v.slice(0, 11) + '-' + v.slice(11);
  el.value = v.slice(0, 14);
}
function maskCard(el) {
  let v = el.value.replace(/\D/g, '');
  v = (v.match(/.{1,4}/g) || []).join(' ');
  el.value = v.slice(0, 19);
}
function maskExp(el) {
  let v = el.value.replace(/\D/g, '');
  if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
  el.value = v.slice(0, 5);
}

/* ── UTILS ── */
function validCPF(c) {
  c = c.replace(/\D/g, '');
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += +c[i] * (10 - i);
  let r = 11 - (s % 11); if (r >= 10) r = 0;
  if (r !== +c[9]) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += +c[i] * (11 - i);
  r = 11 - (s % 11); if (r >= 10) r = 0;
  return r === +c[10];
}
function sanitizeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}
function genCode(p) {
  const ch = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 8; i++) s += ch[Math.random() * ch.length | 0];
  return p + '-' + s.slice(0, 4) + '-' + s.slice(4);
}
function al(id, type, title, msg) {
  const el = document.getElementById(id); if (!el) return;
  el.className = 'al show al-' + type;
  const t = document.getElementById(id + '-t'); const m = document.getElementById(id + '-m');
  if (t) t.textContent = title; if (m) m.textContent = msg;
}
function hal(id) { const el = document.getElementById(id); if (el) el.className = 'al'; }
function isPromo() {
  const n = new Date(); const t = n.getHours() * 60 + n.getMinutes();
  return t >= 720 && t < 1020;
}
function calcAgeFromDOB(dob) {
  const [y, m, d] = dob.split('-').map(Number);
  const today = new Date();
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--;
  return age;
}

/* ── AGE VERIFICATION ── */
let _pendingFilmId = null;
let _ageCallback = null;

function openAgeModal(filmId, callback) {
  _ageCallback = callback || null;
  const f = FILMS.find(x => x.id === filmId);
  if (!f) return;
  _pendingFilmId = filmId;
  const icon = f.minAge >= 18 ? '🔞' : f.minAge >= 16 ? '⚠️' : f.minAge >= 12 ? '🎬' : '✅';
  document.getElementById('age-modal-icon').textContent = icon;
  document.getElementById('age-modal-title').textContent = f.minAge === 0 ? 'Filme Livre — Confirmar' : 'Classificação ' + f.rating + ' anos';
  document.getElementById('age-modal-desc').textContent = f.minAge === 0
    ? 'Confirme seu CPF para emitir o ingresso.'
    : 'Este filme exige ' + f.minAge + '+ anos. Confirme sua data de nascimento.';
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('age-dob').max = today;
  document.getElementById('age-cpf').value = document.getElementById('b-cpf')?.value || '';
  document.getElementById('age-dob').value = '';
  document.getElementById('age-result').textContent = '';
  document.getElementById('age-confirm-btn').disabled = true;
  document.getElementById('age-modal').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeAgeModal(e) {
  if (e && e.target !== document.getElementById('age-modal')) return;
  _doCloseAgeModal();
}
function _doCloseAgeModal() {
  document.getElementById('age-modal').classList.remove('on');
  document.body.style.overflow = '';
  _pendingFilmId = null;
}

function ageCheckLive() {
  const f = FILMS.find(x => x.id === _pendingFilmId);
  if (!f) return;
  const dob = document.getElementById('age-dob').value;
  const res = document.getElementById('age-result');
  const btn = document.getElementById('age-confirm-btn');
  if (!dob) { res.textContent = ''; btn.disabled = true; return; }
  const age = calcAgeFromDOB(dob);
  if (f.minAge === 0) {
    res.className = 'age-result ok';
    res.textContent = 'Filme livre — entrada permitida. Idade: ' + age + ' anos.';
    btn.disabled = false;
  } else if (age < 16) {
    res.className = 'age-result err';
    res.textContent = 'Idade mínima para comprar é 16 anos (você tem ' + age + ' anos).';
    btn.disabled = true;
  } else if (f.minAge === 18 && age < 18) {
    res.className = 'age-result ok';
    res.textContent = 'Você tem ' + age + ' anos. Filme 18+ permitido a partir de 16 anos mediante responsabilidade. Compra autorizada.';
    btn.disabled = false;
  } else if (age < f.minAge) {
    res.className = 'age-result err';
    res.textContent = 'Você tem ' + age + ' anos. Este filme exige ' + f.minAge + '+ anos. Compra bloqueada.';
    btn.disabled = true;
  } else {
    res.className = 'age-result ok';
    res.textContent = age >= 60
      ? 'Idade confirmada (' + age + ' anos). Meia-entrada 60+ aplicada automaticamente!'
      : 'Idade confirmada (' + age + ' anos). Compra autorizada.';
    btn.disabled = false;
  }
}

function confirmAge() {
  const f = FILMS.find(x => x.id === _pendingFilmId);
  if (!f) return;
  const dob = document.getElementById('age-dob').value;
  const cpf = document.getElementById('age-cpf').value;
  if (!dob) return;
  const age = calcAgeFromDOB(dob);
  const minBuy = f.minAge === 18 ? 16 : Math.max(f.minAge, 16);
  if (f.minAge > 0 && age < minBuy) return;
  const btn = document.getElementById('age-confirm-btn');
  btn.disabled = true;
  btn.textContent = 'Verificando...';
  fetch(API_URL + '/api/age-verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filmId: _pendingFilmId, cpf, dob })
  })
  .then(r => r.json())
  .then(data => {
    btn.disabled = false; btn.textContent = 'Confirmar';
    if (!data.ok) {
      const res = document.getElementById('age-result');
      res.className = 'age-result err';
      res.textContent = data.message || data.error;
      return;
    }
    if (cpf) document.getElementById('b-cpf').value = cpf;
    _applyAutoMeia60(age);
    _doCloseAgeModal();
    if (_ageCallback) _ageCallback();
  })
  .catch(() => {
    // Fallback offline — use local age validation
    btn.disabled = false; btn.textContent = 'Confirmar';
    if (cpf) document.getElementById('b-cpf').value = cpf;
    _applyAutoMeia60(age);
    _doCloseAgeModal();
    if (_ageCallback) _ageCallback();
  });
}

function _applyAutoMeia60(age) {
  if (age < 60) return;
  let changed = false;
  selectedSeats.forEach(s => {
    if ((seatTypes[s] || 'inteira') === 'inteira') { seatTypes[s] = 'meia-60'; changed = true; }
  });
  if (changed) { renderSeatTypes(); refreshEstimate(); }
}

/* ── DARK / LIGHT MODE ── */
function toggleThemeMode() {
  const isDark = !document.body.classList.contains('light-mode');
  document.body.classList.toggle('light-mode', isDark);
  localStorage.setItem('cd_theme', isDark ? 'light' : 'dark');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = isDark ? '🌙' : '☀️';
}
function initThemeMode() {
  const saved = localStorage.getItem('cd_theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = '🌙';
  }
}

/* ── CLOCK ── */
function tickClock() {
  try {
    const now = new Date();
    const hc = document.getElementById('hero-clock');
    const nt = document.getElementById('nav-time');
    if (hc) hc.textContent = '⏰ Agora: ' + now.toLocaleTimeString('pt-BR');
    if (nt) nt.textContent = now.toLocaleTimeString('pt-BR').slice(0, 5);
    const pr = isPromo();
    if (pr !== promoState) {
      promoState = pr;
      const dot = document.getElementById('nav-dot');
      if (dot) dot.className = pr ? 'dot on' : 'dot';
      const b = document.getElementById('promo-badge');
      if (b) {
        if (pr) { b.className = 'pb-badge on'; b.textContent = 'ATIVA'; }
        else { b.className = 'pb-badge off'; b.textContent = now.getHours() < 12 ? '12h–17h' : 'Encerrada'; }
      }
    }
    if (document.getElementById('b-film')?.value) {
      const pp = document.getElementById('price-preview');
      const pe = document.getElementById('price-est');
      if (pp) pp.style.display = 'flex';
      if (pe) pe.textContent = 'R$ ' + calcPrice().toFixed(2).replace('.', ',');
    }
  } catch(e) {}
}

/* ── NAVIGATION ── */
let _navStack = ['home'];
function go(name, pushToStack = true) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('on'));
  const target = document.getElementById('pg-' + name);
  if (target) target.classList.add('on');
  const tabIndex = {home:0,soon:1,buy:2,snacks:3}[name];
  if (tabIndex !== undefined) document.querySelectorAll('.ntab')[tabIndex].classList.add('on');
  window.scrollTo({top: 0, behavior: 'smooth'});
  if (pushToStack && _navStack[_navStack.length - 1] !== name) _navStack.push(name);
}
function goBack() {
  if (_navStack.length > 1) { _navStack.pop(); go(_navStack[_navStack.length - 1], false); }
  else go('home', false);
}

/* ── FILM THEME ENGINE ── */
let _currentTheme = null;
function applyFilmTheme(film) {
  if (!film || _currentTheme === film.id) return;
  _currentTheme = film.id;
  const color = film.accentColor || 'var(--p)';
  const bg = film.accentBg || 'rgba(249,115,22,.13)';
  const hero = document.querySelector('.hero');
  if (hero) { hero.style.transition = 'background 1s ease'; hero.style.background = `radial-gradient(ellipse at 60% 0%, ${bg} 0%, transparent 60%)`; }
  const glow = document.querySelector('.hero-glow');
  if (glow) { glow.style.transition = 'background 1s ease'; glow.style.background = `radial-gradient(ellipse at 50% -20%, ${bg} 0%, transparent 70%)`; }
  const tag = document.querySelector('.hero-tag');
  if (tag) { tag.textContent = `✦ Em destaque: ${film.title}`; tag.style.background = bg; tag.style.borderColor = color + '55'; tag.style.color = color; }
  document.querySelectorAll('.fcard').forEach(c => { c.classList.remove('fc-active'); c.style.borderColor = ''; c.style.boxShadow = ''; });
  const activeCard = document.getElementById('fc-' + film.id);
  if (activeCard) { activeCard.classList.add('fc-active'); activeCard.style.borderColor = color; activeCard.style.boxShadow = `0 0 0 2px ${color}44, 0 8px 32px ${color}22`; }
  const h1 = document.querySelector('.hero h1 em');
  if (h1) h1.style.color = color;
}
function setFeaturedFilm(filmId) { const f = FILMS.find(x => x.id === filmId); if (f) applyFilmTheme(f); }
let _featuredIdx = 0;
function rotateFeaturedFilm() {
  applyFilmTheme(FILMS[_featuredIdx % FILMS.length]);
  _featuredIdx++;
}

/* ── FILM GRID — loads from API, falls back to local data ── */
function loadFilmsFromAPI() {
  fetch(API_URL + '/api/films')
    .then(r => r.json())
    .then(apiFilms => {
      if (!apiFilms || !apiFilms.length) return;
      // Map API fields to front-end format
      const mapped = apiFilms.map(f => ({
        id: f.id,
        theme: f.title.toLowerCase().replace(/\s+/g,'').slice(0,8),
        accentColor: FILMS.find(x=>x.id===f.id)?.accentColor || '#fb923c',
        accentBg: FILMS.find(x=>x.id===f.id)?.accentBg || 'rgba(249,115,22,.13)',
        title: f.title, genre: f.genre,
        rating: f.rating, minAge: f.min_age,
        emoji: f.emoji || '🎬', dur: f.duration || '',
        year: f.year || 2026, dir: f.director || '',
        cast: f.cast_list || '', desc: f.description || '',
        img: f.img_url || ''
      }));
      // Replace FILMS array contents in place
      FILMS.length = 0;
      mapped.forEach(f => FILMS.push(f));
      // Re-render grid
      const grid = document.getElementById('film-grid');
      const sel = document.getElementById('b-film');
      grid.innerHTML = '';
      sel.innerHTML = '<option value="">Selecione um filme...</option>';
      _currentTheme = null;
      renderFilms();
      rotateFeaturedFilm();
    })
    .catch(() => {}); // silently fall back to local data
}

// Refresh films every 5 minutes
function startFilmSync() {
  loadFilmsFromAPI();
  setInterval(loadFilmsFromAPI, 5 * 60 * 1000);
}

function renderFilms() {
  const grid = document.getElementById('film-grid');
  const sel = document.getElementById('b-film');
  const pr = isPromo();
  FILMS.forEach((f, i) => {
    const div = document.createElement('div');
    div.className = 'fcard'; div.id = 'fc-' + f.id;
    div.style.animationDelay = (i * .05) + 's';
    div.innerHTML = `
      <div class="fposter">
        <img src="${f.img}" alt="${f.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="fposter-fb" style="display:none">${f.emoji}</div>
        <div class="frating r${f.rating}">${f.rating === 'L' ? 'LIVRE' : f.rating + '+'}</div>
      </div>
      <div class="finfo">
        <div class="ftitle">${sanitizeHTML(f.title)}</div>
        <div class="fgenre">${sanitizeHTML(f.genre)}</div>
        <div class="fprice-row">
          <span class="fprice${pr ? ' pr' : ''}">R$ ${pr ? '12,00' : '28,00'}${pr ? ' 🌟' : ''}</span>
          <span class="fdur">${f.dur}</span>
        </div>
      </div>`;
    div.onclick = () => { setFeaturedFilm(f.id); openFModal(f.id); };
    grid.appendChild(div);
    const opt = document.createElement('option');
    opt.value = f.id;
    opt.textContent = `${f.emoji} ${f.title} (${f.rating === 'L' ? 'Livre' : f.rating + ' anos'})`;
    sel.appendChild(opt);
  });
  document.getElementById('film-count').textContent = FILMS.length + ' filmes';
}

/* ── FILM MODAL ── */
function openFModal(id) {
  const f = FILMS.find(x => x.id === id);
  const pr = isPromo();
  const img = document.getElementById('fm-img');
  img.src = f.img; img.style.display = 'block';
  const fb = document.getElementById('fm-fb');
  fb.textContent = f.emoji; fb.style.display = 'none';
  document.getElementById('fm-title').textContent = f.title || '';
  document.getElementById('fm-meta').innerHTML = `
    <span class="frating r${sanitizeHTML(f.rating)}" style="position:static;display:inline-block;margin-bottom:4px">${f.rating === 'L' ? 'LIVRE' : sanitizeHTML(f.rating) + ' anos'}</span><br>
    🎬 ${sanitizeHTML(f.dir || '')}<br>⏱ ${sanitizeHTML(f.dur || '')} · ${f.year}<br>
    <strong style="color:var(--gold)">R$ ${pr ? '12,00' : '28,00'}${pr ? ' <span style="color:var(--green)">🌟 PROMO</span>' : ''}</strong>`;
  document.getElementById('fm-desc').textContent = f.desc || '';
  document.getElementById('fm-cast').innerHTML = '<strong>Elenco:</strong> ' + sanitizeHTML(f.cast || '');
  document.getElementById('fm-buy-btn').onclick = () => { closeFModal(); document.getElementById('b-film').value = id; onFilmChange(); go('buy'); };
  document.getElementById('film-modal').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeFModal(e) {
  if (e && e.target !== document.getElementById('film-modal')) return;
  document.getElementById('film-modal').classList.remove('on');
  document.body.style.overflow = '';
}

/* ── SOON ── */
function renderSoon() {
  const list = document.getElementById('soon-list');
  SOON.forEach((s, i) => {
    const [d, m, y] = s.date.split('/').map(Number);
    const dt = new Date(y, m - 1, d);
    const today = new Date(); today.setHours(0,0,0,0);
    const diff = Math.round((dt - today) / 864e5);
    const cd = diff < 0 ? 'Em cartaz' : diff === 0 ? 'Hoje!' : diff === 1 ? 'Amanhã!' : diff + ' dias';
    const el = document.createElement('div');
    el.className = 'scard';
    el.id = 'scard-' + i;
    el.onclick = () => { applySoonTheme(i); openSoonDetail(i); };
    el.innerHTML = `
      <div class="scard-poster">
        <img src="${s.img||''}" alt="${s.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="scard-poster-fb" style="display:none">${s.emoji}</div>
        <div class="rating-badge r${s.rating} scard-rating-badge">${s.rating === 'L' ? 'LIVRE' : s.rating + '+'}</div>
      </div>
      <div class="scard-info">
        <div class="scard-title">${sanitizeHTML(s.title)}</div>
        <div class="scard-genre">${sanitizeHTML(s.genre)}</div>
        <div class="scard-desc">${sanitizeHTML(s.desc)}</div>
        <div class="scard-meta">
          <span class="scard-date">📅 ${s.date}</span>
          <span class="scard-cd">⏳ ${cd}</span>
        </div>
      </div>`;
    list.appendChild(el);
  });
}

function applySoonTheme(idx) {
  const s = SOON[idx];
  if (!s) return;
  const genreColors = {'Ação':'#ef4444','Terror':'#7c3aed','Ficção Científica':'#06b6d4','Super-Herói':'#f59e0b','Animação':'#10b981','Épico':'#d97706','Comédia':'#ec4899','Drama':'#8b5cf6'};
  const genre = Object.keys(genreColors).find(g => s.genre.includes(g));
  const color = genreColors[genre] || '#fb923c';
  document.querySelectorAll('.scard').forEach(c => { c.classList.remove('scard-active'); c.style.borderColor = ''; c.style.boxShadow = ''; });
  const card = document.getElementById('scard-' + idx);
  if (card) { card.classList.add('scard-active'); card.style.borderColor = color; card.style.boxShadow = `0 0 0 2px ${color}44`; }
}

function openSoonDetail(index) {
  const s = SOON[index];
  if (!s) return;
  const img = document.getElementById('sd-img');
  const fb = document.getElementById('sd-fallback');
  fb.textContent = s.emoji; fb.style.display = 'none';
  img.onerror = () => { img.style.display = 'none'; fb.style.display = 'flex'; };
  if (s.img) { img.style.display = 'block'; img.src = s.img; }
  else { img.style.display = 'none'; fb.style.display = 'flex'; }
  img.alt = s.title;
  document.getElementById('sd-title').textContent = '🔍 ' + (s.title || '');
  document.getElementById('sd-sub').textContent = s.genre + ' · ' + s.date;
  document.getElementById('sd-meta').innerHTML = `<span>🎬 ${sanitizeHTML(s.dir||'')}</span><br><span>⭐ ${sanitizeHTML(s.cast||'')}</span><br><span class="rating-badge r${s.rating}" style="display:inline-block;margin-top:4px">${s.rating === 'L' ? 'LIVRE' : s.rating + ' anos'}</span>`;
  document.getElementById('sd-desc').textContent = s.desc || '';
  go('soon-detail');
}

/* ── SNACKS ── */
function renderSnacks() {
  const grid = document.getElementById('snack-grid');
  SNACKS.forEach(s => {
    const card = document.createElement('div');
    card.className = 'skcard'; card.id = 'sk-' + s.id;
    card.innerHTML = `<div class="sk-img">${s.emoji}</div><div class="sk-body"><div class="sk-name">${s.name}</div><div class="sk-desc">${s.desc}</div><div class="sk-price">R$ ${s.price.toFixed(2)}</div><div class="sk-ctrl"><button class="qb" onclick="chg(${s.id},-1)">−</button><span class="qv" id="qv-${s.id}">0</span><button class="qb" onclick="chg(${s.id},1)">+</button></div></div>`;
    grid.appendChild(card);
  });
}
function chg(id, d) {
  cart[id] = Math.max(0, (cart[id] || 0) + d);
  document.getElementById('qv-' + id).textContent = cart[id];
  document.getElementById('sk-' + id).classList.toggle('sel', cart[id] > 0);
  updateCart();
}
function updateCart() {
  const act = SNACKS.filter(s => cart[s.id] > 0);
  const ce = document.getElementById('cart-empty'), ci = document.getElementById('cart-items');
  const ct = document.getElementById('cart-total'), tv = document.getElementById('cart-total-v');
  const cc = document.getElementById('cart-count');
  if (!act.length) { ce.style.display='block'; ci.style.display='none'; ct.style.display='none'; cc.textContent=''; return; }
  let sum = 0, html = '';
  act.forEach(s => { const sub = cart[s.id]*s.price; sum+=sub; html+=`<div class="citem"><span class="citem-n">${s.emoji} ${s.name} ×${cart[s.id]}</span><span>R$ ${sub.toFixed(2)}</span></div>`; });
  ce.style.display='none'; ci.style.display='block'; ci.innerHTML=html;
  ct.style.display='flex'; tv.textContent='R$ '+sum.toFixed(2);
  const tot = act.reduce((a,s)=>a+cart[s.id],0);
  cc.textContent = tot+(tot===1?' item':' itens');
}

/* ── FORM HELPERS ── */
function onFilmChange() { document.getElementById('price-preview').style.display='flex'; refreshEstimate(); }
function calcPrice() {
  if (!selectedSeats.length) return 0;
  const pr = isPromo(), cat = document.getElementById('b-category').value;
  const extra = cat==='vip'?10:cat==='imax'?18:0;
  const baseInteira = pr?12:28, baseMeia = pr?6:14;
  return selectedSeats.reduce((sum,s) => { const t=seatTypes[s]||'inteira'; return sum+(t==='inteira'?baseInteira:baseMeia)+extra; }, 0);
}
function refreshEstimate() {
  if (!document.getElementById('b-film').value) return;
  document.getElementById('price-preview').style.display='flex';
  document.getElementById('price-est').textContent='R$ '+calcPrice().toFixed(2).replace('.',',');
}

/* ── VALIDATE ── */
function validateTicketForm() {
  const filmId = parseInt(document.getElementById('b-film').value);
  const sess = document.getElementById('b-session').value;
  const nm = document.getElementById('b-name').value.trim();
  const cpf = document.getElementById('b-cpf').value;
  const em = document.getElementById('b-email').value.trim();
  if (!filmId) return ['warn','Selecione um filme','Escolha o filme desejado.'];
  if (!sess) return ['warn','Selecione um horário','Escolha o horário da sessão.'];
  if (!selectedSeats.length) return ['warn','Selecione as poltronas','Escolha ao menos uma poltrona no mapa de assentos.'];
  if (!nm) return ['warn','Nome obrigatório','Informe seu nome completo.'];
  if (!em||!em.includes('@')) return ['warn','Email inválido','Informe um email válido.'];
  if (!validCPF(cpf)) return ['err','CPF inválido','O CPF informado não é válido.'];
  const meiaEsSeats = selectedSeats.filter(s=>(seatTypes[s]||'inteira')==='meia-estudante');
  if (meiaEsSeats.length > 0) {
    const filled = meiaEsSeats.filter(s=>(seatRA[s]||document.getElementById('ra-'+s)?.value||'').trim().length>=5);
    if (!filled.length) return ['err','RA obrigatório',`Informe ao menos um RA para as ${meiaEsSeats.length} meia(s)-estudante.`];
  }
  return null;
}

/* ── SEATS ── */
function goToSeats() { buildSeatsPage(); go('seats'); }

let seatRA_declared = true; // seatRA already declared at top
function renderSeatTypes() {
  const box = document.getElementById('seat-types-box');
  const list = document.getElementById('seat-types-list');
  if (!selectedSeats.length) { box.style.display='none'; return; }
  box.style.display='block';
  list.innerHTML = selectedSeats.map(s => {
    const isMeia = (seatTypes[s]||'inteira')==='meia-estudante';
    return `<div class="seat-type-row-wrap">
      <div class="seat-type-row">
        <span class="seat-type-label">Poltrona <strong>${s}</strong></span>
        <select class="fselect seat-type-sel" onchange="onSeatTypeChange('${s}',this.value)">
          <option value="inteira" ${seatTypes[s]==='inteira'?'selected':''}>Inteira</option>
          <option value="meia-estudante" ${seatTypes[s]==='meia-estudante'?'selected':''}>Meia — Estudante</option>
          <option value="meia-60" ${seatTypes[s]==='meia-60'?'selected':''}>Meia — 60+ anos</option>
        </select>
      </div>
      <div class="seat-ra-box" id="ra-box-${s}" style="display:${isMeia?'block':'none'}">
        <input class="finput seat-ra-input" id="ra-${s}" type="text" placeholder="RA — Ex: 12345678"
          value="${seatRA[s]||''}" oninput="seatRA['${s}']=this.value">
        <div class="seat-ra-hint">RA opcional por poltrona — ao menos um obrigatório no grupo</div>
      </div>
    </div>`;
  }).join('');
  updateSeatSummary();
}

function onSeatTypeChange(seat, value) {
  seatTypes[seat] = value;
  const raBox = document.getElementById('ra-box-'+seat);
  if (raBox) raBox.style.display = value==='meia-estudante'?'block':'none';
  if (value!=='meia-estudante') delete seatRA[seat];
  updateSeatSummary(); refreshEstimate();
}

function updateSeatSummary() {
  const cat=document.getElementById('b-category').value, pr=isPromo();
  const extra=cat==='vip'?10:cat==='imax'?18:0;
  const counts={'inteira':0,'meia-estudante':0,'meia-60':0};
  selectedSeats.forEach(s=>counts[seatTypes[s]||'inteira']++);
  const bi=pr?12:28, bm=pr?6:14;
  const total=(counts.inteira*(bi+extra))+((counts['meia-estudante']+counts['meia-60'])*(bm+extra));
  const lines=[];
  if(counts.inteira) lines.push(`${counts.inteira}× Inteira — R$ ${(counts.inteira*(bi+extra)).toFixed(2).replace('.',',')}`);
  if(counts['meia-estudante']) lines.push(`${counts['meia-estudante']}× Meia (Estudante) — R$ ${(counts['meia-estudante']*(bm+extra)).toFixed(2).replace('.',',')}`);
  if(counts['meia-60']) lines.push(`${counts['meia-60']}× Meia (60+) — R$ ${(counts['meia-60']*(bm+extra)).toFixed(2).replace('.',',')}`);
  const sb=document.getElementById('seat-summary-box');
  if(sb) sb.innerHTML=lines.map(l=>`<div class="seat-summary-line">${l}</div>`).join('')+`<div class="seat-summary-total">Total: <strong>R$ ${total.toFixed(2).replace('.',',')}</strong></div>`;
}

function buildSeatsPage() {
  const grid=document.getElementById('seats-full-grid');
  if(grid.dataset.ready){updateSeatsPanel();return;}
  grid.dataset.ready='true';
  const PREF='H', BOOKED=new Set([]);
  'ABCDEFGHIJKLMNO'.split('').forEach(letter=>{
    const rowEl=document.createElement('div'); rowEl.className='sp-row';
    rowEl.innerHTML=`<div class="sp-row-label">${letter}</div><div class="sp-block" data-b="L"></div><div></div><div class="sp-block" data-b="R"></div><div class="sp-row-label">${letter}</div>`;
    [8,7,6,5].forEach(n=>addSpSeat(rowEl.querySelector('[data-b="L"]'),letter,n,BOOKED,PREF));
    [4,3,2,1].forEach(n=>addSpSeat(rowEl.querySelector('[data-b="R"]'),letter,n,BOOKED,PREF));
    grid.appendChild(rowEl);
  });
  selectedSeats.forEach(code=>{
    const el=document.querySelector('.sp-seat[data-seat="'+code+'"]');
    if(el) el.classList.add('sp-selected');
  });
  updateSeatsPanel();
}

function addSpSeat(container,letter,num,booked,pref) {
  const btn=document.createElement('div'), code=letter+num;
  btn.className='sp-seat'+(letter===pref?' sp-pref':'')+(booked.has(code)?' sp-booked':'');
  btn.textContent=num; btn.dataset.seat=code;
  if(!booked.has(code)) btn.onclick=()=>toggleSpSeat(btn,code);
  container.appendChild(btn);
}

function toggleSpSeat(btn,code) {
  if(selectedSeats.includes(code)){
    selectedSeats=selectedSeats.filter(s=>s!==code);
    delete seatTypes[code]; delete seatRA[code];
    btn.classList.remove('sp-selected');
  } else {
    if(selectedSeats.length>=12) return;
    selectedSeats.push(code); seatTypes[code]='inteira';
    btn.classList.add('sp-selected');
  }
  updateSeatsPanel();
}

function updateSeatsPanel() {
  const count=selectedSeats.length, cat=document.getElementById('b-category')?.value||'comum';
  const catLbl=cat==='vip'?'VIP':cat==='imax'?'IMAX':'Comum';
  document.getElementById('sp-count').textContent=count||'0';
  document.getElementById('sp-codes').textContent=count?selectedSeats.join(', '):'—';
  document.getElementById('sp-category').textContent=catLbl;
  const priceRow=document.getElementById('sp-price-row');
  if(count>0){priceRow.style.display='flex';document.getElementById('sp-price').textContent='R$ '+calcPrice().toFixed(2).replace('.',',');}
  else priceRow.style.display='none';
}

function confirmSeatsAndReturn() {
  if(!selectedSeats.length){alert('Selecione ao menos uma poltrona.');return;}
  selectedSeats.forEach(s=>{if(!seatTypes[s])seatTypes[s]='inteira';});
  document.getElementById('b-seat').value=selectedSeats.join(', ');
  document.getElementById('b-seat-display').textContent=selectedSeats.join(', ');
  renderSeatTypes(); refreshEstimate(); go('buy');
}

/* ── PAYMENT ── */
function openPay(target) {
  if(target==='ticket'){
    const filmId=parseInt(document.getElementById('b-film').value);
    const f=FILMS.find(x=>x.id===filmId);
    if(f&&f.minAge>0){
      const err=validateTicketForm();
      if(err){al('buy-al',err[0],err[1],err[2]);return;}
      openAgeModal(filmId,()=>_proceedToPay(target));
      return;
    }
  }
  _proceedToPay(target);
}
function _proceedToPay(target) {
  hal('buy-al'); hal('sk-al');
  if(target==='ticket'){
    const err=validateTicketForm();
    if(err){al('buy-al',...err);return;}
    document.getElementById('pay-total-v').textContent='R$ '+calcPrice().toFixed(2);
    document.getElementById('pay-sub').textContent=`${selectedSeats.length} ingresso(s) · `+document.getElementById('b-session').value;
  } else {
    const nm=document.getElementById('sk-name').value.trim();
    const cpf=document.getElementById('sk-cpf').value;
    const act=SNACKS.filter(s=>cart[s.id]>0);
    if(!nm) return al('sk-al','warn','Nome obrigatório','Informe seu nome para retirada.');
    if(!validCPF(cpf)) return al('sk-al','err','CPF inválido','Verifique o CPF e tente novamente.');
    if(!act.length) return al('sk-al','warn','Carrinho vazio','Adicione pelo menos um item.');
    const sum=act.reduce((a,s)=>a+cart[s.id]*s.price,0);
    document.getElementById('pay-total-v').textContent='R$ '+sum.toFixed(2);
    document.getElementById('pay-sub').textContent='Bomboniere · '+act.length+(act.length===1?' item':' itens');
  }
  payTarget=target; payMethod=null;
  document.querySelectorAll('.pm').forEach(p=>p.classList.remove('sel'));
  document.getElementById('qr-zone').classList.remove('on');
  document.getElementById('card-zone').classList.remove('on');
  document.getElementById('pay-modal').classList.add('on');
  document.body.style.overflow='hidden';
}
function closePay(){document.getElementById('pay-modal').classList.remove('on');document.body.style.overflow='';}
function selPM(m){
  payMethod=m;
  ['pix','credit','debit'].forEach(k=>document.getElementById('pm-'+k).classList.toggle('sel',k===m));
  document.getElementById('qr-zone').classList.toggle('on',m==='pix');
  document.getElementById('card-zone').classList.toggle('on',m!=='pix');
  if(m==='pix') buildQR();
}
function buildQR(){
  const w=document.getElementById('qr-wrap'),n=21,s=Math.floor(160/n);
  let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${n*s}" height="${n*s}" viewBox="0 0 ${n} ${n}"><rect width="${n}" height="${n}" fill="white"/>`;
  [[0,0],[n-7,0],[0,n-7]].forEach(([cx,cy])=>{svg+=`<rect x="${cx}" y="${cy}" width="7" height="7" fill="black"/><rect x="${cx+1}" y="${cy+1}" width="5" height="5" fill="white"/><rect x="${cx+2}" y="${cy+2}" width="3" height="3" fill="black"/>`;});
  let rng=0xdeadbeef;
  const nx=rng=>((rng=rng*1664525+1013904223&0xffffffff)>>>0);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){const inF=(x<9&&y<9)||(x>n-8&&y<9)||(x<9&&y>n-8);if(!inF){rng=nx(rng);if(rng%3>0)svg+=`<rect x="${x}" y="${y}" width="1" height="1" fill="black"/>`;}}
  svg+='</svg>'; w.innerHTML=svg;
}
function confirmPay(){
  if(!payMethod) return alert('Selecione uma forma de pagamento.');
  if(payMethod!=='pix'){
    const num=document.getElementById('cc-num').value.replace(/\s/g,'');
    const exp=document.getElementById('cc-exp').value, cvv=document.getElementById('cc-cvv').value;
    const nm=document.getElementById('cc-nm').value.trim();
    if(num.length<16||exp.length<5||cvv.length<3||!nm) return alert('Preencha todos os dados do cartão.');
  }
  closePay();
  if(payTarget==='ticket') doTicket(); else doSnack();
}

/* ── TICKET ── */
function doTicket(){
  const filmId=parseInt(document.getElementById('b-film').value);
  const sess=document.getElementById('b-session').value, cat=document.getElementById('b-category').value;
  const nm=document.getElementById('b-name').value.trim(), email=document.getElementById('b-email').value.trim();
  const f=FILMS.find(x=>x.id===filmId), pr=isPromo();
  const catLbl=cat==='vip'?'VIP':cat==='imax'?'IMAX':'Comum';
  const counts={'inteira':0,'meia-estudante':0,'meia-60':0};
  selectedSeats.forEach(s=>counts[seatTypes[s]||'inteira']++);
  const typeSummary=[counts.inteira?`${counts.inteira}× Inteira`:'',counts['meia-estudante']?`${counts['meia-estudante']}× Meia-Estud.`:'',counts['meia-60']?`${counts['meia-60']}× Meia-60+`:''].filter(Boolean).join(' · ');
  document.getElementById('t-film').textContent=f.emoji+' '+f.title;
  document.getElementById('t-sess').textContent=sess;
  document.getElementById('t-seat').textContent=selectedSeats.join(', ');
  document.getElementById('t-type').textContent=catLbl+' · '+typeSummary;
  document.getElementById('t-name').textContent=nm;
  document.getElementById('t-price').textContent='R$ '+calcPrice().toFixed(2).replace('.',',');
  document.getElementById('t-code').textContent=genCode('CD');
  document.getElementById('t-time').textContent=new Date().toLocaleString('pt-BR');
  document.getElementById('t-paid').style.display='inline-flex';
  const act=SNACKS.filter(s=>cart[s.id]>0);
  if(act.length){document.getElementById('t-food-box').style.display='block';document.getElementById('t-food-code').textContent=genCode('BP');}
  document.getElementById('tkt-ph').style.display='none';
  document.getElementById('tkt-wrap').classList.add('on');
  al('buy-al','ok','✅ Ingresso confirmado!',`Códigos gerados e enviados para ${email}. Apresente na entrada da sala.`);
  document.getElementById('tkt-wrap').scrollIntoView({behavior:'smooth',block:'nearest'});
  // API call
  const sessionVal=document.getElementById('b-session').value;
  fetch(API_URL+'/api/sessions?filmId='+filmId).then(r=>r.json()).then(sessions=>{
    const match=sessions.find(s=>sessionVal.startsWith(s.start_time?.slice(0,5)));
    return fetch(API_URL+'/api/tickets',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({filmId,sessionId:match?.id,buyerName:nm,cpf:document.getElementById('b-cpf').value,email,seats:selectedSeats,seatTypes,category:cat,paymentMethod:payMethod})});
  }).then(r=>r.json()).then(data=>{
    if(data.ticketCode) document.getElementById('t-code').textContent=data.ticketCode;
    if(data.foodCode) document.getElementById('t-food-code').textContent=data.foodCode;
  }).catch(()=>{});
}

/* ── SNACK ── */
function doSnack(){
  const nm=document.getElementById('sk-name').value.trim();
  const act=SNACKS.filter(s=>cart[s.id]>0);
  let html='',sum=0;
  act.forEach(s=>{const sub=cart[s.id]*s.price;sum+=sub;html+=`<div class="citem"><span>${s.emoji} ${s.name} ×${cart[s.id]}</span><span>R$ ${sub.toFixed(2)}</span></div>`;});
  html+=`<div class="ctotal" style="margin-top:.4rem"><span>Total</span><span style="color:var(--gold)">R$ ${sum.toFixed(2)}</span></div>`;
  document.getElementById('sk-order-list').innerHTML=html;
  const code=genCode('BP');
  document.getElementById('sk-code').textContent=code;
  document.getElementById('sk-for').textContent=nm;
  document.getElementById('sk-tkt-wrap').classList.add('on');
  al('sk-al','ok','🍿 Pedido confirmado!','Código gerado. Vá ao caixa da bomboniere e informe o código.');
  fetch(API_URL+'/api/snacks',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({buyerName:nm,cpf:document.getElementById('sk-cpf').value,items:act.map(s=>({name:s.name,qty:cart[s.id],unitPrice:s.price})),paymentMethod:payMethod})}).catch(()=>{});
}

/* ── INIT ── */
try{renderFilms();rotateFeaturedFilm();setInterval(rotateFeaturedFilm,8000);startFilmSync();}catch(e){}
try{renderSoon();}catch(e){}
try{renderSnacks();}catch(e){}
initThemeMode();
tickClock();
setInterval(tickClock,1000);