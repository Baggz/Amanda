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

  amanda.validate('admin', schema, function(error) {
    count += 1;
    test.ok(error);
  });

  amanda.validate('administrator', schema, function(error) {
    count += 1;
    test.ok(error);
  });

  amanda.validate('superadmin', schema, function(error) {
    count += 1;
    test.ok(error);
  });

  amanda.validate('superadmin2', schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 4);
  test.done();

};