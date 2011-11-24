// Load dependencies
var amanda = require('../../src/amanda.js');

// Error methods
var errorMethods = [
  'getProperties',
  'getMessages'
];

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var a = 0;

  var schema = {
    type: 'object',
    properties: {
      users: {
        type: 'array',
      }
    }
  };

  [
    'Hello',
    123,
    true,
    {},
    function() {}
  ].forEach(function(input) {

    amanda.validate({
      users: input
    }, schema, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: 'users',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'array'
      });
      
      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });
  
  });
  
  [
    undefined,
    {},
    { users: undefined },
    { users: [] }
  ].forEach(function(input) {
    
    amanda.validate(input, schema, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 9);
  test.done();

};

/**
 * Test #2
 */
exports['Test #2'] = function(test) {

  var a = 0;

  var schema = {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            surname: {
              type: 'string'
            }
          }
        }
      }
    }
  };

  [
    {
      input: { users: [123] },
      property: 'users[0]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'object'
    },
    {
      input: { users: [{}, 123] },
      property: 'users[1]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'object'
    },
    {
      input: { users: [{}, {}, 123] },
      property: 'users[2]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'object'
    },
    {
      input: { users: [{ name: 123 }] },
      property: 'users[0].name',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: { users: [{ name: 123 }, {}] },
      property: 'users[0].name',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: { users: [{}, { name: 123 }] },
      property: 'users[1].name',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: { users: [{}, { surname: 123 }] },
      property: 'users[1].surname',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: { users: [{}, {}, { name: 123 }] },
      property: 'users[2].name',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    }
  ].forEach(function(obj) {

    amanda.validate(obj.input, schema, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: obj.property,
        propertyValue: obj.propertyValue,
        validator: obj.validator,
        validatorValue: obj.validatorValue
      });
      
      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });
  
  });

  [
    undefined,
    {},
    { users: undefined },
    { users: [] },
    { users: [{}] },
    { users: [{}, {}, {}] },
    { users: [{ name: 'František' }] },
    { users: [{}, { name: 'František' }] },
    { users: [{ surname: 'Hába' }] },
    { users: [{}, { surname: 'Hába' }] },
    { users: [{ name: 'František', surname: 'Hába' }] },
    { users: [{}, { name: 'František', surname: 'Hába' }] },
    { users: [{}, {}, { name: 'František', surname: 'Hába' }] }
  ].forEach(function(input) {
    
    amanda.validate(input, schema, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 21);
  test.done();

};

/**
 * Test #3
 */
exports['Test #3'] = function(test) {

  var a = 0;

  var schema = {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            languages: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  };

  [
    {
      input: { users: [{ languages: [123] }] },
      property: 'users[0].languages[0]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: { users: [{ languages: ['a', 'b', 123] }] },
      property: 'users[0].languages[2]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: { users: [{}, { languages: [123] }] },
      property: 'users[1].languages[0]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: { users: [{}, { languages: ['a', 'b', 123] }] },
      property: 'users[1].languages[2]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: { users: [{ languages: [123] }, {}] },
      property: 'users[0].languages[0]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    }
  ].forEach(function(obj) {

    amanda.validate(obj.input, schema, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: obj.property,
        propertyValue: obj.propertyValue,
        validator: obj.validator,
        validatorValue: obj.validatorValue
      });
      
      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });
  
  });

  [
    { users: [{}] },
    { users: [{ languages: [] }] },
    { users: [{ languages: ['a', 'b', 'c'] }] },
  ].forEach(function(input) {

    amanda.validate(input, schema, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 8);
  test.done();

};

/**
 * Test #4
 */
exports['Test #4'] = function(test) {

  var a = 0;

  var schema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        surname: {
          type: 'string'
        }
      }
    }
  };

  [
    {
      input: [123],
      property: '[0]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'object'
    },
    {
      input: [[]],
      property: '[0]',
      propertyValue: [],
      validator: 'type',
      validatorValue: 'object'
    },
    {
      input: [{ name: 123 }],
      property: '[0].name',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: [{ surname: 123 }],
      property: '[0].surname',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: [{}, { name: 123 }],
      property: '[1].name',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: [{}, { surname: 123 }],
      property: '[1].surname',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: [{}, { name: 123 }, {}],
      property: '[1].name',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    },
    {
      input: [{}, { surname: 123 }, {}],
      property: '[1].surname',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    }
  ].forEach(function(obj) {

    amanda.validate(obj.input, schema, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: obj.property,
        propertyValue: obj.propertyValue,
        validator: obj.validator,
        validatorValue: obj.validatorValue
      });
      
      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });
  
  });

  [
    undefined,
    [],
    [{}],
    [{}, {}]
  ].forEach(function(input) {

    amanda.validate(input, schema, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 12);
  test.done();

};

/**
 * Test #5
 */
exports['Test #5'] = function(test) {

  var a = 0;

  var schema = {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          type: 'object'
        }
      },
      privacy: {
        type: 'object',
        properties: {
          public: {
            type: 'boolean'
          },
          private: {
            type: 'boolean'
          }
        }
      }
    }
  };

  [
    {
      input: { users: 123 },
      property: 'users',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'array'
    },
    {
      input: { privacy: 123 },
      property: 'privacy',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'object'
    },
    {
      input: { privacy: { public: 123 } },
      property: 'privacy.public',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'boolean'
    },
    {
      input: { privacy: { private: 123 } },
      property: 'privacy.private',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'boolean'
    },
    {
      input: { users: [123] },
      property: 'users[0]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'object'
    },
    {
      input: { users: [{}, 123] },
      property: 'users[1]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'object'
    }
  ].forEach(function(obj) {

    amanda.validate(obj.input, schema, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: obj.property,
        propertyValue: obj.propertyValue,
        validator: obj.validator,
        validatorValue: obj.validatorValue
      });
      
      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });
  
  });

  [
    undefined,
    {},
    { users: [] },
    { privacy: {} },
    { users: [], privacy: {} },
    { users: [{}], privacy: {} },
    { users: [{}], privacy: { public: true } },
    { users: [{}], privacy: { private: true } },
    { users: [{}], privacy: { public: true, private: true } }
  ].forEach(function(input) {

    amanda.validate(input, schema, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 15);
  test.done();

};
