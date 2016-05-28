/*
CREATE TABLE "user" (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    address character varying(100),
    birthday_date timestamp with time zone,
    begin_date timestamp with time zone,
    end_date timestamp with time zone
);
*/

var co = require('co');

var Valichain = require('valichain');
var V = Valichain.validate;
var VE = Valichain.extract;


// Validation rules
var rules = {
	findByEmail : {	// building on module loading
		email : new Valichain()._$isString().s$trim().v$isEmail().v$blacklist("'\""),
	}
};


module.exports = {

	options : {
		tableName: 'user',
		createdAt: false,
		updatedAt: false,
		deletedAt: false,
		classMethods : {
			search : function(params, opt) {

				if (!rules.search)
					rules.search = {	// building rules on first usage
							text : new Valichain()._$isString().s$trim().v$isAlphanumeric(),
							offset : new Valichain().default(0)._$toString().v$isNumeric()._$toInteger(),
							limit : new Valichain().default(20)._$toString().v$isNumeric()._$toInteger(),
						};

				// Validation: the long way
				var v = V(rules.search, params);
				if (!v.valid) return Promise.resolve(null);
				params = _.mapValues(v.values, function(v) { return v.value; });

				// Validation: the short way
				params = VE(V(rules.search, params));
				if (!params) return Promise.resolve(null);


				var offset = params.offset;
				var limit = params.limit;
				var query = "SELECT 1"; // ... params.text

				var opt2 = _.extend({ type: sequelize.QueryTypes.SELECT}, opt);

				// no co.wrapped functions must return a promise
				return sequelize.query(query, opt2);  // returns a promise
			},

			// We know the table does not have any email attribute. It's just an example!
			findByEmail: co.wrap(function*(params, opt) {

				params = VE(V(rules.search, params));
				if (!params) return Promise.resolve(null);

				var opt2 = _.extend({ type: sequelize.QueryTypes.SELECT}, opt);
				var user = yield sequelize.query(`SELECT * FROM user WHERE email = '${params.email}'`, opt2); 
				return user;	// returns de actual object, instead of a promise.
			}),
		},

		instanceMethods : {
			getSomething : co.wrap(function*(params, opt) {
				// here `this` is an instance of the model.
				return null;					
			})
		},

		validate : {
			someComplexValidatonRule: function() {
				if (false) {
					throw new Error('Validation error on field foobar');
				}
			}
		}
	},

	attributes : {
		id : {
			type : Sequelize.INTEGER,
			autoIncrement: true,
			allowNull : false,
			primaryKey: true
		},
		name : {
			type : Sequelize.STRING,
			allowNull : false,
			validate : {
				is : /^[a-z\. ]+$/i
			}
		},
		address : {
			type : Sequelize.STRING,
			allowNull : true
		},
		birthdayDate : {
			type : Sequelize.DATE,
			allowNull : true,
			field : 'birthday_date',
			defaultValue : Sequelize.NOW
		},
		beginDate : {
			type : Sequelize.DATE,
			allowNull : true,
			field : 'begin_date',
		},
		endDate : {
			type : Sequelize.DATE,
			allowNull : true,
			field : 'end_date',
		}
	},

	associations : function() {
		// User.hasMany(Project, { as : 'Projects', foreignKey : 'fk_user_id'});
		// User.belongsTo(Office, { as : 'office', foreignKey : 'fk_office_id'});
	}
};
