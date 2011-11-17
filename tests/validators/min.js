// Load dependencies
var amanda = require('../../src/amanda.js');

exports['Test ‘min’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'number',
    min: 10
  };

  [
    2,
    {},
    null,
    [],
    function() {},
    'Hello!' 
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      count += 1;
      test.ok(error);
    });
  });

  amanda.validate(10, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate(12, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 8);
  test.done();

};