// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘port’
 */
exports['Test ‘port’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'port'
  };

  [
    ':80',
    ':800',
    ':8080'
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 3);
  test.done();

};