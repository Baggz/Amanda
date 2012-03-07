// Load dependencies
var amanda = require('../../../src/amanda.js');

var schema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        name: {
          required: true
        },
        surname: {
          required: true
        }
      }
    }
  }
};

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var data = {
    user: {
      name: 'František',
      surname: 'Hába'
    }
  };

  amanda.validate(data, schema, function(error) {

    test.equal(error, undefined);

  });

  test.done();

};

exports['Test #2'] = function(test) {

  var data = {
    user: 123
  };

  amanda.validate(data, schema, function(error) {

    delete error[0].message;
    delete error[1].message;

    test.deepEqual(error[0], {
      property: 'user',
      propertyValue: 123,
      validator: 'type',
      validatorValue: 'object'
    });

    test.deepEqual(error[1], {
      property: 'user.name',
      propertyValue: undefined,
      validator: 'required',
      validatorValue: true
    });

    test.equal(error.length, 2);

  });

  test.done();

};

exports['Test #3'] = function(test) {

  var data = {
    user: {}
  };

  amanda.validate(data, schema, function(error) {

    delete error[0].message;

    test.deepEqual(error[0], {
      property: 'user.name',
      propertyValue: undefined,
      validator: 'required',
      validatorValue: true
    });

    test.equal(error.length, 1);

  });

  test.done();

};

exports['Test #4'] = function(test) {

  var data = {
    user: {
      name: 'František'
    }
  };

  amanda.validate(data, schema, function(error) {

    delete error[0].message;

    test.deepEqual(error[0], {
      property: 'user.surname',
      propertyValue: undefined,
      validator: 'required',
      validatorValue: true
    });

    test.equal(error.length, 1);

  });

  test.done();

};

exports['Test #5'] = function(test) {

  var data = {
    user: {
      surname: 'Hába'
    }
  };

  amanda.validate(data, schema, function(error) {

    delete error[0].message;

    test.deepEqual(error[0], {
      property: 'user.name',
      propertyValue: undefined,
      validator: 'required',
      validatorValue: true
    });

    test.equal(error.length, 1);

  });

  test.done();

};

/**
 * Test #6
 *
 * Allow object to be empty as the user value is not required
 */
exports['Test #6'] = function(test) {

  var data = {};

  amanda.validate(data, schema, function(error) {

    test.equal(error, undefined);

  });

  test.done();

};
