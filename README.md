# backend_abrhil_test
Repositorio Aplicación para el control de contactos


API de contactos basada en Node.js, requiere de un token de autorización para poder realizar peticiones.

## Paths

- GET **/contactos**: Obtiene la lista de contactos registrados.
- GET **/contactos/[uuid]**: Obtiene un contacto basado por UUID.
- POST **/contactos/**: Agrega un nuevo contacto, la petición recibe los datos del nuevo contacto mediante el body.
- PUT **/contactos/[uuid]**: Actualiza la información de un contacto registrado obtenido por UUID, la petición recibe los datos nuevos del contacto mediante el body.
- DELETE **/contactos/[uuid]**: Elimina un contacto basado por UUID.
- POST **/autenticar/**: Recibe usuario y contraseña para generar un token de acceso que ayude a realizar las peticiones.

## Docker

Se cuenta con 2 servicios: **backend** y **db**. Al ejecutar le programa se habilita una red virtual interna de Docker que ejecuta cada uno de los servicios:
- **Backend** contenedor diseñado para servicios en Node.JS, se ejecuta en la espera de peticiones en el puerto :8000 del host.
- **Db** contenedor diseñado para la ejecución del motor de base de datos PostgreSQL.

## Goals

1. Se crea repositorio de backend, contiene servicio de Node y Base de datos en Postgres.
2. Contiene 2 manereas de generar la Base de datos Contactos: por medio de script _CreateDB.sql_, o por medio de ORM de Node.
3. Se crea CRUD de contactos con _Express, Sequelize y Node_, se cresa middleware de autenticación por token.


