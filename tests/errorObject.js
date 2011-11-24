// Load dependencies
var amanda = require('../src/amanda.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var schema = {
    type: 'object',
    properties: {
      name: {
        required: true,
        type: 'string'
      },
      surname: {
        required: true,
        type: 'string'
      }
    }
  };

  amanda.validate({
    name: 123,
    surname: 456
  }, schema, { singleError: false }, function(error) {
    
    var properties = error.getProperties();

    test.deepEqual(properties, ['name', 'surname']);

  })

  test.done();

};