# Sails-sequelize sample

A Sails application sample configured for using Sequelize (ORM) with Postgresql, generators (yield), APIdoc (REST documentation) and Mocha (testing). Use as a template for new projects.


## How to...

### Installation
    git clone https://github.com/expedit85/sails-sequelize-sample.git
    cd sails-sequelize-sample
    npm install
    sudo su postgres -c 'createdb sails-sequelize-sample'
    sudo su postgres -c 'psql sails-sequelize-sample < pg-dump-sample.sql'

**NOTE:** open the file config/connections.js and check your credentials for postgresql.

### Testing
    npm run single-test -- test/integration/controllers/User.test.js
    npm run unit-test
    npm run integration-test
    npm test

### Documentation ##
    npm run build-doc
    npm run build-doc-md

Then, browse [doc/index.html](doc/index.html) (local only) or open [apidoc.md](apidoc.md) in some markdown viewer.


### Running

#### Development environment
    sails lift

#### Production environment

    sails lift --prod


## Services

All the services in the [UserController](api/controllers/UserController.js), are available as GET-like (work in the browser's address bar) and RESTful-like (GET, POST, PUT and DELETE) request.

The table below shows the endpoints which works for browser's address bar:

| Service                     | Endpoint                                     |
|-----------------------------|----------------------------------------------|
| List all users              | http://localhost:1337/user/list              |
| Show some specific user     | http://localhost:1337/user/show?id=7         |
| Create a new user           | http://localhost:1337/user/create?name=Bob   |
| Test INSERT/SELECT of dates | http://localhost:1337/user/test              |
| Test transaction usage      | http://localhost:1337/user/transaction?id=90 |

For more details, see [apidoc.md](apidoc.md) and [inline docs](api/controllers/UserController.js).

**NOTE:** for security reasons, disable actions, shortcut and rest options on the production environment. See [blueprint API](http://sailsjs.org/documentation/reference/blueprint-api).


## Packages

- **Persistence:** pg, sails-hook-sequelize
- **Documentation:** apidoc
- **Testing:** mocha, expect.js, should, supertest, co-supertest
- **Co-routines:** co

**NOTE:** co library is generating a warning related to not returning promises. To prevent this from be printed, add return statements on co()'s functions next() calls inside index.js.


### See also:

- [Sails](http://sailsjs.org)
- [Sequelize](http://docs.sequelizejs.com)
- [Postgresql](http://www.postgresql.org)
- [APIdoc](http://apidocjs.com)
- [Mocha](http://mochajs.org)



## Summary of relevant files and folders:

- [doc-header.md](doc-header.md)
- [apidoc.md](apidoc.md)
- [pg-dump-sample.sql](pg-dump-sample.sql)
- [config/connections.js](config/connections.js)
- [config/models.js](config/models.js)
- [api/controllers/UserController.js](api/controllers/UserController.js)
- [api/models/User.js](api/models/User.js)
- [api/services/Transaction.js](api/services/Transaction.js)
- [test/](test/)



Enjoy!
