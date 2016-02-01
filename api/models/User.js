/*
 create table public.user (
   id serial not null,
   name varchar(40) not null,
   address varchar(100) null,
   primary key(id));
*/


module.exports = {

	attributes : {
		id : {
			type : Sequelize.INTEGER,
			autoIncrement: true,
			allowNull : false,
			primaryKey: true
		},
		name : {
			type : Sequelize.STRING,
			allowNull : false
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
	
	options : {
		tableName: 'user',
		createdAt: false,
		updatedAt: false,
		deletedAt: false
	}
};

