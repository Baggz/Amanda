<a name="amanda"></a>
# Amanda

[Amanda](https://github.com/Baggz/Amanda) is aiming to be **an universal validation library**. Currently it supports only the [JSON Schema Internet Draft](http://tools.ietf.org/html/draft-zyp-json-schema-03), but I'm planning to add [Orderly](http://orderly-json.org/), [Relax NG](http://relaxng.org/) and others very soon.

<a name="example"></a>
#### Example

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
    }
  }
};

/**
 * Data
 */
var data = {
  name: 'Kenneth'
};

// Initialize a JSON Schema validator
var jsonSchemaValidator = amanda('json');

// Validate the data against the schema
jsonSchemaValidator.validate(data, schema, function(error) {
  // Do something...
});
```

<a name="features"></a>
#### Features

* **Extendable**, you can create **your own attributes**
* Can be used with **Node.js** and **in a browser**
* Amanda has **no dependencies**
* **AMD compatible**, you can load it via [RequireJS](https://github.com/jrburke/requirejs)
* Lightweight
* Fully **documented**
* Tested

<a name="status"></a>
#### Status

| **Branch** | **Status** |
|:-----------|:----------|
| master | [![Build Status](https://secure.travis-ci.org/Baggz/Amanda.png?branch=master)](http://travis-ci.org/Baggz/Amanda) |
| dev | [![Build Status](https://secure.travis-ci.org/Baggz/Amanda.png?branch=dev)](http://travis-ci.org/Baggz/Amanda) |

<a name="contents"></a>
### Contents

<ul>
  <li><a href="#Download">Download</a></li>
  <li><a href="#Usage">Usage</a></li>
  <li><a href="#Documentation">Documentation</a></li>
  <li><a href="#Compatibility">Compatibility</a></li>
  <li><a href="#Building">Building</a></li>
  <li><a href="#Tests">Tests</a></li>
  <li><a href="#Versioning">Versioning</a></li>
  <li><a href="#Tests">Tests</a></li>
  <li><a href="#Release Notes">Release Notes</a></li>
  <li><a href="#Contributors">Contributors</a></li>
  <li><a href="#License">License</a></li>
</ul>

<a name="Download"></a>
## Download [&uarr;](#Contents)

To install **Amanda**, use [NPM](http://npmjs.org/).

```
$ npm install amanda
```

Releases for a browser are available for download from GitHub.

| **Version** | **Description** | **Size** | **Action** |
|:------------|:----------------|:---------|:-----------|
| `amanda.js` | *uncompressed, with comments* | 36.01 KB (7.11 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/releases/latest/amanda.js) |
| `amanda.min.js` | *compressed, without comments* | 13.62 KB (3.99 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/releases/latest/amanda.min.js) |

<a name="Uage"></a>
## Usage [&uarr;](#Contents)

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

<a name="Documentation"></a>
## Documentation [&uarr;](#Contents)

All documentation is available in the [/docs/](https://github.com/Baggz/Amanda/tree/master/examples) folder.

<a name="Compatibility"></a>
## Compatibility [&uarr;](#Contents)

### Node.js

From version **0.6.0**.

***Note:** Earlier versions might work OK, but are not tested.*

### Browsers

*Testing in progress...*

<a name="Building"></a>
## Building [&uarr;](#Contents)

I have included a `Makefile` with convenience methods for working with the library.

<ul>
  <li><code>make</code> Builds the library</li>
</ul>

<a name="Tests"></a>
## Tests [&uarr;](#Contents)

```
$ npm test
```

<a name="Versioning"></a>
## Versioning [&uarr;](#Contents)

Releases will be numbered with the following format.

```
<major>.<minor>.<patch>
```

And constructed with the following guidelines.

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on *semantic versioning*, please visit http://semver.org/.

<a name="ReleaseNotes"></a>
## Release Notes [&uarr;](#Contents)

* [v0.4.0](https://github.com/Baggz/Amanda/pull/35)
* [v0.3.0](https://github.com/Baggz/Amanda/pull/26)
* [v0.2.2](https://github.com/Baggz/Amanda/pull/15)
* [v0.2.1](https://github.com/Baggz/Amanda/pull/3)
* [v0.2.0](https://github.com/Baggz/Amanda/pull/2)
* [v0.0.2](https://github.com/Baggz/Amanda/pull/1)

<a name="Contributors"></a>
## Contributors [&uarr;](#Contents)

The following are the major contributors of Amanda (in random order).

* **František Hába** ([@Baggz](https://github.com/Baggz))
* **Jakub Nešetřil** ([@zzen](https://github.com/zzen))
* **Iain Carsberg** ([@iaincarsberg](https://github.com/iaincarsberg))
* **Adrian Rossouw** ([@Vertice](https://github.com/Vertice))
* **Leon de Almeida** ([@leondealmeida](https://github.com/leondealmeida))

<a name="License"></a>
## License [&uarr;](#Contents)

(The MIT License)

Copyright (c) 2011 František Hába &lt;hello@frantisekhaba.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.