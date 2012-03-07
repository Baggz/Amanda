// Load dependencies
var amanda = require('../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    type: 'number',
    divisibleBy: 2
  };

  [
    1,
    3,
    5,
    7,
    9,
    11,
    111,
    1111
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  [
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    40,
    100,
    1000
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });
  });

  test.equal(count, 22);
  test.done();

};