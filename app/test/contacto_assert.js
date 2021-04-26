"use strict"

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://0.0.0.0:8080';

var agent = chai.request.agent(url)

describe('Contacto CRUD: ', () => {
	describe("GET contacto list: ", function () {
		it('should receive an OK and get a list of contactos', (done) => {
			agent
				.post('/autenticar')
				.send(
					{
						"usuario": 'AbrhilUser',
						"contrasena": 'AbrhilPass'
					})
				.end(function (err, res) {
					expect(res.body).to.have.property('token');
					return agent
						.get('/api/contactos')
						.set('access-token', res.body.token)
						.end(function (err, res) {
							expect(res).to.have.status(200);
							expect(res.body).to.be.a('array');
							done();
						});
				});
		});

		it('should receive an ERROR and denied the contacto list access', (done) => {
			agent
				.get('/api/contactos')
				.set('access-token', "Invalidate Token")
				.end(function (err, res) {
					expect(res.body).to.have.property('mensaje');
					expect(res).to.have.status(401);
					done();
				});
		});
	});

	describe("POST new contacto to list: ", function () {
		it('send a new contacto and should receive an OK and get the property uuid & createdAt', (done) => {
			agent
				.post('/autenticar')
				.send(
					{
						"usuario": 'AbrhilUser',
						"contrasena": 'AbrhilPass'
					})
				.end(function (err, res) {
					expect(res.body).to.have.property('token');
					return agent
						.post('/api/contactos')
						.set('access-token', res.body.token)
						.send(
							{
								first_name: "Carlos Alberto",
								last_name: "Espinoza Diyarza",
								phone: "2222222222",
								email: "carloN@correoN.com",
								photo: "Hola"
							}
						)
						.end(function (err, res) {
							expect(res).to.have.status(201);
							expect(res.body).to.have.property('uuid');
							expect(res.body).to.have.property('createdAt');
							done();
						});
				});
		});

		it('send a existing contacto and should receive an ERROR and get error message', (done) => {
			agent
				.post('/autenticar')
				.send(
					{
						"usuario": 'AbrhilUser',
						"contrasena": 'AbrhilPass'
					})
				.end(function (err, res) {
					expect(res.body).to.have.property('token');
					return agent
						.post('/api/contactos')
						.set('access-token', res.body.token)
						.send(
							{
								first_name: "Carlos Alberto",
								last_name: "Espinoza Diyarza",
								phone: "2222222222",
								email: "carloN@correoN.com",
								photo: "Hola"
							}
						)
						.end(function (err, res) {
							expect(res).to.have.status(500);
							expect(res.body).to.have.property('errors');
							expect(res.body).to.have.property('fields');
							done();
						});
				});
		});

		it('should receive an ERROR and denied the contacto access', (done) => {
			agent
				.post('/api/contactos')
				.set('access-token', "Invalidate Token")
				.send(
					{
						first_name: "Carlos Alberto",
						last_name: "Espinoza Diyarza",
						phone: "2222222222",
						email: "carloN@correoN.com",
						photo: "Hola"
					}
				)
				.end(function (err, res) {
					expect(res.body).to.have.property('mensaje');
					expect(res).to.have.status(401);
					done();
				});
		});
	});

	describe("PUT new info to contacto: ", function () {
		it('send an update to an extinting contacto and should receive an OK and get the property uuid & updatedAt', (done) => {
			agent
				.post('/autenticar')
				.send(
					{
						"usuario": 'AbrhilUser',
						"contrasena": 'AbrhilPass'
					})
				.end(function (err, res) {
					expect(res.body).to.have.property('token');
					agent
						.get('/api/contactos')
						.set('access-token', res.body.token)
						.end(function (err, res2) {
							expect(res2).to.have.status(200);
							expect(res2.body).to.be.a('array');
							console.log(res2.body[0].uuid);
							return agent
								.put('/api/contactos/' + res2.body[0].uuid)
								.set('access-token', res.body.token)
								.send(
									{
										first_name: "Carlos Alberto",
										last_name: "Espinoza Diyarza",
										phone: "2222222222",
										email: "carlosUpdated@correo.com",
										photo: "Imagen Actualizada"
									}
								)
								.end(function (err, res) {
									expect(res).to.have.status(201);
									expect(res.body).to.have.property('uuid');
									expect(res.body).to.have.property('updatedAt');
									done();
								});
						});
				});
		});

		it('send update info to a inexisting contacto and should receive an ERROR and get error message', (done) => {
			agent
				.post('/autenticar')
				.send(
					{
						"usuario": 'AbrhilUser',
						"contrasena": 'AbrhilPass'
					})
				.end(function (err, res) {
					return agent
						.put('/api/contactos/' + "406317db-f420-494f-b133-ffffffffffff")
						.set('access-token', res.body.token)
						.send(
							{
								first_name: "Carlos",
								last_name: "Espinoza Diyarza",
								phone: "2222222222",
								email: "carlosNull@correo.com",
								photo: "Imagen"
							}
						)
						.end(function (err, res) {
							expect(res).to.have.status(500);
							done();
						});

				});
		});

		it('should receive an ERROR and denied the contacto access', (done) => {
			agent
				.put('/api/contactos/406317db-f420-494f-b133-ffffffffffff')
				.set('access-token', "Invalidate Token")
				.send(
					{
						first_name: "Carlos Alberto",
						last_name: "Espinoza Diyarza",
						phone: "2222222222",
						email: "carloN@correoN.com",
						photo: "Hola"
					}
				)
				.end(function (err, res) {
					expect(res.body).to.have.property('mensaje');
					expect(res).to.have.status(401);
					done();
				});
		});


	});
});