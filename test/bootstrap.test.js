var sails = require('sails');
var rc = require('rc');
var _ = require('lodash');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(30000);

  var custom = {
      log : { level : 'silent' },// warn, debug, error, silent
      models : { connection : 'postgresql' }
    };

  var options = _.extend({}, rc('sails'), custom);

  // console.log(options);

  sails.lift(options, function(err, server) {

    if (err) return done(err);
    // here you can load fixtures, etc.

    // console.log("Sails lifted");

    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
