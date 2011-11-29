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
    maximum: 10,
    exclusiveMaximum: true
  };

  [
    11,
    100,
    {},
    null,
    [],
    function() {},
    'Hello!'
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  amanda.validate(10, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate(2, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 9);
  test.done();

};