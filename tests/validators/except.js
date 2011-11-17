// Load dependencies
var amanda = require('../../src/amanda.js');

exports['Test ‘except’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'string',
    except: [
      'admin',
      'administrator',
      'superadmin'
    ]
  };

  [
    'admin',
    'administrator',
    'superadmin'
  ].forEach(function(user) {
    amanda.validate(user, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  amanda.validate('superadmin2', schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 4);
  test.done();

};