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
    type: 'array'
  };

  [
    'Hello',
    123,
    true,
    {},
    function() {}
  ].forEach(function(input) {

    amanda.validate(input, schema, { singleError: false }, function(error) {

      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: '',
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

  test.equal(a, 5);
  test.done();

};

/**
 * Test #2
 */
exports['Test #2'] = function(test) {

  var a = 0;

  var schema = {
    type: 'array',
    items: {
      type: 'string'
    }
  };

  amanda.validate([
    'abc',
    'def',
    123,
    'jkl',
    'mno',
    456
  ], schema, { singleError: false }, function(error) {

    a += 1;

    delete error[0].message;
    delete error[1].message;

    test.deepEqual(error[0], {
      property: '[2]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'string'
    });

    test.deepEqual(error[1], {
      property: '[5]',
      propertyValue: 456,
      validator: 'type',
      validatorValue: 'string'
    });

    test.equal(error.length, 2);

    errorMethods.forEach(function(method) {
      test.ok(error[method]);
    });
    
  });

  test.equal(a, 1);
  test.done();

};

/**
 * Test #3
 */
exports['Test #3'] = function(test) {

  var a = 0;

  var schema = {
    type: 'array',
    items: {
      type: 'array'
    }
  };

  [
    'Hello',
    123,
    true,
    {},
    function() {}
  ].forEach(function(input) {

    amanda.validate(input, schema, { singleError: false }, function(error) {
    
      a += 1;

      delete error[0].message;

      test.deepEqual(error[0], {
        property: '',
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

  amanda.validate([], schema, { singleError: false }, function(error) {

    a += 1;

    test.equal(error, undefined)

  });

  [
    'Hello',
    123,
    true,
    {},
    function() {}
  ].forEach(function(input) {

    amanda.validate([input], schema, { singleError: false }, function(error) {

      a += 1;

      delete error[0].message;
      
      test.deepEqual(error[0], {
        property: '[0]',
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

  amanda.validate([[], 123], schema, { singleError: false }, function(error) {

    a += 1;

    delete error[0].message;

    test.deepEqual(error[0], {
      property: '[1]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'array'
    });

    test.equal(error.length, 1);

    errorMethods.forEach(function(method) {
      test.ok(error[method]);
    });

  });

  amanda.validate([[]], schema, { singleError: false }, function(error) {

    a += 1;

    test.equal(error, undefined);

  });

  test.equal(a, 13);
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
      type: 'array',
      items: {
        type: 'array'
      }
    }
  };

  amanda.validate([], schema, { singleError: false }, function(error) {

    a += 1;

    test.equal(error, undefined);

  });

  amanda.validate([[]], schema, { singleError: false }, function(error) {

    a += 1;

    test.equal(error, undefined);

  });

  amanda.validate([[[]]], schema, { singleError: false }, function(error) {

    a += 1;

    test.equal(error, undefined);

  });

  amanda.validate([[123]], schema, { singleError: false }, function(error) {

    a += 1;

    delete error[0].message;

    test.deepEqual(error[0], {
      property: '[0][0]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'array'
    });

    test.equal(error.length, 1);

    errorMethods.forEach(function(method) {
      test.ok(error[method]);
    });

  });

  amanda.validate([123], schema, { singleError: false }, function(error) {

    a += 1;

    delete error[0].message;

    test.deepEqual(error[0], {
      property: '[0]',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'array'
    });

    test.equal(error.length, 1);

    errorMethods.forEach(function(method) {
      test.ok(error[method]);
    });

  });

  test.equal(a, 5);
  test.done();
  
};