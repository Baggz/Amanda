// Load dependencies
var amanda = require('../../src/amanda.js');

exports['Test ‘values’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'string',
    values: [
      'admin',
      'administrator'
    ]
  };

  amanda.validate('admin', schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate('administrator', schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate('superadmin', schema, function(error) {
    count += 1;
    test.ok(error);
  });

  test.equal(count, 3);
  test.done();

};