<a name="amanda"></a>
# Amanda

[![Build Status](https://secure.travis-ci.org/Baggz/Amanda.png)](http://travis-ci.org/Baggz/Amanda)

<a name="contents"></a>
### Contents

* [Example](#example)
* [Download](#download)
* [Usage](#usage)
* [Documentation](#documentation)
* [Tests](#tests)
* [License](#license)

[Amanda](https://github.com/Baggz/Amanda) validates data against JSON Schema. 

#### Features

* **Extendable**, you can create **your own validators**
* Can be used with **Node.js** and **in the browser**
* Amanda has **no dependencies**
* **AMD compatible**, you can load it via [RequireJS](https://github.com/jrburke/requirejs)
* Lightweight
* Fully **documented**
* Tested

<a name="example"></a>
# Example [&uarr;](#contents)

```javascript
/**
 * Schema
 */
var schema = {
  type: 'object',
  properties: {
    name: {
      required: true,
      type: 'string',
      length: [2, 45]
    },
    email: {
      required: true,
      type: 'string',
      format: 'email'
    },
    username: {
      required: true,
      type: 'string',
      format: 'alphanumeric'
    }
  }
};

/**
 * Data
 */
var data = {
  name: 'Kenneth',
  email: 'kenneth@gmail.com',
  username: 'kenneth'
};

// Validate the data against the schema
amanda.validate(data, schema, function(error) {
  // Do something...
});
```

*You can find more examples in the [/examples/](https://github.com/Baggz/Amanda/tree/master/examples) folder.*

<a name="download"></a>
# Download [&uarr;](#contents)

To install **Amanda**, use [NPM](http://npmjs.org/).

```
$ npm install amanda
```

Releases are available for download from GitHub.

| **Version** | **Description** | **Size** | **Action** |
|:------------|:----------------|:---------|:-----------|
| `amanda.js` | *uncompressed, with comments* | 15.06 KB (3.42 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/src/amanda.js) |
| `amanda.min.js` | *compressed, without comments* | 6.2 KB (2.09 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/dist/amanda.min.js) |

<a name="usage"></a>
# Usage [&uarr;](#contents)

### Browser

```
<script src="amanda.js"></script>
```

### Node.js, RingoJS, Narwhal

```javascript
var amanda = require('amanda');
```

### RequireJS

```javascript
// Configuration options, the path should not include the .js extension
require.config({
  paths: {
    "robb": "path/to/amanda"
  }
});

// Load Amanda
require(['amanda'], function(amanda) {

  // Do something...

});
```

<a name="documentation"></a>
# Documentation [&uarr;](#contents)

**Methods**

* [validate](#validate)
* [addValidator](#addValidator)

**Objects**

* [Schema](#schema)
  * [required](#required)
  * [minLength](#minLength)
  * [maxLength](#maxLength)
  * [length](#length)
  * [format](#format)
  * [type](#type)
  * [enum](#enum)
  * [except](#except)
  * [minimum](#minimum)
  * [maximum](#maximum)
  * [pattern](#pattern)
  * [maxItems](#maxItems)
  * [minItems](#minItems)
  * [exclusiveMinimum](#exclusiveMinimum)
  * [exclusiveMaximum](#exclusiveMaximum)
  * [divisibleBy](#divisibleBy)
  * [uniqueItems](#uniqueItems)
* [Error](#error)
  * [getProperties](#getProperties)
  * [getMessages](#getMessages)
* [Options](#options)
  * [singleError](#singleError)
  * [messages](#messages)

<a name="validate"></a>
## Validate

### validate(data, schema[, options], callback)

**Parameters**

* `data`
* `schema` The Schema object, see [Schema](#schema) below.
* `options` The Options object, see [Options](#options) below.
* `callback` The `callback` gets one argument which is an Error object (see [Error](#error) below for more information).

**Example**

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
        length: [2, 45]
      },
      surname: {
        required: true,
        type: 'string',
        length: [2, 45]
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

// Stop validation after first error
amanda.validate(data, schema, function(error) {
  if (error) {
    // Do something...
  } else {
    // Do something else...
  }
});

// Validate whole schema
amanda.validate(data, schema, { singleError: false }, function(error) {
  if (error) {
    // Do something...
  } else {
    // Do something else...
  }
});
```

<a name="addValidator"></a>
## AddValidator

### addValidator(name, fn)

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

<a name="schema"></a>
## Schema [&uarr;](#documentation)

**Validators**

* [required](#required)
* [minLength](#minLength)
* [maxLength](#maxLength)
* [length](#length)
* [format](#format)
* [type](#type)
* [enum](#enum)
* [except](#except)
* [minimum](#minimum)
* [maximum](#maximum)
* [pattern](#pattern)
* [maxItems](#maxItems)
* [minItems](#minItems)
* [exclusiveMinimum](#exclusiveMinimum)
* [exclusiveMaximum](#exclusiveMaximum)
* [divisibleBy](#divisibleBy)
* [uniqueItems](#uniqueItems)

---

<a name="required"></a>
### Required [&uarr;](#schema)

This attribute indicates if the instance must have a value, and not be undefined. This is `false` by default, making the instance optional.

**Examples**

```javascript
var schema = {
  type: 'object',
  properties: {
    username: {
      required: true
    }
  }
};
```

---

<a name="minLength"></a>
### MinLength [&uarr;](#schema)

When the instance value is a string, this defines the minimum length of the string.

**Example**

```javascript
{
  type: 'string',
  minLength: 10
}
```

---

<a name="maxLength"></a>
### MaxLength [&uarr;](#schema)

When the instance value is a string, this defines the maximum length of the string.

**Example**

```javascript
{
  type: 'string',
  maxLength: 45
}
```

---

<a name="length"></a>
### Length [&uarr;](#schema)

When the instance value is a string, this defines the length of the string.

**Example**

```javascript
{
  type: 'string',
  length: 5
}
```

---

<a name="type"></a>
### Type [&uarr;](#schema)

This attribute defines what the primitive type or the schema of the instance must be in order to validate. A string indicating a primitive or simple type. The following are acceptable string values:

* `string` Value must be a string.
* `number` Value must be a number, floating point numbers are allowed.
* `integer` Value MUST be an integer, no floating point numbers are allowed. This is a subset of the number type.
* `boolean` Value must be a boolean.
* `object` Value must be an object.
* `array` Value must be an array.
* `function` Value must be a function.


**Examples**

```javascript
var schema = {
  type: 'object',
  properties: {
    username: {
      // ...
    }
  }
};
```

```javascript
var schema = {
  type: 'array',
  items: {
    // ...
  }
};
```

```javascript
var schema = {
  type: 'string'
};
```

---

<a name="format"></a>
### Format [&uarr;](#schema)

This property defines the type of data, content type, or microformat to be expected in the instance property values. The following formats are predefined:

* `alpha`
* `alphanumeric`
* `ipv4`
* `ipv6`
* `ip`
* `email`
* `url`
* `date`
* `decimal`
* `int`
* `percentage`
* `port`
* `regexp`
* `unsignedInt`

**Examples**

```javascript
var schema = {
  type: 'string',
  format: 'email'
};
```

---

<a name="enum"></a>
### Enum [&uarr;](#schema)

This provides an enumeration of all possible values that are valid for the instance property. This must be an array, and each item in the array represents a possible value for the instance value.

**Examples**

```javascript
var schema = {
  type: 'object',
  properties: {
    sex: {
      type: 'string',
      enum: ['female', 'male']
    }
  }
};
```

---

<a name="except"></a>
### Except [&uarr;](#schema)

**Examples**

```javascript
var schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      except: ['admin', 'administrator']
    }
  }
};
```

---

<a name="minimum"></a>
### Minimum [&uarr;](#schema)

This attribute defines the minimum value of the instance property when the type of the instance value is a number.

**Examples**

```javascript
var schema = {
  type: 'number',
  minimum: 100
};
```

---

<a name="maximum"></a>
### Maximum [&uarr;](#schema)

This attribute defines the maximum value of the instance property when the type of the instance value is a number.

**Examples**

```javascript
var schema = {
  type: 'number',
  maximum: 100
};
```

---

<a name="pattern"></a>
### Pattern [&uarr;](#schema)

When the instance value is a string, this provides a regular expression that a string instance must match in order to be valid.

**Examples**

```javascript
var schema = {
  type: 'string',
  pattern: /^[a]{2,4}$/
};
```

---

<a name="maxItems"></a>
### MaxItems [&uarr;](#schema)

This attribute defines the maximum number of values in an array when the array is the instance value.

**Examples**

```javascript
var schema = {
  type: 'array',
  maxItems: 10
};
```

---

<a name="minItems"></a>
### MinItems [&uarr;](#schema)

This attribute defines the minimum number of values in an array when the array is the instance value.

**Examples**

```javascript
var schema = {
  type: 'array',
  minItems: 10
};
```

---

<a name="exclusiveMaximum"></a>
### ExclusiveMaximum [&uarr;](#schema)

This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the [maximum](#maximum) attribute.  This is false by default, meaning the instance value can be less then or equal to the maximum value.

**Examples**

```javascript
var schema = {
  type: 'number',
  maximum: 100,
  exclusiveMaximum: true
};
```

---

<a name="exclusiveMinimum"></a>
### ExclusiveMinimum [&uarr;](#schema)

This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the [minimum](#minimum) attribute. This is false by default, meaning the instance value can be greater then or equal to the minimum value.

**Examples**

```javascript
var schema = {
  type: 'number',
  minimum: 100,
  exclusiveMinimum: true
};
```

---

<a name="uniqueItems"></a>
### UniqueItems [&uarr;](#schema)

This attribute indicates that all items in an array instance must be unique (contains no two identical values).

**Examples**

```javascript
var schema = {
  type: 'array',
  uniqueItems: true
};
```

---

<a name="divisibleBy"></a>
### DivisibleBy [&uarr;](#schema)

This attribute defines what value the number instance must be divisible by with no remainder (the result of the division must be an integer).

**Examples**

```javascript
var schema = {
  type: 'number',
  divisibleBy: 2
};
```

---

<a name="error"></a>
## Error [&uarr;](#documentation)

**Methods**

* [getProperties](#getProperties)
* [getMessages](#getMessages)

**Example**

```javascript
[
  {
    property: 'users[0].username'
    propertyValue: 123
    validator: 'type'
    validatorValue: 'string',
    message: 'Only string is allowed'
  },
  {
    // ...
  }
]
```

<a name="getProperties"></a>
### getProperties [&uarr;](#error)

**Example**

```javascript
error.getProperties(); // => ['users[0].username']
```

<a name="getMessages"></a>
### getMessages [&uarr;](#error)

**Example**

```javascript
error.getMessages(); // => ['Only string is allowed']
```

<a name="options"></a>
## Options [&uarr;](#documentation)

**Properties**

* [singleError](#singleError)
* [messages](#messages)

<a name="singleError"></a>
### singleError [&uarr;](#options)

If you set `singleError` to `false`, validation continue after first error occurred. By default `singleError` is set to `true`.

**Example**

```javascript
amanda.validate(data, schema, { singleError: false }, function(error) {

  // Do something...

});
```

<a name="messages"></a>
### messages [&uarr;](#options)

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
    format: 'Uh oh! Param ‘{{property}}’ must be am {{propertyValue}}.' // Uh oh! Param ‘email’ must be an email.

    // Custom error message as a function
    enum: function(property, propertyValue, validator) {
      return 'The ‘' + property + '’ property must be ' + validator.join(' or ') + '.'; // The ‘sex’ property must be male or female.
    }

  }
};

// Validate the data agains the schema and use custom error messages
amanda.validate(data, schema, options, function(error) {
  // Do something...
});
```

<a name="compatibility"></a>
# Compatibility [&uarr;](#contents)

### Node.js

From version **0.4.11**.

### Browsers

**Desktop**

| **Browser** | **Supported** | **Version** |
|:------------|:-----------:|:------------|
| Google Chrome | ✔ | 12+ |
| Safari | n/a | *Not tested* |
| Firefox | n/a | *Not tested* |
| Opera | n/a | *Not tested* |
| Internet Explorer | ✕ | *Not tested* |

*Testing in progress...*

<a name="tests"></a>
# Tests [&uarr;](#tests)

```
$ npm test
```

<a name="contributors"></a>
# Contributors [&uarr;](#contents)

The following are the major contributors of Amanda (in alphabetical order).

* František Hába ([@Baggz](https://github.com/Baggz)) &lt;hello@frantisekhaba.com&gt;
* Iain Carsberg ([@iaincarsberg](https://github.com/iaincarsberg))

<a name="license"></a>
# License [&uarr;](#contents)

(The MIT License)

Copyright (c) 2011 František Hába &lt;hello@frantisekhaba.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.