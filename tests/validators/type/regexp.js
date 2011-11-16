// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘regexp’
 */
exports['Test ‘regexp’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'regexp'
  };

  [
    new RegExp()
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 1);
  test.done();

};