# sails-sequelize

a [Sails](http://sailsjs.org) application


# Services

List all users
http://localhost:1337/user/list

Show some specific user
http://localhost:1337/user/show?id=7

Create a new user
http://localhost:1337/user/create?name=Bob

Test INSERTion and SELECTion of dates
http://localhost:1337/user/test

Test transaction usage
http://localhost:1337/user/transaction?[id=90]



# Packages
co, pg, sails-hook-sequelize

co library is generating a warning related to not returning promises. 
To prevent this from be printed, add return statements on
co()'s functions next() calls inside index.js.


# See
api/controllers/, api/models/, config/connections.js, config/models.js.





