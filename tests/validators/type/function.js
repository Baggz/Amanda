// Load dependencies
var amanda = require('../../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    type: 'function'
  };
  
  amanda.validate(function() {}, schema, function(error) {
    test.equal(error, undefined);
  });

  test.done();

};