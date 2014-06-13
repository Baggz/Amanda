<a name="amanda"></a>
# Amanda

[Amanda](https://github.com/Baggz/Amanda) is aiming to be **a universal schema validation library**. Currently it supports only the [JSON Schema Internet Draft](http://tools.ietf.org/html/draft-zyp-json-schema-03), but I'm planning to add [Orderly](http://orderly-json.org/), [Relax NG](http://relaxng.org/) and others very soon.

<a name="example"></a>
### Example

```javascript
/**
 * Schema
 */
var schema = {
  type: 'object',
  properties: {
    name: {
      required: true,
      type: 'string'
    }
  }
};

/**
 * Data
 */
var data = {
  name: 'Kenneth'
};

// Initialize a JSON Schema validator.
var jsonSchemaValidator = amanda('json');

// Validate the data against the schema.
jsonSchemaValidator.validate(data, schema, function(error) {

  // Do something...

});
```

# Contents

<ul>
  <li><a href="#features">Features</a></li>
  <li><a href="#download">Download</a></li>
  <li><a href="#status">Status</a></li>
  <li><a href="#documentation">Documentation</a></li>
  <li><a href="#compatibility">compatibility</a></li>
  <li><a href="#building">Building</a></li>
  <li><a href="#tests">Tests</a></li>
  <li><a href="#versioning">Versioning</a></li>
  <li><a href="#release-notes">Release Notes</a></li>
  <li><a href="#authors">authors</a></li>
  <li><a href="#license">License</a></li>
</ul>

<a name="features"></a>
## Features

* **Extendable**, you can create **your own attributes**
* Can be used with **Node.js** and **in a browser**
* Amanda has **no dependencies**
* **AMD compatible**, you can load it via [RequireJS](http://requirejs.org/)
* Lightweight
* Fully **documented**
* Tested

## Download

<ul>
  <li><a href="#node.js">Node.js</a></li>
  <li><a href="#browser">Browser</a></li>
</ul>

### Node.js

To install **Amanda**, use [NPM](http://npmjs.org/).

```
$ npm install amanda
```

Then you can load the library via `require`.

```javascript
var amanda = require('amanda');
```

If you prefer [RequireJS](http://requirejs.org/), go ahead.

```javascript
// Configuration options, the path should not include the .js extension.
require.config({
  paths: {
    'amanda': 'path/to/amanda'
  }
});

// Load Amanda
require(['amanda'], function(amanda) {

  // Do something...

});
```

### Browser

Releases for the browser are available for download from GitHub.

| **Version** | **Description** | **Size** | **Action** |
|:------------|:----------------|:---------|:-----------|
| `amanda.js` | *uncompressed, with comments* | 42.12 KB (7.98 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/releases/latest/amanda.js) |
| `amanda.min.js` | *compressed, without comments* | 13.8 KB (4.09 KB gzipped) | [Download](https://raw.github.com/Baggz/Amanda/master/releases/latest/amanda.min.js) |

Or you can use [JAM](http://jamjs.org/).

```
$ jam install amanda
```

Then you can load the library via the `<script>` tag.

```html
<script src="/path/to/amanda.js"></script>
```

...or via [RequireJS](http://requirejs.org/).

```javascript
// Configuration options, the path should not include the .js extension.
require.config({
  paths: {
    'amanda': 'path/to/amanda'
  }
});

// Load Amanda
require(['amanda'], function(amanda) {

  // Do something...

});
```

## Status

| **Branch** | **Status** |
|:-----------|:----------|
| master | [![Build Status](https://secure.travis-ci.org/apiaryio/Amanda.png?branch=master)](http://travis-ci.org/apiaryio/Amanda) |

## Documentation

All documentation is available in the [/docs/](https://github.com/Baggz/Amanda/tree/master/docs) folder.

## Compatibility

### Node.js

From version **0.6.0**.

### Browsers

*Testing in progress...*

## Building

I have included a `Makefile` with convenience methods for working with the library.

<ul>
  <li><code>make</code> Builds the library</li>
</ul>

## Tests

```
$ npm test
```

## Versioning

Releases will be numbered with the following format.

```
<major>.<minor>.<patch>
```

And constructed with the following guidelines.

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on *semantic versioning*, please visit http://semver.org/.

## Release Notes

* [v0.4.0](https://github.com/Baggz/Amanda/pull/35)
* [v0.3.0](https://github.com/Baggz/Amanda/pull/26)
* [v0.2.2](https://github.com/Baggz/Amanda/pull/15)
* [v0.2.1](https://github.com/Baggz/Amanda/pull/3)
* [v0.2.0](https://github.com/Baggz/Amanda/pull/2)
* [v0.0.2](https://github.com/Baggz/Amanda/pull/1)

## Authors

František Hába ([@Baggz](https://github.com/Baggz)) created [Amanda](https://github.com/Baggz/Amanda) and [these people](https://github.com/Baggz/Amanda/graphs/contributors) have contributed.

## License

Please see the [LICENSE](https://github.com/Baggz/Amanda/blob/master/LICENSE) file.
