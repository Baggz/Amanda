[← Documentation](https://github.com/Baggz/Amanda/tree/master/docs/README.md)

<a name="error"></a>
# Error

### Methods

* [getProperties](#getProperties)
* [getMessages](#getMessages)

**Example**

```javascript
[
  {
    property: 'users[0].username'
    propertyValue: 123
    validator: 'type'
    validatorValue: 'string',
    message: 'Only string is allowed'
  },
  {
    // ...
  }
]
```

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
