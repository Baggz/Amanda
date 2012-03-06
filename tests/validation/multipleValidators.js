// Load dependencies
var amanda = require('../../dist/latest.js');

// Error methods
var errorMethods = [
  'getProperties',
  'getMessages'
];

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var a = 0;

  var schema = {
    type: 'object',
    properties: {
      username: {
        required: true,
        type: 'string',
        format: 'alphanumeric'
      },
      email: {
        required: true,
        type: 'string',
        format: 'email'
      },
    }
  };

  [
    {
      input: {},
      errors: [
        {
          property: 'username',
          propertyValue: undefined,
          validator: 'required',
          validatorValue: true
        },
        {
          property: 'username',
          propertyValue: undefined,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'username',
          propertyValue: undefined,
          validator: 'format',
          validatorValue: 'alphanumeric'
        },
        {
          property: 'email',
          propertyValue: undefined,
          validator: 'required',
          validatorValue: true
        },
        {
          property: 'email',
          propertyValue: undefined,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'email',
          propertyValue: undefined,
          validator: 'format',
          validatorValue: 'email'
        }
      ]
    },
    {
      input: { username: 123, email: 456 },
      errors: [
        {
          property: 'username',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'email',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'email',
          propertyValue: 456,
          validator: 'format',
          validatorValue: 'email'
        }
      ]
    }
  ].forEach(function(obj) {
  
    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

      a += 1;

      obj.errors.forEach(function(errorObj, errorIndex) {
        
        delete error[errorIndex].message;

        test.deepEqual(error[errorIndex], {
          property: errorObj.property,
          propertyValue: errorObj.propertyValue,
          validator: errorObj.validator,
          validatorValue: errorObj.validatorValue
        });

      });

      test.equal(error.length, obj.errors.length);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });

  });

  test.equal(a, 2);
  test.done();

};