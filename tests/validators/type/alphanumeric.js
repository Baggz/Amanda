// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘alphanumeric’
 */
exports['Test ‘alphanumeric’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'alphanumeric'
  };

  [
    'abc123',
    '123abc',
    'a1b2c3',
    'abc',
    'ABC',
    'Abc',
    '123',
    123
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    undefined,
    '+@#$~^*{}',
    'lorem ipsum',
    ' ',
    null,
    [],
    function() {}
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 15);
  test.done();

};