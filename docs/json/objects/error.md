# Error

**Example**

```javascript
{
  '0': {
    property: 'users[0].username'
    propertyValue: 123
    attributeName: 'type'
    attributeValue: 'string',
    message: 'Lorem ipsum dolor isamet pide quidu delime.'
  },
  ...
}
```

### Methods

* [getProperties](#getProperties)
* [getMessages](#getMessages)

<a name="getProperties"></a>
## getProperties [#](#getProperties)

**Example**

```javascript
error.getProperties(); // => ['users[0].username']
```

<a name="getMessages"></a>
## getMessages [#](#getMessages)

**Example**

```javascript
error.getMessages(); // => ['Only string is allowed']
```
