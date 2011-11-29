// Load dependencies
var amanda = require('../../src/amanda.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    type: 'array',
    maxItems: 2
  };

  [
    2,
    {},
    null,
    function() {},
    'Hello!',
    [1, 2, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 4, 5]
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  [
    [],
    [1],
    [1, 2]
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });
  });

  test.equal(count, 11);
  test.done();

};