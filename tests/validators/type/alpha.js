// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘alpha’
 */
exports['Test ‘alpha’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'alpha'
  };

  [
    'abc',
    'ABC',
    'Abc',
    'aBc'
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    '123',
    '+@#$~^*{}',
    'lorem ipsum',
    ' ',
    123,
    null,
    [],
    function() {}
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 12);
  test.done();

};