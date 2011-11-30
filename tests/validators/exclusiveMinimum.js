// Load dependencies
var amanda = require('../../src/amanda.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    type: 'number',
    minimum: 10,
    exclusiveMinimum: true
  };

  [
    2,
    10,
    {},
    null,
    [],
    function() {},
    'Hello!',
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  amanda.validate(12, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 8);
  test.done();

};