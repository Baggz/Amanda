// Load dependencies
var amanda = require('../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    type: 'array',
    uniqueItems: true,
    items: {
      type: 'string'
    }
  };

  [
    ['a', 'a', 'a'],
    ['a', 'a', 'b'],
    ['a', 'b', 'a'],
    ['a', 'c', 'c'],
    ['a', 'c', 'a', 'c']
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  amanda.validate([], schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate(['a', 'b', 'c'], schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });


  test.equal(count, 7);
  test.done();

};