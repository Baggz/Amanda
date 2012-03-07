// Load dependencies
var amanda = require('../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    required: true,
    type: 'string',
    length: 2
  };

  [
    'a',
    'abc',
    'abcd'
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  amanda.validate('ab', schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 4);
  test.done();

};