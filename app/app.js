'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const express = require('express');
const Sequelize = require('sequelize');
const { sequelize, contacto } = require('./models')

// App
const app = express();
app.use(express.json());

app.post('/contactos', async(req, res) => {
  const { first_name, last_name, phone, email, photo } = req.body
  try{
    const new_contacto = await contacto.create({ first_name, last_name, phone, email, photo })
    return res.json(new_contacto)
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
});

app.get('/contactos', async(req, res) => {
  try{
    const contactos = await contacto.findAll()
    return res.json(contactos)
  }catch(err){
    console.log(err)
    return res.status(500).json("Error al obtener a los usuarios")
  }
});

app.get('/contactos/:uuid', async(req, res) => {
  const uuid = req.params.uuid
  try{
    const contactos = await contacto.findOne({
      where : { uuid }
    })
    return res.json(contactos)
  }catch(err){
    console.log(err)
    return res.status(500).json("Error al obtener a los usuarios")
  }
});


app.listen( PORT, HOST, async() => {
  console.log(`Running on http://${HOST}:${PORT}`);
  await sequelize.sync({ });
  console.log(`Base de datos sincronizada`);
  await sequelize.authenticate();
  console.log(`Conexion con Base de datos`);
});
