if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../releases/latest/amanda.js');
}

/**
 * Maximum
 * --------------------
 */
suite('JSON/LargeArrays', function() {

  /**
   * Options
   */
  var options = {
    singleError: false
  };

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');


    /**
   * Test large Array size
   */
  test('should not make so many fn calls that the stack fills up', function() {

    var count = 0;

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

    var data = {
      users: []
    };

    for (var i = 0; i <10000; i++) {
      data.users[i] = {
          name: 'František',
          surname: 'Hába'
        }
    };

    jsonSchemaValidator.validate(data, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

  });

});
