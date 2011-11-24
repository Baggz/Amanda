// Load dependencies
var amanda = require('../src/amanda.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  /**
   * AddValidator
   */
  amanda.addValidator('unique', function(property, propertyValue, validator, propertyValidators, callback) {

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
    if (validator && takenUsernames.indexOf(propertyValue) !== -1) {
      return callback('Oops! This username - ' + propertyValue + ' - is taken.');
    } else {
      return callback(null);
    }

  });

  /**
   * Schema
   */
  var schema = {
    reqired: true,
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