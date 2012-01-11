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
    }, schema, { singleError: false }, function(error) {

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
    
    amanda.validate(input, schema, { singleError: false }, function(error) {

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

    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

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
    {
      input: { users: [{ name: 123 }, { surname: 456 }] },
      errors: [
        {
          property: 'users[0].name',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'users[1].surname',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'string'
        }
      ]
    },
    {
      input: { users: [{ name: 123 }, { surname: 456 }, 789] },
      errors: [
        {
          property: 'users[0].name',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'users[1].surname',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'users[2]',
          propertyValue: 789,
          validator: 'type',
          validatorValue: 'object'
        }
      ]
    },
    {
      input: { users: [{}, { name: 123 }, { surname: 456 }, 789] },
      errors: [
        {
          property: 'users[1].name',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'users[2].surname',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: 'users[3]',
          propertyValue: 789,
          validator: 'type',
          validatorValue: 'object'
        }
      ]
    }
  ].forEach(function(obj) {
  
    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

      a += 1;

      obj.errors.forEach(function(errorObj, errorIndex) {
        
        delete error[errorIndex].message;

        test.deepEqual(error[errorIndex], {
          property: errorObj.property,
          propertyValue: errorObj.propertyValue,
          validator: errorObj.validator,
          validatorValue: errorObj.validatorValue
        });

      });

      test.equal(error.length, obj.errors.length);

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
    
    amanda.validate(input, schema, { singleError: false }, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 24);
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

    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

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
    {
      input: { users: [{}, 123, {}, 456] },
      errors: [
        {
          property: 'users[1]',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: 'users[3]',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'object'
        }
      ]
    },
    {
      input: { users: [{}, 123, {}, 456, { languages: [] }, { languages: {} }] },
      errors: [
        {
          property: 'users[1]',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: 'users[3]',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: 'users[5].languages',
          propertyValue: {},
          validator: 'type',
          validatorValue: 'array'
        }
      ]
    }
  ].forEach(function(obj) {
  
    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

      a += 1;

      obj.errors.forEach(function(errorObj, errorIndex) {
        
        delete error[errorIndex].message;

        test.deepEqual(error[errorIndex], {
          property: errorObj.property,
          propertyValue: errorObj.propertyValue,
          validator: errorObj.validator,
          validatorValue: errorObj.validatorValue
        });

      });

      test.equal(error.length, obj.errors.length);

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

    amanda.validate(input, schema, { singleError: false }, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 10);
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

    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

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
    {
      input: [123, 456, 789],
      errors: [
        {
          property: '[0]',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: '[1]',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: '[2]',
          propertyValue: 789,
          validator: 'type',
          validatorValue: 'object'
        }
      ]
    },
    {
      input: [{}, 123, 456, 789],
      errors: [
        {
          property: '[1]',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: '[2]',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: '[3]',
          propertyValue: 789,
          validator: 'type',
          validatorValue: 'object'
        }
      ]
    },
    {
      input: [123, 456, 789, {}],
      errors: [
        {
          property: '[0]',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: '[1]',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: '[2]',
          propertyValue: 789,
          validator: 'type',
          validatorValue: 'object'
        }
      ]
    },
    {
      input: [123, { name: 456 }, { surname: 789 }, {}],
      errors: [
        {
          property: '[0]',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: '[1].name',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'string'
        },
        {
          property: '[2].surname',
          propertyValue: 789,
          validator: 'type',
          validatorValue: 'string'
        }
      ]
    },
  ].forEach(function(obj) {
  
    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

      a += 1;

      obj.errors.forEach(function(errorObj, errorIndex) {
        
        delete error[errorIndex].message;

        test.deepEqual(error[errorIndex], {
          property: errorObj.property,
          propertyValue: errorObj.propertyValue,
          validator: errorObj.validator,
          validatorValue: errorObj.validatorValue
        });

      });

      test.equal(error.length, obj.errors.length);

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

    amanda.validate(input, schema, { singleError: false }, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 16);
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

    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

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
    {
      input: { users: 123, privacy: 456 },
      errors: [
        {
          property: 'users',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'array'
        },
        {
          property: 'privacy',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'object'
        }
      ]
    },
    {
      input: { users: 123, privacy: { private: 456, public: 789 } },
      errors: [
        {
          property: 'users',
          propertyValue: 123,
          validator: 'type',
          validatorValue: 'array'
        },
        {
          property: 'privacy.public',
          propertyValue: 789,
          validator: 'type',
          validatorValue: 'boolean'
        },
        {
          property: 'privacy.private',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'boolean'
        }
      ]
    },
    {
      input: { users: ['a', 'b'], privacy: { private: 456, public: 789 } },
      errors: [
        {
          property: 'users[0]',
          propertyValue: 'a',
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: 'users[1]',
          propertyValue: 'b',
          validator: 'type',
          validatorValue: 'object'
        },
        {
          property: 'privacy.public',
          propertyValue: 789,
          validator: 'type',
          validatorValue: 'boolean'
        },
        {
          property: 'privacy.private',
          propertyValue: 456,
          validator: 'type',
          validatorValue: 'boolean'
        }
      ]
    }
  ].forEach(function(obj) {
  
    amanda.validate(obj.input, schema, { singleError: false }, function(error) {

      a += 1;

      obj.errors.forEach(function(errorObj, errorIndex) {
        
        delete error[errorIndex].message;

        test.deepEqual(error[errorIndex], {
          property: errorObj.property,
          propertyValue: errorObj.propertyValue,
          validator: errorObj.validator,
          validatorValue: errorObj.validatorValue
        });

      });

      test.equal(error.length, obj.errors.length);

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

    amanda.validate(input, schema, { singleError: false }, function(error) {

      a += 1;

      test.equal(error, undefined)

    });
  
  });

  test.equal(a, 18);
  test.done();

};

/**
 * Test #6
 * Makes sure that numbers of value 0 can have the required flag
 */
exports['Test #6'] = function(test) {
	var schema = {
		type: 'object',
		properties: {
			number: {
				type: 'number',
				required: true
			}
		}
	};

	[
		123,
		-123,
		0,
		-0
	].forEach(function(input) {
		amanda.validate(
			{
				number: input
			}, 
			schema, 
			{ 
				singleError: false 
			},
			function(error) {
				test.ok(error === undefined);
			}
		);
	});
	
	test.done();
};