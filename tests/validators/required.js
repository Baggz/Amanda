// Load dependencies
var amanda = require('../../src/amanda.js');

exports['Test ‘required’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'string',
    required: true
  };

  amanda.validate(null, schema, function(error) {
    count += 1;
    test.ok(error);
  });

  amanda.validate(undefined, schema, function(error) {
    count += 1;
    test.ok(error);
  });

  amanda.validate('a', schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  test.equal(count, 3);
  test.done();

};