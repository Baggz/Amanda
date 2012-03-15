# Attributes

<a name="type"></a>
## type

This attribute defines what the primitive type or the schema of the instance must be in order to validate. This attribute can take one of two forms:

* [Simple Types](#simpleTypes)
* [Union Types](#unionTypes)

<a name="simpleTypes"></a>
### Simple Types 

| Value | **JSON Schema Draft** | **Amanda** |
|:------|:---------------------:|:-----------|
| `string` | ✔ | ✔ |
| `number` | ✔ | ✔ |
| `integer` | ✔ | ✔ |
| `boolean` | ✔ | ✔ |
| `object` | ✔ | ✔ |
| `array` | ✔ | ✔ |
| `null` | ✔ | ✔ |
| `any` | ✔ | ✔ |

In addition Amanda supports also these types.

| Value | **JSON Schema Draft** | **Amanda** |
|:------|:---------------------:|:-----------|
| `function` | ✖ | ✔ |

<a name="unionTypes"></a>
### Union Types

An array of two or more simple type definitions. Each item in the array MUST be a simple type definition or a schema.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

*Example*

```javascript
{ "type": ["string", "number"] }
```

<a name="properties"></a>
## properties

This attribute is an object with property definitions that define the valid values of instance object property values. When the instance value is an object, the property values of the instance object must conform to the property definitions in this object. In this object, each property definition's value must be a schema, and the property's name must be the name of the instance property that it defines. The instance property value must be valid according to the schema from the property definition. Properties are considered unordered, the order of the instance properties may be in any order.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="patternProperties"></a>
## patternProperties

This attribute is an object that defines the schema for a set of property names of an object instance. The name of each property of this attribute's object is a regular expression pattern in the ECMA 262/Perl 5 format, while the value is a schema. If the pattern matches the name of a property on the instance object, the value of the instance's property must be valid against the pattern name's schema value.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="patternProperties"></a>
## additionalProperties

This attribute defines a schema for all properties that are not explicitly defined in an object type definition. If specified, the value must be a schema or a boolean. If false is provided, no additional properties are allowed beyond the properties defined in the schema. The default value is an empty schema which allows any value for additional properties.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="items"></a>
## items

This attribute defines the allowed items in an instance array, and must be a schema or an array of schemas.  The default value is an empty schema which allows any value for items in the instance array. When this attribute value is a schema and the instance value is an array, then all the items in the array must be valid according to the schema.

When this attribute value is an array of schemas and the instance value is an array, each position in the instance array must conform to the schema in the corresponding position for this array.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="additionalItems"></a>
## additionalItems

This provides a definition for additional items in an array instance when tuple definitions of the items is provided.  This can be false to indicate additional items in the array are not allowed, or it can be a schema that defines the schema of the additional items.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="required"></a>
## required

This attribute indicates if the instance must have a value, and not be undefined.  This is false by default, making the instance optional.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="dependencies"></a>
## dependencies

This attribute is an object that defines the requirements of a property on an instance object. If an object instance has a property with the same name as a property in this attribute's object, then the instance must be valid against the attribute's property value (hereafter referred to as the "dependency value").

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✖ |

<a name="minimum"></a>
## minimum

This attribute defines the minimum value of the instance property when the type of the instance value is a number.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="maximum"></a>
## maximum

This attribute defines the maximum value of the instance property when the type of the instance value is a number.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="exclusiveMinimum"></a>
## exclusiveMinimum

This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the "minimum" attribute.  This is false by default, meaning the instance value can be greater then or equal to the minimum value.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="exclusiveMaximum"></a>
## exclusiveMaximum

This attribute indicates if the value of the instance (if the instance is a number) can not equal the number defined by the "maximum" attribute.  This is false by default, meaning the instance value can be less then or equal to the maximum value.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="minItems"></a>
## minItems

This attribute defines the minimum number of values in an array when the array is the instance value.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="maxItems"></a>
## maxItems

This attribute defines the maximum number of values in an array when the array is the instance value.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="uniqueItems"></a>
## uniqueItems

This attribute indicates that all items in an array instance must be unique (contains no two identical values). Two instance are consider equal if they are both of the same type. 

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="pattern"></a>
## pattern

When the instance value is a string, this provides a regular expression that a string instance MUST match in order to be valid.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="minLength"></a>
## minLength

When the instance value is a string, this defines the minimum length of the string.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="maxLength"></a>
## maxLength

When the instance value is a string, this defines the maximum length of the string.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="enum"></a>
## enum

This provides an enumeration of all possible values that are valid for the instance property.  This MUST be an array, and each item in the array represents a possible value for the instance value.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="default"></a>
## default

This attribute defines the default value of the instance when the instance is undefined.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✖ |

<a name="title"></a>
## title

This attribute is a string that provides a short description of the instance property.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="description"></a>
## description

This attribute is a string that provides a full description of the of purpose the instance property.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="format"></a>
## format

| Value | **JSON Schema Draft** | **Amanda** |
|:------|:---------------------:|:-----------|
| `date-time` | ✔ | ✔ |
| `date` | ✔ | ✔ |
| `time` | ✔ | ✔ |
| `utc-milisec` | ✔ | ✔ |
| `regex` | ✔ | ✔ |
| `color` | ✔ | ✔ |
| `style` | ✔ | ✔ |
| `phone` | ✔ | ✔ |
| `uri` | ✔ | ✔ |
| `email` | ✔ | ✔ |
| `ip-address` | ✔ | ✔ |
| `ipv6` | ✔ | ✔ |
| `host-name` | ✔ | ✔ |

Amanda also supports some customs formats.

| Value | **JSON Schema Draft** | **Amanda** |
|:------|:---------------------:|:-----------|
| `alpha` | ✖ | ✔ |
| `alphanumeric` | ✖ | ✔ |
| `decimal` | ✔ | ✔ |
| `percentage` | ✔ | ✔ |
| `port` | ✔ | ✔ |

Amanda aliases

* `dateTime` → `date-time`
* `utcMilisec`` → `utc-milisec`
* `url` → `uri`
* `ipv4` → `ip-address`
* `ip` → `ip-address` or `ipv6`
* `hostName` → `host-name`

### Custom formats

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="divisibleBy"></a>
## divisibleBy

This attribute defines what value the number instance must be divisible by with no remainder (the result of the division must be an integer). The value of this attribute should not be 0.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="disallow"></a>
## disallow

This attribute takes the same values as the "type" attribute, however if the instance matches the type or if this value is an array and the instance matches any type or schema in the array, then this instance is not valid.

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✔ |

<a name="extends"></a>
## extends

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✖ |

<a name="id"></a>
## id

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✖ |

<a name="$ref"></a>
## $ref

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✖ |

<a name="$schema"></a>
## $schema

| **JSON Schema Draft** | ✔ |
|:----------------------|:--:|
| **Amanda** | ✖ |