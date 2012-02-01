// Load dependencies
var amanda = require('../../src/amanda.js');

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
    maxLength: 10
  };

  [
    'a',
    'ab',
    'abc',
    'abcd',
    'abcde',
    'abcdef',
    'abcdefg',
    'abcdefgh',
    'abcdefghi',
    'abcdefghij'
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });
  });

  [
    'abcdefghijk',
    'abcdefghijkl',
    'abcdefghijklm'
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  test.equal(count, 13);
  test.done();

};