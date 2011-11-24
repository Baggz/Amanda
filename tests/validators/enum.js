// Load dependencies
var amanda = require('../../src/amanda.js');

/**
 * Test #1
 */
exports['Test ‘#1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    type: 'string',
    enum: [
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