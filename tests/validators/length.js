// Load dependencies
var amanda = require('../../src/amanda.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema1 = {
    required: true,
    type: 'string',
    length: [2, 4]
  };

  var schema2 = {
    type: 'string',
    length: 2
  };

  [
    'ab',
    'abc',
    'abcd'
  ].forEach(function(input) {
    amanda.validate(input, schema1, function(error) {
      count += 1;
      test.equal(error, undefined);
    });
  });

  [
    '',
    'a',
    'abcde'
  ].forEach(function(input) {
    amanda.validate(input, schema1, function(error) {
      count += 1;
      test.ok(error);
    });
    amanda.validate(input, schema2, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  amanda.validate('ab', schema2, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  

  test.equal(count, 10);
  test.done();

};