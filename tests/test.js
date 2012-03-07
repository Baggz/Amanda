// Load dependencies
var amanda = require('../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  /**
   * AddValidator
   */
  amanda.addValidator('testValidator', function(property, propertyValue, validator, propertyValidators, callback) {

    console.log('testValidator...');

    if (!propertyValue || propertyValue.indexOf('a') !== -1) {
      return callback('Oops! This username - ' + propertyValue + ' - is taken.');
    } else {
      return callback();
    }

  });

  /**
   * UserSchema
   */
  var userSchema = {
    type: 'object',
    properties: {
      name: {
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 45
      },
      email: {
        required: true,
        type: 'string',
        format: 'email',
        testValidator: true
      },
      password: {
        required: true,
        type: 'string'
      }
    }
  };

  amanda.validate({
    email: '',
    name: 'aa',
    password: ''
  }, userSchema, function() {
    console.log(arguments);
    test.done();
  });


};