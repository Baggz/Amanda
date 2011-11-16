// Load dependencies
var amanda = require('../src/amanda.js'),
    async = require('async');

/**
 * Test ‘validate’
 */
exports['Basic validation'] = function(test) {

  /**
   * Schema
   */
  var schema = {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            length: [2, 45]
          },
          name: {
            type: 'string',
            length: [2, 45]
          },
          surname: {
            type: 'string',
            length: [2, 45]
          },
          localization: {
            type: 'object',
            properties: {
              language: {
                type: 'string',
                length: 2
              }
            }
          }
        }
      }
    }
  };

  /**
   * Data
   */
  var data = {
    user: {
      username: 'Baggz',
      name: 'František',
      surname: 'Hába',
      localization: {
        language: 'en'
      }
    }
  };

  async.series([

    function(callback) {
      amanda.validate(data, schema, function(error) {
        test.equal(error, undefined);
        callback(null);
      });
    },

    function(callback) {
      data.user.localization = 'enn';
      amanda.validate(data, schema, function(error) {
        test.ok(error);
        callback(null);
      });
    }

  ], test.done);  

};

/**
 * Test ‘validate’
 */
exports['Array validation'] = function(test) {

  /**
   * Schema
   */
  var schema = {
    type: 'array',
  };

  amanda.validate([1, 2, 3, 4], schema, function(error) {
    test.equal(error, undefined);
    test.done();
  });

};

/**
 * Test ‘validate’
 */
exports['Advanced array validation'] = function(test) {

  /**
   * Schema
   */
  var schema = {
    type: 'array',
    items: {
      type: 'number'
    }
  };

  amanda.validate([1, 2, 3, 4], schema, function(error) {
    test.equal(error, undefined);
  });

  amanda.validate(['a', 'b', 'c', 'd'], schema, function(error) {
    test.ok(error);
    test.done();
  });

};

/**
 * Test ‘validate’
 */
exports['Validation with ‘required’'] = function(test) {

  var c = 0;
  
  /**
   * Schema
   */
  var schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        required: false
      },
      surname: {
        type: 'string',
        required: false
      }
    }
  };

  amanda.validate({}, schema, function(error) {
    c += 1;
    test.equal(error, undefined);
  });

  amanda.validate({
    name: 'František'
  }, schema, function(error) {
    c += 1;
    test.equal(error, undefined);
  });

  amanda.validate({
    name: 'František',
    surname: 'Hába'
  }, schema, function(error) {
    c += 1;
    test.equal(error, undefined);
  });

  test.equal(c, 3);
  test.done();
};

/**
 * Test ‘validate’
 */
exports['Advanced validation with ‘required’'] = function(test) {

  var c = 0;
  
  /**
   * Schema
   */
  var schema1 = {
    type: 'object',
    required: true,
    properties: {
      user: {
        type: 'object',
        required: false,
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
  };

  amanda.validate({}, schema1, function(error) {
    test.equal(error, undefined);
  });

  amanda.validate({ 
    user: {
      name: 'František',
      surname: 'Hába'
    }
  }, schema1, function(error) {
    test.equal(error, undefined);
  });

  amanda.validate('Hello!', schema1, function(error) {
    test.ok(error);
  });

  amanda.validate({ 
    user: {
      name: 123,
      surname: 'Hába'
    }
  }, schema1, function(error) {
    test.ok(error);
  });


  //test.equal(c, 3);
  test.done();
};


/**
 * Test ‘validate’
 */
exports['Array validation with ‘required’'] = function(test) {

  /**
   * Schema
   */
  var schema = {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              required: true
            },
            surname: {
              type: 'string',
              required: true
            }
          }
        }
      }
    }
  };

  amanda.validate({
    users: [
      {
        name: 'František',
        surname: 'Hába'
      },
      {
        name: 'František',
        surname: 'Hába'
      },
      {
        name: 'František',
        surname: 'Hába'
      }
    ]
  }, schema, function(error) {
    test.equal(error, undefined);
  });

  amanda.validate({
    users: [
      {
        name: 'František',
        surname: 'Hába'
      },
      {},
      {
        name: 'František',
        surname: 'Hába'
      }
    ]
  }, schema, function(error) {
    test.equal(error, undefined);
  });

  test.done();

  

};