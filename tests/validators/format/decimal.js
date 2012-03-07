// Load dependencies
var amanda = require('../../../dist/latest.js');

/**
 * Test ‘decimal’
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    format: 'decimal'
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
    19723.129319,
    '+@#$~^*{}',
    'lorem ipsum',
    ' ',
    null,
    [],
    {},
    function() {},
    null,
    undefined
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 19);
  test.done();

};