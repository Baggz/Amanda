// Load dependencies
var amanda = require('../../src/amanda.js');

exports['Test ‘pattern’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'string',
    pattern: /a/
  };

  amanda.validate('hola', schema, function(error) {
    count += 1;
    test.equal(error, undefined);
  });

  amanda.validate('hello', schema, function(error) {
    count += 1;
    test.ok(error);
  });


  test.equal(count, 2);
  test.done();

};