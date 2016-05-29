/**
* UserController
*
* @description :: Server-side logic for managing users
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

var co = require('co');

var Valichain = require('valichain');
var V = Valichain.validate;
var VE = Valichain.extract;


var rules = {
	create : {
		name : new Valichain()
		           .s$trim()
		           .v$matches(/^[a-z\. ]+$/i)
		           .msg("Name must have only letters, spaces and dots"),
		address : new Valichain().default(null).s$trim().v$blacklist("'\""),
	},
	show : {
		id : new Valichain()._$toString().s$trim().v$isNumeric(),
	},
	list : {
		//...
	}
};



module.exports = {

	/**
	 @api {POST} /users Create user
	 @apiName PostUser
	 @apiVersion 0.0.0
	 @apiDescription Create an user. \
	     ***Blueprint:** GET /user/create?name=String&address=String
	 @apiGroup User

	 @apiParam {String} name The user's name.
	 @apiParam {String} address The user's address.

	 @apiSuccessExample {JSON} Success response:
		{
			"id": Number,
			"name": String,
			"address": String,
			"birthdayDate": Date,
			"beginDate": Date,
			"endDate": Date
		}
	*/
	create: co.wrap(function*(req, res) {
		try {
			sails.log.debug('at user create');

			// Using sails-hook-valichain
			var params = req.valichain(rules.create);
			if (!params) {
				console.log("Validation failed. Results:", req.valichain.result)
				return res.badRequest();
			}
			// console.log("validation succeeded: ", params);

			// Using valichain directly
			// var params = VE(V(rules.create, req.allParams()));
			// if (!params) return res.badRequest();

			
			var user = yield User.create({
					name: params.name,
					address: params.address
				});
			return res.json(user);
		}
		catch (err) {
			return res.serverError(err);
		}
	}),


	/**
	 @api {GET} /users/:id Get user
	 @apiName GetUser
	 @apiVersion 0.0.0
	 @apiDescription Get an user. \
	     ***Blueprint:** GET /user/show?id=Number
	 @apiGroup User

	 @apiParam {Number} id The user's identifier.
	 @apiParam {String} name The user's name.
	 @apiParam {String} address The user's address.

	 @apiSuccessExample {JSON} Success response:
		{
			"id": Number,
			"name": String,
			"address": String,
			"birthdayDate": Date,
			"beginDate": Date,
			"endDate": Date
		}

	 @apiErrorExample (404) User not found:
		null
	*/
	show: co.wrap(function*(req, res) {
		try {
			sails.log.debug('at user show', req.path, req.allParams(), req.params);

			var params = VE(V(rules.show, req.allParams()));
			if (!params) return res.badRequest();

			var user = yield User.find({
				where : { id : params.id }
			});
			if (!user) return res.notFound();
			return res.json(user);
		}
		catch (err) {
			res.serverError(err);
		}
	}),


	/**
	 @api {GET} /users Get users
	 @apiName GetUsers
	 @apiVersion 0.0.0
	 @apiDescription Get all users. \
	     ***Blueprint:** GET /user/list
	 @apiGroup User

	 @apiSuccessExample {JSON} Success response:
		[
			{
				"id": Number,
				"name": String,
				"address": String,
				"birthdayDate": Date,
				"beginDate": Date,
				"endDate": Date
			},
			...
		]

	 @apiErrorExample (404) User not found:
		null
	*/
	list: co.wrap(function*(req, res) {
		try {
			sails.log.debug('at user list');
			sails.log.debug(req.query, req.path, req.params);
			var users = yield User.findAll({});
			return res.json(users);
		}
		catch (err) {
			return res.serverError(err);
		}
	}),


	/**
	 @api {GET} /user/transaction Transaction sample
	 @apiName TransactionSample
	 @apiVersion 0.0.0
	 @apiDescription Get all users.
	 @apiGroup User

	 @apiParam {Number} id An user's identifier. Insert if does not exist, insert, 

	 @apiSuccessExample {JSON} Success response:
		[
			{
				"id": Number,
				"name": String,
				"address": String,
				"birthdayDate": Date,
				"beginDate": Date,
				"endDate": Date
			},
			{
				"id": Number,
				"name": String,
				"address": String,
				"birthdayDate": Date,
				"beginDate": Date,
				"endDate": Date
			}
		]
	*/
	transaction : Transaction.cowrap(function*(req, res) {
		try {
			// Transaction has already started by Transaction.cowrap().
			var opt = {
					transaction : req.transaction,
					logging : sails.log.debug
				};
			
			// BEGIN method body
			sails.log.debug('At transaction test');

			var joao = yield User.create({ name : 'Joao' }, opt);
			sails.log.debug('Saved:', JSON.stringify(joao, null, ' '));
			
			// Specify an existing id to generate an error and a rollback
			var maria = yield User.create({ name : 'Maria', id : req.param('id') }, opt);
			sails.log.debug('Saved:', JSON.stringify(maria, null, ' '));
			
			return res.json([joao,maria]); // send a 200 OK response
			// END method body

			// Once you have sent a 1xx, 2xx or 3xx HTTP staus code,
			// the Transaction is automatically commited on return,
			// but you SHOULD commit mannually to guarantee synchronity,
			// i.e., a subsequent request will be able to read the user.
			// Without a commit here, a subsequent request may try to
			// read the user before the transaction is committed,
			// resulting a 404 error.
			opt.transaction.commit();
		}
		catch (err) {
			sails.log.debug('Error caught:', err);
			// set HTTP status to 400 to rollback the transaction (any 400+ will do it)
			return res.badRequest();
			// You may also...
			//   use opt.transaction.roolback(),
			//   allow the exception be thrown to the caller (no try...catch),
			//   rethrow the exception to the caller,
			//   or throw your own exception.
		}
	}),


	/**
	 @api {GET} /user/test Test dates
	 @apiName TestDates
	 @apiVersion 0.0.0
	 @apiDescription Test insertion of dates.
	 @apiGroup User

	 @apiSuccessExample {JSON} Success response:
		[
			{
				"id": Number,
				"name": String,
				"address": String,
				"birthdayDate": Date,
				"beginDate": Date,
				"endDate": Date
			},
			{
				"id": Number,
				"name": String,
				"address": String,
				"birthdayDate": Date,
				"beginDate": Date,
				"endDate": Date
			}
		]
	*/
	test : co.wrap(function*(req,res) {
		try {
			var beginDate = new Date();
			beginDate.setHours(beginDate.getHours() - 1);

			var endDate = new Date();
			endDate.setHours(endDate.getHours() + 1);

			sails.log.debug(beginDate.toISOString(), endDate.toISOString());

			var user1 = yield User.create({
					name : 'Some Crazy Name',
					beginDate : beginDate, 
					endDate : endDate
				});
			//console.log('Saved:', user1);

			var now = new Date();
			sails.log.debug(now.toISOString());

			var user2 = yield User.find({
					where : {
						id : user1.id,
						beginDate : { $lt : now },
						endDate : { $gt : now }
					},
					order : 'begin_date'
				});
			
			//console.log('Found:',user2);
			
			return res.json([user1, user2]);
		}
		catch (err) {
			return res.serverError(err);
		}
		return null;
	})
};
