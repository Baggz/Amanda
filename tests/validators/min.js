// Load dependencies
var amanda = require('../../src/amanda.js');

exports['Test ‘min’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'number',
    min: 10
  };

  amanda.validate(2, schema, function(error) {
    count += 1;
    test.ok(error);
  });

  amanda.validate(10, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate(12, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 3);
  test.done();

};