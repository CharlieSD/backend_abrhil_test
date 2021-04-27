CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE contactos;

\c contactos;

CREATE TABLE contacto (
    id SERIAL PRIMARY KEY,
    uuid uuid,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    photo character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
