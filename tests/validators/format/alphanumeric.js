// Load dependencies
var amanda = require('../../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    format: 'alphanumeric'
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

  test.equal(count, 17);
  test.done();

};