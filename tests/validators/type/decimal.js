// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘decimal’
 */
exports['Test ‘decimal’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'decimal'
  };

  [
    1,
    10,
    20,
    30,
    1.11,
    1.23,
    1.30,
    230.36
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    1.123981273,
    19723.129319
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 10);
  test.done();

};