// Load dependencies
var amanda = require('../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    type: 'string',
    pattern: /a/
  };

  amanda.validate('hola', schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate('hello', schema, function(error) {
    count += 1;
    test.ok(error);
  });


  test.equal(count, 2);
  test.done();

};