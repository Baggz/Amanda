// Load dependencies
var amanda = require('../../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    format: 'int'
  };

  [
    1,
    2,
    3,
    4,
    5,
    6,
    -1,
    -2
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 8);
  test.done();

};