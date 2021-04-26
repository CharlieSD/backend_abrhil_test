"use strict"

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://0.0.0.0:8080';

var agent = chai.request.agent(url)

describe('Authenticate a user: ', () => {
	describe("Check validate user: ", function () {
		it('should receive an OK and a Json with the authentication token', (done) => {
			agent
				.post('/autenticar')
				.send(
					{
						"usuario": 'AbrhilUser',
						"contrasena": 'AbrhilPass'
					})
				.end(function (err, res) {
					expect(res.body).to.have.property('token');
					expect(res).to.have.status(200);
					done();
				});
		});

		it('should receive an ERROR and a Json with the error message', (done) => {
			agent
				.post('/autenticar')
				.send(
					{
						"usuario": 'AbrhilUser',
						"contrasena": 'wrongPass'
					})
				.end(function (err, res) {
					expect(res.body).to.have.property('mensaje');
					expect(res).to.have.status(403);
					done();
				});
		});
	});
});

