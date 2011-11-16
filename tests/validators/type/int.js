// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘int’
 */
exports['Test ‘int’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'int'
  };

  [
    1,
    2,
    3,
    4,
    5,
    6,
    -1,
    -2
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 8);
  test.done();

};