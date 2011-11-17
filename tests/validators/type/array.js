// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘array’
 */
exports['Test ‘array’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'array'
  };

  [
    [],
    [1, 2, 3],
    ['a', 'b', 'c'],
    [function() {}, function() {}],
    [{}, {}, {}]
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    '',
    null,
    undefined,
    {},
    function() {},
    123
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 11);
  test.done();

};