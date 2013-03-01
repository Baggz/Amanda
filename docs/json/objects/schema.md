# Schema

### Attributes

* [additionalProperties](#additionalProperties)
* [dependencies](#dependencies)
* [description](#description)
* [divisibleBy](#divisibleBy)
* [enum](#enum)
* [except](#except)
* [exclusiveMinimum](#exclusiveMinimum)
* [exclusiveMaximum](#exclusiveMaximum)
* [format](#format)
* [length](#length)
* [maximum](#maximum)
* [maxItems](#maxItems)
* [maxLength](#maxLength)
* [minimum](#minimum)
* [minItems](#minItems)
* [minLength](#minLength)
* [pattern](#pattern)
* [patternProperties](#patternProperties)
* [required](#required)
* [title](#title)
* [type](#type)
* [uniqueItems](#uniqueItems)

## AdditionalProperties

**Description**

This attribute defines a schema for all properties that are not explicitly defined in an object type definition. If specified, the value must be a schema or a boolean. If false is provided, no additional properties are allowed beyond the properties defined in the schema. The default value is an empty schema which allows any value for additional properties.

**Example**

```javascript
/**
 * Schema
 */
var schema = {
  type: 'object',
  additionalProperties: 'false',
  properties: {
    name: {
      type: 'string'
    },
    surname: {
      type: 'string'
    }
  }
};
```

## Dependencies

**Description**

This attribute is an object that defines the requirements of a property on an instance object.  If an object instance has a property with the same name as a property in this attribute's object, then the instance must be valid against the attribute's property value (hereafter referred to as the "dependency value").

The dependency value can take one of two forms:

* **Simple Dependency**

    If the dependency value is a string, then the instance object MUST have a property with the same name as the dependency value.  If the dependency value is an array of strings, then the instance object MUST have a property with the same name as each string in the dependency value's array.

* **Schema Dependency**

    If the dependency value is a schema, then the instance object MUST be valid against the schema.

## Description

**Description**

This attribute is a string that provides a full description of the of purpose the instance property.

## DivisibleBy

**Description**

This attribute defines what value the number instance must be divisible by with no remainder (the result of the division must be an integer).

**Examples**

```javascript
var schema = {
  type: 'number',
  divisibleBy: 2
};
```

## Enum

**Description**

This provides an enumeration of all possible values that are valid for the instance property. This must be an array, and each item in the array represents a possible value for the instance value.

**Example**

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

## Except

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

## ExclusiveMinimum

**Description**

This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the [minimum](#minimum) attribute. This is false by default, meaning the instance value can be greater then or equal to the minimum value.

**Example**

```javascript
var schema = {
  type: 'number',
  minimum: 100,
  exclusiveMinimum: true
};
```

## ExclusiveMaximum

**Description**

This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the [maximum](#maximum) attribute.  This is false by default, meaning the instance value can be less then or equal to the maximum value.

**Example**

```javascript
var schema = {
  type: 'number',
  maximum: 100,
  exclusiveMaximum: true
};
```

## Format

**Description**


**Example**

```javascript
var schema = {
  type: 'string',
  format: 'email'
};
```

## Length

**Description**

When the instance value is a string, this defines the length of the string.

**Example**

```javascript
{
  type: 'string',
  length: 5
}
```

## Maximum

**Description**

This attribute defines the maximum value of the instance property when the type of the instance value is a number.

**Example**

```javascript
var schema = {
  type: 'number',
  maximum: 100
};
```

## MaxItems

**Description**

This attribute defines the maximum number of values in an array when the array is the instance value.

**Example**

```javascript
var schema = {
  type: 'array',
  maxItems: 10
};
```

## MaxLength

**Description**

When the instance value is a string, this defines the maximum length of the string.

**Example**

```javascript
{
  type: 'string',
  maxLength: 45
}
```

## Minimum

**Description**

This attribute defines the minimum value of the instance property when the type of the instance value is a number.

**Examples**

```javascript
var schema = {
  type: 'number',
  minimum: 100
};
```

## MinItems

**Description**

This attribute defines the minimum number of values in an array when the array is the instance value.

**Examples**

```javascript
var schema = {
  type: 'array',
  minItems: 10
};
```

## MinLength

**Description**

When the instance value is a string, this defines the minimum length of the string.

**Example**

```javascript
{
  type: 'string',
  minLength: 10
}
```

## Pattern

**Description**

When the instance value is a string, this provides a regular expression that a string instance must match in order to be valid.

**Examples**

```javascript
var schema = {
  type: 'string',
  pattern: /^[a]{2,4}$/
};
```

## PatternProperties

## Required

**Description**

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

## Title

## Type

**Description**

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

## UniqueItems

**Description**

This attribute indicates that all items in an array instance must be unique (contains no two identical values).

**Example**

```javascript
var schema = {
  type: 'array',
  uniqueItems: true
};
```
