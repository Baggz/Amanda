// Load dependencies
var amanda = require('../../src/amanda.js');

exports['Test ‘max’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'number',
    max: 10
  };

  amanda.validate(11, schema, function(error) {
    count += 1;
    test.ok(error);
  });

  amanda.validate(2, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate(10, schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 3);
  test.done();

};