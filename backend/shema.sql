-- ============================================================
--  CineDragon — Schema MySQL
--  Execute: mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS cinedragon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cinedragon;

-- ------------------------------------------------------------
-- FILMES em cartaz
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS films (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(120)  NOT NULL,
  genre      VARCHAR(80)   NOT NULL,
  rating     VARCHAR(4)    NOT NULL DEFAULT 'L',
  min_age    TINYINT       NOT NULL DEFAULT 0,
  emoji      VARCHAR(8)    NOT NULL DEFAULT '🎬',
  duration   VARCHAR(20),
  year       YEAR,
  director   VARCHAR(120),
  cast_list  TEXT,
  description TEXT,
  img_url    VARCHAR(255),
  is_active  TINYINT(1)    NOT NULL DEFAULT 1,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- FILMES em breve
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS soon_films (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(120) NOT NULL,
  genre       VARCHAR(80)  NOT NULL,
  rating      VARCHAR(4)   NOT NULL DEFAULT 'L',
  min_age     TINYINT      NOT NULL DEFAULT 0,
  emoji       VARCHAR(8)   NOT NULL DEFAULT '🎬',
  release_date DATE,
  director    VARCHAR(120),
  cast_list   TEXT,
  description TEXT,
  img_url     VARCHAR(255),
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- SESSÕES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  film_id    INT          NOT NULL,
  room       VARCHAR(20)  NOT NULL,
  start_time TIME         NOT NULL,
  category   ENUM('comum','vip','imax') NOT NULL DEFAULT 'comum',
  date       DATE         NOT NULL,
  is_active  TINYINT(1)   NOT NULL DEFAULT 1,
  FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- ASSENTOS OCUPADOS (por sessão)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS booked_seats (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  INT         NOT NULL,
  seat_code   VARCHAR(5)  NOT NULL,
  ticket_id   INT,
  UNIQUE KEY uq_session_seat (session_id, seat_code),
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- VERIFICAÇÕES DE IDADE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS age_verifications (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  film_id     INT          NOT NULL,
  cpf_hash    VARCHAR(64)  NOT NULL,   -- SHA-256 do CPF, nunca plain
  age_years   TINYINT      NOT NULL,
  dob         DATE         NOT NULL,
  result      ENUM('approved','blocked') NOT NULL,
  verified_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_cpf_hash (cpf_hash),
  INDEX idx_film    (film_id)
);

-- ------------------------------------------------------------
-- COMPRADORES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS buyers (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  full_name  VARCHAR(120) NOT NULL,
  cpf_hash   VARCHAR(64)  NOT NULL,
  email      VARCHAR(120) NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_cpf (cpf_hash)
);

-- ------------------------------------------------------------
-- INGRESSOS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tickets (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  ticket_code   VARCHAR(20)  NOT NULL UNIQUE,
  buyer_id      INT          NOT NULL,
  session_id    INT          NOT NULL,
  category      ENUM('comum','vip','imax') NOT NULL DEFAULT 'comum',
  seat_codes    VARCHAR(100) NOT NULL,  -- ex: "A3, A4"
  total_price   DECIMAL(8,2) NOT NULL,
  payment_method ENUM('pix','credit','debit') NOT NULL,
  status        ENUM('pending','paid','cancelled') NOT NULL DEFAULT 'pending',
  food_code     VARCHAR(20),
  issued_at     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (buyer_id)   REFERENCES buyers(id),
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

-- ------------------------------------------------------------
-- ITENS DO INGRESSO (1 linha por poltrona/tipo)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ticket_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id   INT         NOT NULL,
  seat_code   VARCHAR(5)  NOT NULL,
  entry_type  ENUM('inteira','meia-estudante','meia-60') NOT NULL DEFAULT 'inteira',
  unit_price  DECIMAL(6,2) NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- BOMBONIERE — PEDIDOS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS snack_orders (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  order_code   VARCHAR(20)  NOT NULL UNIQUE,
  buyer_name   VARCHAR(120) NOT NULL,
  cpf_hash     VARCHAR(64)  NOT NULL,
  total_price  DECIMAL(8,2) NOT NULL,
  payment_method ENUM('pix','credit','debit') NOT NULL,
  status       ENUM('pending','paid','ready','delivered') NOT NULL DEFAULT 'pending',
  ordered_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS snack_order_items (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  order_id     INT         NOT NULL,
  snack_name   VARCHAR(80) NOT NULL,
  quantity     TINYINT     NOT NULL DEFAULT 1,
  unit_price   DECIMAL(6,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES snack_orders(id) ON DELETE CASCADE
);

-- ============================================================
--  SEED — Filmes em cartaz
-- ============================================================
INSERT IGNORE INTO films (id,title,genre,rating,min_age,emoji,duration,year,director,cast_list,description,img_url) VALUES
(1,'Michael','Biopic / Musical','12',12,'🎤','2h 08min',2026,'Antoine Fuqua','Jaafar Jackson, Colman Domingo, Nia Long, Miles Teller','A cinebiografia definitiva do Rei do Pop.','https://image.tmdb.org/t/p/w220_and_h330_face/2FYFBgdNVVaUgVfNSh9z5WVTZ9y.jpg'),
(2,'Super Mario Galaxy: O Filme','Animação / Aventura','L',0,'🍄','1h 39min',2026,'Aaron Horvath, Michael Jelenic','Chris Pratt, Anya Taylor-Joy, Charlie Day','Mario e seus aliados embarcam em uma aventura galáctica.','https://image.tmdb.org/t/p/w220_and_h330_face/b3WeTp42eJSRuE4UZfyPCOJW4c.jpg'),
(3,'O Diabo Veste Prada 2','Comédia / Drama','12',12,'👠','2h 05min',2026,'David Frankel','Meryl Streep, Anne Hathaway, Emily Blunt','Miranda Priestly e Andy Sachs retornam em uma nova era da moda digital.','https://image.tmdb.org/t/p/w220_and_h330_face/50yWyY981TyUHhoxxSEKwO70FmQ.jpg'),
(4,'Exit 8','Terror / Suspense','16',16,'🚇','1h 45min',2026,'Genki Kawamura','Kazunari Ninomiya, Yamato Kôchi','Adaptação do viral jogo de terror japonês.','https://image.tmdb.org/t/p/w220_and_h330_face/naszJRWpzgbrR9vdifVoQ9IpNqW.jpg'),
(5,'Hokum: O Pesadelo da Bruxa','Terror','16',16,'🔮','1h 52min',2026,'Damian McCarthy','Adam Scott, David Wilmot, Austin Amelio','Uma família se muda para uma casa aparentemente perfeita.','https://image.tmdb.org/t/p/w220_and_h330_face/b9fyqIgQKW0VK1eKTsKKa5ijHOn.jpg');

-- SEED — Filmes em breve
INSERT IGNORE INTO soon_films (title,genre,rating,min_age,emoji,release_date,director,cast_list,description,img_url) VALUES
('Mestres do Universo','Ação','12',12,'⚔️','2026-06-04','Yann Demange','Nicholas Galitzine, Elodie Yung, Sarah Michelle Gellar','He-Man enfrenta uma ameaça cósmica em live action.','https://media.themoviedb.org/t/p/w220_and_h330_face/dobbDBQC0G9m65pcVaDM2D2aMr8.jpg'),
('Mortal Kombat 2','Ação','16',16,'⚔️','2026-06-04','Simon McQuoid','Ludi Lin, Jessica Henwick, Tadanobu Asano','Liu Kang reúne guerreiros de todas as dimensões.','https://media.themoviedb.org/t/p/w220_and_h330_face/jWOUkeXhlyDAmOm6RoznLVHKXRy.jpg'),
('Dia D','Ficção Científica','14',14,'🌍','2026-06-11','Steven Spielberg','Emily Blunt, Tom Holland, John David Washington','Um grupo de cientistas descobre um portal temporal.','https://media.themoviedb.org/t/p/w220_and_h330_face/pmff1wjKrgJi92PPr346lAifzlg.jpg'),
('Supergirl','Super-Herói','12',12,'🦸‍♀️','2026-06-25','Jenna Malone','Sasha Calle, Helen Slater, Michael Keaton','Kara Zor-El chega à Terra em um filme solo repleto de ação.','https://media.themoviedb.org/t/p/w220_and_h330_face/lJVug1z4VFIEAEopgiCxZy2yOzX.jpg'),
('Toy Story 5','Animação','L',0,'🤠','2026-07-09','Josh Cooley','Tom Hanks, Tim Allen, Annie Potts','Woody e Buzz retornam para uma nova aventura repleta de nostalgia.','https://media.themoviedb.org/t/p/w220_and_h330_face/dlZR5AE2NfKeZYxCKAvLGKSjncS.jpg'),
('A Odisseia','Épico','14',14,'🌊','2026-07-16','Christopher Nolan','Timothée Chalamet, Zendaya, Oscar Isaac','Nolan reinventa o clássico de Homero.','https://media.themoviedb.org/t/p/w220_and_h330_face/lkShxOPlelgr3R7zYAcG00w6Z94.jpg'),
('Vingadores: Doutor Destino','Super-Herói','12',12,'🦾','2026-12-17','Sharmeen Obaid-Chinoy','Robert Downey Jr., Elizabeth Olsen, Patrick Stewart','Doutor Destino assume o controle das realidades.','https://media.themoviedb.org/t/p/w220_and_h330_face/i29O7K4n3z5qB2SAJmSc0kR5dPj.jpg'),
('Duna: Parte 3','Ficção Científica','14',14,'🏜️','2026-12-17','Denis Villeneuve','Timothée Chalamet, Zendaya, Florence Pugh','A conclusão da saga de Paul Atreides.','https://media.themoviedb.org/t/p/w220_and_h330_face/b4wekkUaxExzOeGe7hKXzhnyXHt.jpg');

-- SEED — Sessões de hoje
INSERT IGNORE INTO sessions (film_id, room, start_time, category, date) VALUES
(1,'Sala 1','14:00:00','comum', CURDATE()),
(1,'Sala 2','20:30:00','vip',   CURDATE()),
(2,'Sala 3','15:30:00','comum', CURDATE()),
(3,'Sala 1','18:00:00','comum', CURDATE()),
(4,'Sala 2','22:00:00','comum', CURDATE()),
(5,'Sala 3','16:30:00','imax',  CURDATE());