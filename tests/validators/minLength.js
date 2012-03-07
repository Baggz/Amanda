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
    minLength: 2
  };

  [
    '',
    'a'
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  [
    'ab',
    'abc',
    'abcd',
    'abcde',
    'abcdef',
    'abcdefg',
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });
  });

  test.equal(count, 8);
  test.done();

};