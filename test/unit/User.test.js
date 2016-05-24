var should = require('should');
//var expect = require('expect.js');


function getrand() { return (new Date()).getTime(); }

function buildName() { return 'user' + getrand(); }

function buildEmail() { return 'user' + getrand() + '@email.com'; }

function failtest(obj, kv) {
	var m = "User creation should fail, but was accepted.";
	return function*() {
		try {
			var u = yield User.create(_.extend({}, obj, kv));
			// console.log(u.dataValues);
			throw new Error(m);
		}
		catch (e)
		{
			if (e.message == m) throw e;
		}
	};
}


describe("User", function() {
	describe("#create()", function() {

		this.timeout(1000);

		it('should create one user and update it', function*() {
			var e = yield User.create({
					name: 'John Smith',
					address : '1st Street, 10'
				});

			e.should.have.property('name');
			e.should.have.property('address');

			e.name = 'John Paul Smith';
			yield e.save();

			e = yield User.findById(e.get('id'));
			e.should.have.property('name', 'John Paul Smith');
		});

	});

	describe("#findAll()", function() {

		it('should find all', function*() {
			var users = yield User.findAll({});

			users.should
				.not.have.lengthOf(0);
		});

	});
});
