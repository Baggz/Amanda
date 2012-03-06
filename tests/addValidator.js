// Load dependencies
var amanda = require('../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  /**
   * AddValidator
   */
  amanda.addValidator('myValidator', function(property, propertyValue, validator, propertyValidators, callback) {

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

  [
    'Baggz',
    'Amanda',
    'Administrator',
    'Admin'
  ].forEach(function(input) {
    amanda.validate(input, schema, { singleError: true }, function(error) {
      test.ok(error);
    });
  });

  [
    'Baggz',
    'Amanda',
    'Administrator',
    'Admin'
  ].forEach(function(input) {
    amanda.validate(input, schema, { singleError: false }, function(error) {
      console.log(arguments);
      test.ok(error);
    });
  });

  [
    'Baggz',
    'Amanda',
    'Administrator',
    'Admin'
  ].forEach(function(input) {

    amanda.validate(
      {
        name: input,
        username: 'Test'
      }, 
      {
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
      },
      {
        singleError: false
      },
      function(error) {
        console.log(arguments);
        test.ok(error);
      }
    );

  });

  /*
  amanda.validate('Ryan', schema, function(error) {
    test.equal(error, undefined);
  });

  amanda.validate('Robb', schema, function(error) {
    test.equal(error, undefined);
  });
  */

  test.done();

};