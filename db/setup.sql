-- final version: Make eMail constrained to be unique. For early testing, easier not to.

CREATE TABLE users (
  id uuid not null primary key,
  password varchar(64) not null, -- bcrypt stores hashed password together with its salt.
  first_name varchar(64) not null,
  last_name varchar(64) not null,
  email varchar(64) not null unique,
  cash_position bigint default 1000000
);

CREATE INDEX ON users (first_name);
CREATE INDEX ON users (last_name);
CREATE INDEX ON users (email);
CREATE INDEX ON users (cash_position);

INSERT INTO users
(id, password, first_name, last_name, email, cash_position)
VALUES
('A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11', 'foo', 'john', 'smith', 'john_smith@example.com', 1000000)