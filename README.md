# Amanda

[Amanda](https://github.com/Baggz/Amanda) validates data against JSON Schema. 

#### Features

* You can create **your own validators**
* Fully **asynchronous**
* Can be used with **Node.js** and **in the browser**
* Amanda has **no dependencies**
* **AMD compatible**, you can load it via [RequireJS](https://github.com/jrburke/requirejs)
* Lightweight
* Fully **documented**
* Tested

<a name="download"></a>
## Download

To install **Amanda**, use [NPM](http://npmjs.org/).

```
$ npm install amanda
```

Releases are available for download from GitHub.

| **Version** | **Description** | **Size** | **Action** |
|:------------|:----------------|:---------|:-----------|
| `amanda.js` | *uncompressed, with comments* | 9.34 KB (2.34 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/src/amanda.js) |
| `amanda.min.js` | *compressed, without comments* | 4.48 KB (1.57 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/dist/amanda.min.js) |

<a name="documentation"></a>
# Documentation

**Methods**

* [validate](#validate)
* [addValidator](#addValidator)

**Objects**

* [schema](#schema)
* [error](#error)

<a name="validate"></a>
## Validate

### validate(data, schema, callback)

The `callback` gets one argument which is an `error` object (see [error](#error) below for more information).

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
        type: 'string',
        length: [2, 45],
        required: true
      },
      surname: {
        type: 'string',
        length: [2, 45],
        required: true
      }
    }
  }
};

/**
 * Data
 */
var ata = {
  user: {
    name: 'František',
    surname: 'Hába'
  }
};

// Validate
amanda.validate(data, schema, function(error) {
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
var evenValidator = function(paramName, paramValue, validator, validators, callback) {
  
  // If ‘even: true’
  if ( validator ) {
    
    if (typeof paramValue === 'number' && (paramValue % 2) === 0) {
      // No problem, the number is event
      callback(null);
    } else {
      // Ou, ou, the number is not even
      callback('Sorry, but ‘' + paramName + '’ is not even.');
    }

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

<a name="schema"></a>
## Schema

**Validators**

* [required](#required)
* [length](#length)
* [type](#type)
* [values](#values)
* [except](#except)
* [min](#min)
* [max](#max)
* [patter](#pattern)

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

**Supported Types**

* `string`
* `number`
* function`
* `object`
* `boolean`
* `array`
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

**Example**

```javascript
var schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'email'
    },
    contacts: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};
```

<a name="values"></a>
### Values

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

```javascript
{
  paramName: ...
  paramValue: ...
  validatorName: ...
  validatorValue: ...
  message: ...
}
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

**Mobile**


<a name="tests"></a>
# Running Tests

```
$ npm tests/
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