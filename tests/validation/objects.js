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
    type: 'object'
  };

  amanda.validate({}, schema, { singleError: false }, function(error) {
    
    a += 1;

    test.equal(error, undefined);

  });

  [
    'Hello',
    123,
    true,
    [],
    function() {}
  ].forEach(function(input) {

    amanda.validate(input, schema, { singleError: false }, function(error) {
    
      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: '',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'object'
      });

      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });

  });

  test.equal(a, 6);
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
      name: {
        type: 'string'  
      },
      surname: {
        type: 'string'  
      }
    }
  };

  [
    'Hello',
    123,
    true,
    [],
    function() {}
  ].forEach(function(input) {

    amanda.validate(input, schema, { singleError: false }, function(error) {
    
      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: '',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'object'
      });

      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });

  });

  [
    undefined,
    {}
  ].forEach(function(input) {

    amanda.validate(input, schema, { singleError: false }, function(error) {

      a += 1;

      test.equal(error, undefined);

    });

  });

  amanda.validate({
    name: 123,
    surname: 456
  }, schema, { singleError: false }, function(error) {

    a += 1;

    delete error[0].message;
    delete error[1].message;

    test.deepEqual(error[0], {
      property: 'name',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    });

    test.deepEqual(error[1], {
      property: 'surname',
      propertyValue: 456,
      validator: 'type',
      validatorValue: 'string'
    });

    test.equal(error.length, 2);

    errorMethods.forEach(function(method) {
      test.ok(error[method]);
    });
    
  });

  test.equal(a, 8);
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
      user: {
        type: 'object',
        properties: {
          localization: {
            type: 'object',
            properties: {
              location: {
                type: 'string'
              },
              language: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  };

  [
    'Hello',
    123,
    true,
    [],
    function() {}
  ].forEach(function(input) {

    amanda.validate(input, schema, { singleError: false }, function(error) {
    
      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: '',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'object'
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
    { user: {} },
    { user: { localization: {} } },
    { user: { localization: { location: 'abc', language: 'def' } } }
  ].forEach(function(input) {

    amanda.validate(input, schema, { singleError: false }, function(error) {

      a += 1;

      test.equal(error, undefined);

    });

  });

  [
    'Hello',
    123,
    true,
    [],
    function() {}
  ].forEach(function(input) {

    amanda.validate({ 
      user: input 
    }, schema, { singleError: false }, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: 'user',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'object'
      });

      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });

  });

  [
    'Hello',
    123,
    true,
    [],
    function() {}
  ].forEach(function(input) {

    amanda.validate({ 
      user: { 
        localization: input
      }
    }, schema, { singleError: false }, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: 'user.localization',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'object'
      });

      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });

  });

  [
    123,
    true,
    [],
    {},
    function() {}
  ].forEach(function(input) {

    amanda.validate({ 
      user: { 
        localization: { 
          language: input 
        } 
      }
    }, schema, { singleError: false }, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: 'user.localization.language',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'string'
      });

      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });

  });

  [
    123,
    true,
    [],
    {},
    function() {}
  ].forEach(function(input) {

    amanda.validate({ 
      user: { 
        localization: { 
          location: input 
        }
      }
    }, schema, { singleError: false }, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: 'user.localization.location',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'string'
      });

      test.equal(error.length, 1);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });

  });

  [
    123,
    true,
    [],
    {},
    function() {}
  ].forEach(function(input) {

    amanda.validate({ 
      user: {
        localization: { 
          language: input, 
          location: input 
        } 
      }
    }, schema, { singleError: false }, function(error) {

      a += 1;

      delete error[0].message;
      delete error[1].message;

      test.deepEqual(error[0], {
        property: 'user.localization.location',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'string'
      });

      test.deepEqual(error[1], {
        property: 'user.localization.language',
        propertyValue: input,
        validator: 'type',
        validatorValue: 'string'
      });

      test.equal(error.length, 2);

      errorMethods.forEach(function(method) {
        test.ok(error[method]);
      });

    });

  });

  test.equal(a, 35);
  test.done();

};