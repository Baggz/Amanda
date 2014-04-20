# Validate

```javascript
validate(data, schema[, options], callback)
```

### Parameters

* `data`
* `schema` The *Schema* object, see [Schema](../objects/error.md).
* `options` The *Options* object, see [Options](../objects/options.md).
* `callback` The `callback` gets one argument which is an *Error* object (see [Error](../objects/error.md). for more information).

### Example

```javascript
/**
 * Schema
 */
var schema = {
  type: 'object',
  properties: {
    user: {
      name: {
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 45
      },
      surname: {
        required: true,
        type: 'string',
        minLength: 2,
        maxLength: 45
      }
    }
  }
};

/**
 * Data
 */
var data = {
  user: {
    name: 'František',
    surname: 'Hába'
  }
};


var jsonSchemaValidator = amanda('json');

// Stop the validation process after a first error
jsonSchemaValidator.validate(data, schema, function(error) {
  if (error) {
    // Do something...
  } else {
    // Do something else...
  }
});

// Validate the whole schema
jsonSchemaValidator.validate(data, schema, { singleError: false }, function(error) {
  if (error) {
    // Do something...
  } else {
    // Do something else...
  }
});
```
