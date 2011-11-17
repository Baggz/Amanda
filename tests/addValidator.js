// Load dependencies
var amanda = require('../src/amanda.js');

exports['Test ‘addValidator’'] = function(test) {

  /**
   * AddValidator
   */
  amanda.addValidator('unique', function(paramName, paramValue, validator, validators, callback) {

    var takenUsernames = [
      'Baggz',
      'Amanda',
      'Administrator',
      'Admin'
    ];

    /**
     * {
     *   unique: true 
     * }
     */
    if (validator && takenUsernames.indexOf(paramValue) !== -1) {
      return callback('Oops! This username - ' + paramValue + ' - is taken.');
    } else {
      return callback(null);
    }

  });

  /**
   * Schema
   */
  var schema = {
    unique: true
  };

  [
    'Baggz',
    'Amanda',
    'Administrator',
    'Admin'
  ].forEach(function(input) {
    amanda.validate(input, schema, function(error) {
      test.ok(error);
    });
  });

  amanda.validate('Ryan', schema, function(error) {
    test.equal(error, undefined);
  });

  amanda.validate('Robb', schema, function(error) {
    test.equal(error, undefined);
  });

  test.done();

};