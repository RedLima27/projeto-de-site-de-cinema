# 🐉 CineDragon

Sistema completo de cinema com compra de ingressos, bomboniere e verificação de idade por CPF — front-end em HTML/CSS/JS puro e back-end em Node.js com banco de dados MySQL.

---

## 📸 Funcionalidades

- **Em Cartaz** — grade de filmes com poster, gênero, duração e classificação etária
- **Em Breve** — próximas estreias com countdown de dias e badges de classificação
- **Ingressos** — seleção de filme, sessão, poltronas no mapa interativo e tipo de entrada
- **Tipos de entrada** — Inteira, Meia-Estudante (com validação de RA) e Meia-60+
- **Verificação de idade** — popup com CPF e data de nascimento antes do pagamento; bloqueio automático conforme classificação do filme
- **Bomboniere** — carrinho de snacks com código de retirada
- **Pagamento** — modal com PIX, crédito e débito
- **Ingresso digital** — código único gerado e salvo no banco de dados
- **Relógio em tempo real** — promoção automática das 12h às 17h
- **Back-end REST** — API Node.js com 9 endpoints conectados ao MySQL
- **Fallback offline** — site funciona mesmo sem servidor, gerando códigos localmente

---

## 🗂️ Estrutura do projeto

```
cinedragon/
├── index.html                  ← Página principal (front-end completo)
├── .gitignore
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css           ← Estilos da aplicação
│   └── js/
│       └── script.js           ← Lógica do front-end + integração com API
└── backend/
    ├── server.js               ← Servidor Node.js + Express
    ├── schema.sql              ← Schema e seed do banco MySQL
    ├── package.json
    ├── .env.example            ← Modelo de configuração (copiar para .env)
    └── README.md               ← Documentação da API
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js 18+](https://nodejs.org)
- [MySQL 8.0+](https://dev.mysql.com/downloads/installer)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cinedragon.git
cd cinedragon
```

### 2. Configure o banco de dados

Abra o MySQL e execute o schema:

```bash
mysql -u root -p < backend/schema.sql
```

Ou pelo MySQL Workbench: **File → Open SQL Script**, selecione `backend/schema.sql` e execute com **Ctrl+Shift+Enter**.

### 3. Configure as variáveis de ambiente

```bash
cd backend
copy .env.example .env        # Windows
# cp .env.example .env        # Linux/Mac
```

Edite o arquivo `.env` com sua senha do MySQL:

```
DB_PASS=sua_senha_aqui
```

Se sua senha contiver caracteres especiais como `@`, coloque entre aspas simples: `DB_PASS='senha@123'`

### 4. Instale as dependências e inicie o servidor

```bash
cd backend
npm install
npm start
```

### 5. Acesse o sistema

Abra o navegador em:

```
http://localhost:3000
```

Verifique se o banco está conectado em:

```
http://localhost:3000/api/health
```

Resposta esperada: `{"ok":true,"db":"connected"}`

---

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/health` | Status da conexão com o banco |
| GET | `/api/films` | Filmes em cartaz |
| GET | `/api/films/soon` | Filmes em breve |
| GET | `/api/films/:id` | Detalhe de um filme |
| GET | `/api/sessions` | Sessões (filtros: `filmId`, `date`) |
| GET | `/api/sessions/:id/seats` | Assentos ocupados de uma sessão |
| POST | `/api/age-verify` | Verificação e registro de idade |
| POST | `/api/tickets` | Emissão de ingresso |
| GET | `/api/tickets/:code` | Consulta de ingresso por código |
| POST | `/api/snacks` | Pedido de bomboniere |

---

## 🗃️ Banco de dados

O arquivo `schema.sql` cria automaticamente todas as tabelas e popula com dados iniciais:

| Tabela | Descrição |
|--------|-----------|
| `films` | Filmes em cartaz com classificação etária |
| `soon_films` | Filmes em breve |
| `sessions` | Sessões por sala, horário e data |
| `booked_seats` | Assentos reservados por sessão |
| `age_verifications` | Log de verificações de idade |
| `buyers` | Compradores cadastrados |
| `tickets` | Ingressos emitidos |
| `ticket_items` | Itens por poltrona (tipo e preço) |
| `snack_orders` | Pedidos da bomboniere |
| `snack_order_items` | Itens de cada pedido |

---

## 🔒 Segurança e LGPD

CPFs nunca são gravados em texto puro. O servidor aplica **SHA-256** antes de qualquer inserção no banco, tornando impossível recuperar o CPF original. A verificação de idade é registrada com CPF hasheado, data de nascimento e resultado (aprovado/bloqueado).

---

## 🌐 Publicar na internet (opcional)

Para deixar o site acessível publicamente sem custo:

1. Suba o código para o **GitHub**
2. Crie uma conta no [Railway](https://railway.app) e importe o repositório
3. Configure as variáveis de ambiente no painel do Railway
4. O Railway detecta automaticamente o Node.js e faz o deploy

---

## 📋 Regras de negócio

- Idade mínima para comprar qualquer ingresso: **16 anos**
- Filmes com classificação 18+ exigem exatamente 18+ anos
- Meia-entrada estudante exige informação do **RA (Registro Acadêmico)**
- Meia-entrada 60+ baseada na data de nascimento informada no popup
- Promoção do meio-dia: todos os ingressos por R$ 12,00 das **12h às 17h**
- Máximo de **12 poltronas** por compra
- Assentos da fileira **H** são preferenciais

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Front-end | HTML5, CSS3, JavaScript (ES6+) |
| Back-end | Node.js, Express |
| Banco de dados | MySQL 8.0 |
| Fontes | Google Fonts (Syne + Plus Jakarta Sans) |
| Segurança | SHA-256 para CPF, validação de idade server-side |

---

## 📄 Licença

MIT — sinta-se livre para usar, modificar e distribuir.