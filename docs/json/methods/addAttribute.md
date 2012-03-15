[← Documentation](https://github.com/Baggz/Amanda/tree/master/docs/README.md)

<a name="addAttribute"></a>
# addAttribute

```javascript
addAttribute(attributeName, attributeFn)
```

This method allows you to add a custom attribute.

**Example**

```javascript
/**
 * EvenAttribute
 *
 * @param {string} property
 * @param {any} propertyValue
 * @param {any} attributeValue
 * @param {object} propertyAttributes
 * @param {function} callback
 */
var evenAttribute = function(property, propertyValue, attributeValue, propertyAttributes, callback) {

  // If ‘even: true’
  if (attributeValue) {
    if (typeof propertyValue === 'number' && (propertyValue % 2) !== 0) {
      this.addError();
    }
  }

  // Continue...
  return callback();

};

// Add a new validator
var jsonSchemaValidator = amanda('json');
jsonSchemaValidator.addAttribute('even', evenAttribute);

/**
 * Schema
 */
var schema = {
  type: 'object',
  properties: {
    items: {
      type: 'number',
      even: true // <= That's your attribute
    }
  }
};
```

## Attribute API

* `this.addError`
* `this.attributes`
* `this.instance`
* `this.schema`
* `this.joinPath`
* ...

> In progress...