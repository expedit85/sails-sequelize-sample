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

