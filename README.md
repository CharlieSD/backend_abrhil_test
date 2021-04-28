# backend_abrhil_test

Repositorio Aplicación para el control de contactos

API de contactos basada en Node.js, requiere de un token de autorización para poder realizar peticiones.

## Paths

- GET **/api/contactos**: Obtiene la lista de contactos registrados.
- GET **/api/contactos/[uuid]**: Obtiene un contacto basado por UUID.
- POST **/api/contactos/**: Agrega un nuevo contacto, la petición recibe los datos del nuevo contacto mediante el body.
- PUT **/api/contactos/[uuid]**: Actualiza la información de un contacto registrado obtenido por UUID, la petición
  recibe los datos nuevos del contacto mediante el body.
- DELETE **/api/contactos/[uuid]**: Elimina un contacto basado por UUID.
- POST **/autenticar/**: Recibe usuario y contraseña para generar un token de acceso que ayude a realizar las
  peticiones.

## Docker

Se cuenta con 2 servicios: **backend** y **db**. Al ejecutar le programa se habilita una red virtual interna de Docker
que ejecuta cada uno de los servicios:

- **Backend** contenedor diseñado para servicios en Node.JS, se ejecuta en la espera de peticiones en el puerto :8000
  del host.
- **Db** contenedor diseñado para la ejecución del motor de base de datos PostgreSQL.

## Goals

1. Se crea repositorio de backend, contiene servicio de Node y Base de datos en Postgres.
1. Contiene 2 manereas de generar la Base de datos Contactos: por medio de script _CreateDB.sql_, o por medio de ORM de
   Node.
1. Se crea CRUD de contactos con _Express, Sequelize y Node_, se cresa middleware de autenticación por token.
1. Se crean 2 entornos: Desasrrollo y producción.
1. Se crean las pruebas unitarias por cada endpoint.
1. Se genera integración continua por medio de Github Actions.

## Paso de ejecución

Es necesario contar con Docker instalado.

1. Descargar el proyecto.
1. Abrir una terminal en la carpeta raiz.
1. Ejecutar el comando

````
docker-compose up --build -d
````

4. Al terminar la construccióon se pueden ejecutar las pruebas por medio del siguiente comando

```
docker-compose exec backend npm test
```

5. El servicio de node se ejecuta en la dirección: http://0.0.0.0:8000/api
6. Para detener el servicio se ejecuta el siguiente comando

```
docker-compose down 
```

## CI

El repositorio cuenta con Actions que permiten realizar pruebas de integración para el entorno productivo cada vez que
se realiza un push a la rama Develop y un pull-request a Main.

## Documentación de API

Se utiliza la herramienta Apiary para describir cada endpoint desarrollada.
