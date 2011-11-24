// Load dependencies
var amanda = require('../../../src/amanda.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    type: 'boolean'
  };
  
  amanda.validate(true, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate(false, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  [
    '123',
    '+@#$~^*{}',
    'lorem ipsum',
    123,
    [],
    {},
    function() {}
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 9);
  test.done();

};