// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘date’
 */
exports['Test ‘date’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'date'
  };

  [
    new Date()
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    0,
    1,
    2,
    null,
    {},
    [],
    function() {},
    'Hello!',
    undefined,
    ''
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 11);
  test.done();

};