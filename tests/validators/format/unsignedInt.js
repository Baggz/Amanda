// Load dependencies
var amanda = require('../../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    format: 'unsignedInt'
  };

  [
    1,
    2,
    3,
    4,
    5,
    6
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    -1212,
    -2112,
    -12.21
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 9);
  test.done();

};