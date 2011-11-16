// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘ip’
 */
exports['Test ‘ip’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'ip'
  };

  [
    '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 1);
  test.done();

};