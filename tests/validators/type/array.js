// Load dependencies
var amanda = require('../../../dist/latest.js');

/**
 * Schema
 */
var schema = {
  required: true,
  type: 'array'
};

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var a = 0;

  [
    [],
    [1, 2, 3],
    ['a', 'b', 'c'],
    [function() {}, function() {}],
    [{}, {}, {}]
  ].forEach(function(data) {

    amanda.validate(data, schema, function(error) {

      a += 1;

      test.equal(error, undefined);

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

  [
    'Hello',
    123,
    true,
    {},
    function() {},
  ].forEach(function(data) {

    amanda.validate(data, schema, function(error) {

      a += 1;
      
      delete error[0].message;

      test.deepEqual(error[0], {
        property: '',
        propertyValue: data,
        validator: 'type',
        validatorValue: 'array'
      });

    });

  });

  test.equal(a, 5);
  test.done();

};