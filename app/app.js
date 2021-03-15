'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const token = require('./config/token');
const { sequelize, contacto } = require('./models');

// App
const app = express();
app.use(express.json());
app.set('key', token.key);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authTokenAccess = express.Router(); 
authTokenAccess.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
        jwt.verify(token, app.get('key'), (err, decoded) => {      
            if (err) {
                return res.status(401).json({ mensaje: 'Token incorrecto' });    
            } else {
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        return res.status(401).json({ mensaje: 'No se encuentra token de acceso.' });
    }
 });

app.post('/autenticar', (req, res) => {
  if(req.body.usuario === "AbrhilUser" && req.body.contrasena === "AbrhilPass") {
    const payload = {
      check:  true
    };
    const token = jwt.sign(payload, app.get('key'), {
      expiresIn: 1440
    });
    res.json({
      mensaje: 'Autenticación correcta',
      token: token
    });
  } else {
    return res.status(403).json({ mensaje: "Usuario o contraseña incorrectos"})
  }
})

app.post('/contactos', authTokenAccess, async(req, res) => {
  const { first_name, last_name, phone, email, photo } = req.body
  try{
    const new_contacto = await contacto.create({ first_name, last_name, phone, email, photo })
    return res.status(201).json(new_contacto)
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
});

app.get('/contactos', authTokenAccess, async(req, res) => {
  try{
    const contactos = await contacto.findAll()
    return res.json(contactos)
  }catch(err){
    console.log(err)
    return res.status(500).json("Error al obtener a los usuarios")
  }
});

app.get('/contactos/:uuid', authTokenAccess, async(req, res) => {
  const uuid = req.params.uuid
  try{
    const contact = await contacto.findOne({
      where : { uuid }
    })
    return res.json(contact)
  }catch(err){
    console.log(err)
    return res.status(500).json("Error al obtener al usuario")
  }
});

app.put('/contactos/:uuid', authTokenAccess, async(req, res) => {
  const uuid = req.params.uuid
  const { first_name, last_name, phone, email, photo } = req.body
  try{
    const updated_contacto = await contacto.findOne({
      where : { uuid }
    })
    updated_contacto.first_name = first_name
    updated_contacto.last_name = last_name
    updated_contacto.phone = phone
    updated_contacto.email = email
    updated_contacto.photo = photo
    await updated_contacto.save()
    return res.status(201).json(updated_contacto)
  }catch(err){
    console.log(err)
    return res.status(500).json("Error al actualizar al usuario")
  }
});

app.delete('/contactos/:uuid', authTokenAccess, async(req, res) => {
  const uuid = req.params.uuid
  try{
    const delete_contacto = await contacto.findOne({
      where : { uuid }
    })
    await delete_contacto.destroy()
    return res.json({msg: "Usuario eliminado"})
  }catch(err){
    console.log(err)
    return res.status(500).json("Error al eliminar al usuario")
  }
});

app.listen( PORT, HOST, async() => {
  console.log(`Running on http://${HOST}:${PORT}`);
  await sequelize.sync({ });
  console.log(`Base de datos sincronizada`);
  await sequelize.authenticate();
  console.log(`Conexion con Base de datos`);
});
