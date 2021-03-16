CREATE DATABASE contactos;

\c contactos;

CREATE TABLE contacto(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    photo  VARCHAR(80) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
);
