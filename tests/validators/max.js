// Load dependencies
var amanda = require('../../src/amanda.js');

exports['Test ‘max’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'number',
    max: 10
  };

  [
    11,
    100,
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

  amanda.validate(2, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate(10, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 9);
  test.done();

};