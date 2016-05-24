var should = require('should');

var request = require('co-supertest')('http://localhost:1337');

var data = { name : "Martin L. King", address : "Some Street, 33"};


describe('UserController', function() {

	this.timeout(50000);

	describe('RESTful', function() {

		it('GET /users', function(done) {
			request.get('/users').expect(200, done);
		});

		var uid = 0;

		it('POST /users', function*() {
			var x = yield request
				.post('/users')
				.send(data)
				.expect(200);

			sails.log.debug(x.body);
			x.body.should.have.property('id');

			uid = x.body.id;
		});


		it('GET /users/:uid', function*() {
			sails.log.debug(uid);
			yield request.get('/users/' + uid).expect(200);
		});

	});


	describe('Browser-GET', function() {

		it('GET /user/list', function(done) {
			request.get('/user/list').expect(200, done);
		});

		var uid = 0;

		it('GET /user/create', function*() {
			var x = yield request
				.get('/user/create')
				.query(data)
				.expect(200);

			sails.log.debug(x.body);
			x.body.should.have.property('id');

			uid = x.body.id;
		});


		it('GET /user/show', function*() {
			sails.log.debug(uid);
			yield request
				.get('/user/show')
				.query({'id': uid})
				.expect(200);
		});


		it('GET /user/test', function(done) {
			request.get('/user/test').expect(200, done);
		});


		it('GET /user/transaction -> 500', function*() {
			sails.log.debug(uid);
			yield request
				.get('/user/transaction')
				.query({'id': uid})
				.expect(400);
		});


		it('GET /user/transaction -> 200', function*() {
			var e = true;
			var uid = 0;
			while (e) {
				e = yield User.findById(uid = _.random(1000000, 9999999));
			}

			yield request
				.get('/user/transaction')
				.query({'id': uid})
				.expect(200);
		});

	});



});