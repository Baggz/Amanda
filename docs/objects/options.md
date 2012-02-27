[← Documentation](https://github.com/Baggz/Amanda/tree/master/docs/README.md)

<a name="options"></a>
# Options

### Properties

* [singleError](#singleError)
* [messages](#messages)

<a name="singleError"></a>
## singleError [#](#singleError)

If you set `singleError` to `false`, validation continue after first error occurred. By default `singleError` is set to `true`.

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
* `{{validator}}`

**Example**

```javascript
/**
 * Options
 */
var options = {
  messages: {

    // Custom error message as a string (with placeholders)
    format: 'Uh oh! Param ‘{{property}}’ must be an {{propertyValue}}.' // Uh oh! Param ‘email’ must be an email.

    // Custom error message as a function
    enum: function(property, propertyValue, validator) {
      return 'Value of the ‘' + property + '’ property must be ' + validator.join(' or ') + '.'; // Value of the ‘sex’ property must be male or female.
    }

  }
};

// Validate the data agains the schema and use custom error messages
amanda.validate(data, schema, options, function(error) {
  // Do something...
});
```