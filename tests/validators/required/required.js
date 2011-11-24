// Load dependencies
var amanda = require('../../../src/amanda.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var schema = {
    type: 'string',
    required: true
  };

  amanda.validate(null, schema, function(error) {
    test.ok(error);
  });

  amanda.validate(undefined, schema, function(error) {
    test.ok(error);
  });

  amanda.validate('Hello', schema, function(error) {
    test.equal(error, undefined);
  });

  test.done();

};