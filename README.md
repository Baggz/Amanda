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

## Download

To install **Amanda**, use [NPM](http://npmjs.org/).

```
$ npm install amanda
```

Releases are available for download from GitHub.

| **Version** | **Description** | **Size** | **Action** |
|:------------|:----------------|:---------|:-----------|
| `amanda.js` | *uncompressed, with comments* | 1 KB | [Download](https://raw.github.com/Baggz/Amanda/master/src/amanda.js) |
| `amanda.min.js` | *compressed, without comments* | 1 KB | [Download](https://raw.github.com/Baggz/Amanda/master/dist/amanda.min.js) |

# Documentation

**Methods**

* [validate](#validate)
* [addValidator](#addValidator)

**Objects**

* [schema](#schema)

<a name="validate"></a>
## Validate

### validate(instance, schema, callback)

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
 * Body
 */
var body = {
  user: {
    name: 'František',
    surname: 'Hába'
  }
};

// Validate
amanda.validate(body, schema, function(error) {
  if (error) {
    // Do something...
  }
});
```

<a name="addValidator"></a>
## AddValidator

### addValidator(name, fn)

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

### Type

**Values**

* string
* object
* array
* function
* url
* email
* alphanumeric
* alpha
* number
...TODO

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

# Running Tests

```
$ npm tests/
```

# License

(The MIT License)

Copyright (c) 2011 František Hába &lt;hello@frantisekhaba.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.