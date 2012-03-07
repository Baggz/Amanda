<a name="amanda"></a>
# Amanda

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
## Example [&uarr;](#contents)

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
      length: 7
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

#### Status

| **Branch** | **Status** |
|:-----------|:----------|
| *master* | [![Build Status](https://secure.travis-ci.org/Baggz/Amanda.png?branch=master)](http://travis-ci.org/Baggz/Amanda) |
| *dev* | [![Build Status](https://secure.travis-ci.org/Baggz/Amanda.png?branch=dev)](http://travis-ci.org/Baggz/Amanda) |

<a name="download"></a>
## Download [&uarr;](#contents)

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
## Usage [&uarr;](#contents)

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
## Documentation [&uarr;](#contents)

All documentation is available in the [/docs/](https://github.com/Baggz/Amanda/tree/master/examples) folder.

<a name="compatibility"></a>
## Compatibility [&uarr;](#contents)

### Node.js

From version **0.6.0**.

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
## Tests [&uarr;](#tests)

```
$ npm test
```

<a name="contributors"></a>
## Contributors [&uarr;](#contents)

The following are the major contributors of Amanda (in alphabetical order).

* František Hába ([@Baggz](https://github.com/Baggz)) &lt;hello@frantisekhaba.com&gt;
* Iain Carsberg ([@iaincarsberg](https://github.com/iaincarsberg))

<a name="license"></a>
## License [&uarr;](#contents)

(The MIT License)

Copyright (c) 2011 František Hába &lt;hello@frantisekhaba.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.