[← Documentation](https://github.com/Baggz/Amanda/tree/master/docs/README.md)

<a name="options"></a>
# Options

### Properties

* [singleError](#singleError)
* [messages](#messages)

<a name="singleError"></a>
## singleError [#](#singleError)

If you set the `singleError` flag to `false`, validation continues even after a first error occurred. By default the `singleError` flag is set to `true`.

**Example**

```javascript
amanda.validate(data, schema, { singleError: false }, function(error) {

  // Do something...

});
```

<a name="messages"></a>
## messages [#](#messages)

This property allows you to set custom error messages. If you want to use more ambitious messages, you can pass a function.

**Placeholders**

* `{{property}}`
* `{{propertyValue}}`
* `{{attributeValue}}`

**Example**

```javascript
/**
 * Options
 */
var options = {

  messages: {

    // A custom error message as a string (with placeholders)
    format: 'Uh oh! The property ‘{{property}}’ must be an {{attributeValue}}. Well, ‘{{propertyValue}}’ doesn't look like an email. ' // Uh oh! Param ‘email’ must be an email.

    // A custom error message as a function
    enum: function(property, propertyValue, attributeValue) {
      return 'Value of the ‘' + property + '’ property must be ' + attributeValue.join(' or ') + '.'; // A value of the ‘sex’ property must be male or female.
    }

  }

};
```