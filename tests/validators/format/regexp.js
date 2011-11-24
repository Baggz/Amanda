// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    format: 'regexp'
  };

  [
    new RegExp(),
    /a/gi
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    new Date(),
    [],
    {},
    function() {},
    '11/11/11',
    11
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 8);
  test.done();

};