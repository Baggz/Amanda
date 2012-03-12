if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../dist/latest.js');
}

/**
 * AddValidator
 * --------------------
 */
suite('JSON/addValidator', function() {

  var count = 0;

  /**
   * Validator
   */
  var Validator = amanda('json');

  /**
   * MyValidator
   */
  Validator.addValidator('myValidator', function(property, propertyValue, validator, propertyValidators, callback) {

    var usernames = [
      'Baggz',
      'Amanda',
      'Administrator',
      'Admin'
    ];

    if (validator && usernames.indexOf(propertyValue) !== -1) {
      return callback('Oops! This username - ' + propertyValue + ' - is taken.');
    } else {
      return callback();
    }

  });

  /**
   * Schema
   */
  var schema = {
    reqired: true,
    myValidator: true
  };

  /**
   * Schema2
   */
  var schema2 = {
    type: 'object',
    properties: {
      name: {
        required: true,
        type: 'string',
        format: 'alphanumeric',
        myValidator: true
      },
      username: {
        required: true,
        type: 'string',
        format: 'alphanumeric',
      }
    }
  };

  test('should return an error', function() {
    [
      'Baggz',
      'Amanda',
      'Administrator',
      'Admin'
    ].forEach(function(instance) {
      Validator.validate(instance, schema, function(error) {
        expect(error).to.be.ok();
      });
    });
  });

  test('should return an error', function() {
    [
      'Baggz',
      'Amanda',
      'Administrator',
      'Admin'
    ].forEach(function(input) {

      Validator.validate({
        name: input,
        username: 'Test'
      }, schema2, {
        singleError: false
      }, function(error) {
        expect(error).to.be.ok();
      });

    });
  });

});