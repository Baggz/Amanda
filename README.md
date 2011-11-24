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
0.2.0
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

<a name="download"></a>
## Download

To install **Amanda**, use [NPM](http://npmjs.org/).

```
$ npm install amanda
```

Releases are available for download from GitHub.

| **Version** | **Description** | **Size** | **Action** |
|:------------|:----------------|:---------|:-----------|
| `amanda.js` | *uncompressed, with comments* | 13.37 KB (3.19 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/src/amanda.js) |
| `amanda.min.js` | *compressed, without comments* | 5.75 KB (1.96 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/dist/amanda.min.js) |

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
var evenValidator = function(value, options, callback) {
  
  // If ‘even: true’
  if (options) {
    
    if (typeof value === 'number' && (value % 2) === 0) {
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
* [min](#min)
* [max](#max)
* [pattern](#pattern)

<a name="required"></a>
### Required

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

<a name="length"></a>
### Length

**Example**

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

<a name="type"></a>
### Type

* `object`
* `array`
* `string`
* `number`
* `function`
* `boolean`

<a name="format"></a>
### Format

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

<a name="enum"></a>
### Enum

**Example**

```javascript
var schema = {
  type: 'object',
  properties: {
    sex: {
      type: 'string',
      values: ['female', 'male']
    }
  }
};
```

<a name="except"></a>
### Except

**Example**

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

<a name="min"></a>
### Min

**Example**

```javascript
var schema = {
  type: 'number',
  min: 100
};
```

<a name="max"></a>
### Max

**Example**

```javascript
var schema = {
  type: 'number',
  max: 100
};
```

<a name="pattern"></a>
### Pattern

**Example**

```javascript
var schema = {
  type: 'string',
  pattern: /^[a]{2,4}$/
};
```

<a name="error"></a>
## Error

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

* František Hába ([@Baggz](https://github.com/Baggz))

<a name="license"></a>
# License

(The MIT License)

Copyright (c) 2011 František Hába &lt;hello@frantisekhaba.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.