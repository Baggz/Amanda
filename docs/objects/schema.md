[← Documentation](https://github.com/Baggz/Amanda/tree/master/docs/README.md)

<a name="schema"></a>
# Schema

### Validators

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

<a name="required"></a>
## Required [#](#required)

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

<a name="minLength"></a>
## MinLength [#](#minLength)

When the instance value is a string, this defines the minimum length of the string.

**Example**

```javascript
{
  type: 'string',
  minLength: 10
}
```

<a name="maxLength"></a>
## MaxLength [#](#maxLength)

When the instance value is a string, this defines the maximum length of the string.

**Example**

```javascript
{
  type: 'string',
  maxLength: 45
}
```

<a name="length"></a>
## Length [#](#length)

When the instance value is a string, this defines the length of the string.

**Example**

```javascript
{
  type: 'string',
  length: 5
}
```

<a name="type"></a>
### Type [#](#schema)

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

<a name="format"></a>
### Format [#](#format)

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

<a name="enum"></a>
### Enum [#](#enum)

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

<a name="except"></a>
### Except [#](#except)

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

<a name="minimum"></a>
### Minimum [#](#minimum)

This attribute defines the minimum value of the instance property when the type of the instance value is a number.

**Examples**

```javascript
var schema = {
  type: 'number',
  minimum: 100
};
```

<a name="maximum"></a>
### Maximum [#](#maximum)

This attribute defines the maximum value of the instance property when the type of the instance value is a number.

**Examples**

```javascript
var schema = {
  type: 'number',
  maximum: 100
};
```

<a name="pattern"></a>
### Pattern [#](#pattern)

When the instance value is a string, this provides a regular expression that a string instance must match in order to be valid.

**Examples**

```javascript
var schema = {
  type: 'string',
  pattern: /^[a]{2,4}$/
};
```

<a name="maxItems"></a>
### MaxItems [#](#maxItems)

This attribute defines the maximum number of values in an array when the array is the instance value.

**Examples**

```javascript
var schema = {
  type: 'array',
  maxItems: 10
};
```

<a name="minItems"></a>
### MinItems [#](#minItems)

This attribute defines the minimum number of values in an array when the array is the instance value.

**Examples**

```javascript
var schema = {
  type: 'array',
  minItems: 10
};
```

<a name="exclusiveMaximum"></a>
### ExclusiveMaximum [#](#exclusiveMaximum)

This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the [maximum](#maximum) attribute.  This is false by default, meaning the instance value can be less then or equal to the maximum value.

**Examples**

```javascript
var schema = {
  type: 'number',
  maximum: 100,
  exclusiveMaximum: true
};
```

<a name="exclusiveMinimum"></a>
### ExclusiveMinimum [#](#exclusiveMinimum)

This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the [minimum](#minimum) attribute. This is false by default, meaning the instance value can be greater then or equal to the minimum value.

**Examples**

```javascript
var schema = {
  type: 'number',
  minimum: 100,
  exclusiveMinimum: true
};
```

<a name="uniqueItems"></a>
### UniqueItems [#](#uniqueItems)

This attribute indicates that all items in an array instance must be unique (contains no two identical values).

**Examples**

```javascript
var schema = {
  type: 'array',
  uniqueItems: true
};
```

<a name="divisibleBy"></a>
### DivisibleBy [#](#divisibleBy)

This attribute defines what value the number instance must be divisible by with no remainder (the result of the division must be an integer).

**Examples**

```javascript
var schema = {
  type: 'number',
  divisibleBy: 2
};
```
