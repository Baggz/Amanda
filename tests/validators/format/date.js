// Load dependencies
var amanda = require('../../../src/amanda.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    format: 'date'
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
    '123',
    '+@#$~^*{}',
    'lorem ipsum',
    ' ',
    123,
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

  test.equal(count, 15);
  test.done();

};