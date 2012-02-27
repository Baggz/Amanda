[← Documentation](https://github.com/Baggz/Amanda/tree/master/docs/README.md)

<a name="addValidator"></a>
# AddValidator

```javascript
addValidator(name, fn)
```

This method allows you to add a custom validator.

**Example**

```javascript
/**
 * EventValidator
 *
 * @param {string} property
 * @param {object|number|boolean|string} propertyValue
 * @param {object} validator
 * @param {object} propertyValidators
 * @param {function} callback
 */
var evenValidator = function(property, propertyValue, validator, propertyValidators, callback) {
  
  // If ‘even: true’
  if (validator) {
    
    if (typeof propertyValue === 'number' && (propertyValue % 2) === 0) {
      // The number is even
      callback();
    } else {
      // The number is not even
      callback('Not even.');
    }

  // Skip
  } else {
    return callback();
  }

};

// Add a new validator
amanda.addValidator('even', evenValidator);

/**
 * Schema
 */
var schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      length: [2, 45],
      even: true // <= That's your validator
    }
  }
}
```