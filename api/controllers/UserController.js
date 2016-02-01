/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var co = require('co');

module.exports = {

  /**
   * `UserController.create()`
   */
  create: co.wrap(function*(req, res) {
		try {
			console.log('at user create');
			var user = yield User.create({
					name: req.query.name,
					address: req.query.address || null
				});
			res.json(user);
		}
		catch (err) {
			res.serverError(err);
		}
  }),


  /**
   * `UserController.show()`
   */
  show: co.wrap(function*(req, res) {
		try {
			console.log('at user show');
			var user = yield User.find({
				where : { id : req.query.id }
			});
			res.json(user);
		}
		catch (err) {
			res.serverError(err);
		}
  }),

  /**
   * `UserController.list()`
   */
  list: co.wrap(function*(req, res) {
		try {
			console.log('at user list');
			console.log(req.query, req.path, req.params);
			var users = yield User.findAll({});
			res.json(users);
		}
		catch (err) {
			res.serverError(err);
		}
  }),
  
  transaction : co.wrap(function*(req,res){
		try {
			console.log('at transaction test');
			var t = yield sequelize.transaction();
			
			var opt = {transaction : t};
			
			var joao = yield User.create({ name : 'Joao' }, opt);
			console.log('Saved:', JSON.stringify(joao, null, ' '));
			
			// Specify an existing id to generate an error and a rollback
			var maria = yield User.create({ name : 'Maria', id : req.query.id }, opt);
			console.log('Saved:', JSON.stringify(maria, null, ' '));
			
			res.json([joao,maria]);
			yield t.commit();
		}
		catch (err) {
			console.log('error caught:',err);
			yield t.rollback();
			res.serverError(err);
		}
  }),
  
  test : co.wrap(function*(req,res) {
		try {
			var beginDate = new Date();
			beginDate.setHours(beginDate.getHours() - 1);

			var endDate = new Date();
			endDate.setHours(endDate.getHours() + 1);

			console.log(beginDate.toISOString(), endDate.toISOString());

			var user1 = yield User.create({
					name : 'Some Crazy Name',
					beginDate : beginDate, 
					endDate : endDate
				});
			//console.log('Saved:', user1);

			var now = new Date();
			console.log(now.toISOString());

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

