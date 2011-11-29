# Amanda

[Amanda](https://github.com/Baggz/Amanda) validates data against JSON Schema. 

#### Features

* **Extendable**, you can create **your own validators**
* Fully **asynchronous**
* Can be used with **Node.js** and **in the browser**
* Amanda has **no dependencies**
* **AMD compatible**, you can load it via [RequireJS](https://github.com/jrburke/requirejs)
* Lightweight
* Fully **documented**
* Tested

**Version**

```
0.2.2
```

<a name="example"></a>
## Example

```javascript
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

var data = {
  name: 'Kenneth',
  email: 'kenneth@gmail.com',
  username: 'kenneth'
};

amanda.validate(data, schema, function(error) {
  // Do something...
});
```

*You can find more examples in the [/examples/](https://github.com/Baggz/Amanda/tree/master/examples) folder.*

<a name="download"></a>
## Download

To install **Amanda**, use [NPM](http://npmjs.org/).

```
$ npm install amanda
```

Releases are available for download from GitHub.

| **Version** | **Description** | **Size** | **Action** |
|:------------|:----------------|:---------|:-----------|
| `amanda.js` | *uncompressed, with comments* | 13.96 KB (3.22 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/src/amanda.js) |
| `amanda.min.js` | *compressed, without comments* | 5.82 KB (1.96 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/dist/amanda.min.js) |

<a name="documentation"></a>
# Documentation

**Methods**

* [validate](#validate)
* [addValidator](#addValidator)
* [getVersion](#getVersion)
* [getValidators](#getValidators)

**Objects**

* [Schema](#schema)
* [Error](#error)

<a name="validate"></a>
## Validate

### validate(data, schema[, options], callback)

**Parameters**

* `data`
* `schema` The Schema object, see [Schema](#schema) below.
* `options` If you set `options.singleError` to `false`, validation continue after first error occurred. By default `options.singleError` is set to `true`.
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

var evenValidator = function(property, propertyValue, validator, propertyValidators, callback) {
  
  // If ‘even: true’
  if (validator) {
    
    if (typeof propertyValue === 'number' && (propertyValue % 2) === 0) {
      // No problem, the number is event
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

<a name="getVersion"></a>
## GetVersion

### getVersion()

**Example**

```javascript
amanda.getVersion(); // => '0.2.0'
```

<a name="getValidators"></a>
## GetValidators

### getValidators()

**Example**

```javascript
amanda.getValidators(); // => { type: function() {}, ... }
```

<a name="schema"></a>
## Schema

**Validators**

* [required](#required)
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
### Required

> This attribute indicates if the instance must have a value, and not be undefined. This is `false` by default, making the instance optional.

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

<a name="length"></a>
### Length

> When the instance value is a string, this defines the length of the string.

**Examples**

```javascript
var schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      length: [2, 45]
    }
  }
};
```

```javascript
var schema = {
  type: 'string',
  length: 25
};
```

---

<a name="type"></a>
### Type

> This attribute defines what the primitive type or the schema of the instance must be in order to validate. A string indicating a primitive or simple type. The following are acceptable string values:

* `object` Value must be an object.
* `array` Value must be an array.
* `string` Value must be a string.
* `number` Value must be a number, floating point numbers are allowed.
* `function` Value must be a function.
* `boolean` Value must be a boolean.

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
### Format

> This property defines the type of data, content type, or microformat to be expected in the instance property values. The following formats are predefined:

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
### Enum

> This provides an enumeration of all possible values that are valid for the instance property. This must be an array, and each item in the array represents a possible value for the instance value.

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
### Except

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
### Minimum

> This attribute defines the minimum value of the instance property when the type of the instance value is a number.

**Examples**

```javascript
var schema = {
  type: 'number',
  minimum: 100
};
```

---

<a name="maximum"></a>
### Maximum

> This attribute defines the maximum value of the instance property when the type of the instance value is a number.

**Examples**

```javascript
var schema = {
  type: 'number',
  maximum: 100
};
```

---

<a name="pattern"></a>
### Pattern

> When the instance value is a string, this provides a regular expression that a string instance must match in order to be valid.

**Examples**

```javascript
var schema = {
  type: 'string',
  pattern: /^[a]{2,4}$/
};
```

---

<a name="maxItems"></a>
### MaxItems

> This attribute defines the maximum number of values in an array when the array is the instance value.

**Examples**

```javascript
var schema = {
  type: 'array',
  maxItems: 10
};
```

---

<a name="minItems"></a>
### MinItems

> This attribute defines the minimum number of values in an array when the array is the instance value.

**Examples**

```javascript
var schema = {
  type: 'array',
  minItems: 10
};
```

---

<a name="exclusiveMaximum"></a>
### ExclusiveMaximum

> This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the [maximum](#maximum) attribute.  This is false by default, meaning the instance value can be less then or equal to the maximum value.

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
### ExclusiveMinimum

> This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the [minimum](#minimum) attribute. This is false by default, meaning the instance value can be greater then or equal to the minimum value.

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
### UniqueItems

> This attribute indicates that all items in an array instance must be unique (contains no two identical values).

**Examples**

```javascript
var schema = {
  type: 'array',
  uniqueItems: true
};
```

---

<a name="divisibleBy"></a>
## DivisibleBy

> This attribute defines what value the number instance must be divisible by with no remainder (the result of the division must be an integer).

**Examples**

```javascript
var schema = {
  type: 'number',
  divisibleBy: 2
};
```

---

<a name="error"></a>
## Error

**Examples**

```javascript
var schema = {
  type: 'number',
  maximum: 100,
  exclusiveMaximum: true
};
```

**Methods**

* [getProperties](#getProperties)
* [getMessages](#getMessages)

**Example**

```javascript
{
  '0': {
    property: 'users[0].username'
    propertyValue: 123
    validator: 'type'
    validatorValue: 'string',
    message: 'Only string is allowed'
  }
}
```

<a name="getProperties"></a>
### getProperties

**Example**

```javascript
error.getProperties(); // => ['users[0].username']
```

<a name="getMessages"></a>
### getMessages

**Example**

```javascript
error.getMessages(); // => ['Only string is allowed']
```

<a name="compatibility"></a>
# Compatibility

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
# Running Tests

```
$ npm test
```

<a name="contributors"></a>
# Contributors

The following are the major contributors of Amanda (in alphabetical order).

* František Hába ([@Baggz](https://github.com/Baggz)) <hello@frantisekhaba.com>

<a name="license"></a>
# License

(The MIT License)

Copyright (c) 2011 František Hába &lt;hello@frantisekhaba.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.