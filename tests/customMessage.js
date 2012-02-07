// Load dependencies
var amanda = require('../src/amanda.js');

exports['can set a custom error message'] = function(test){
  var expected_error_message = 'age must be over zero.'
  var person = {
    type: 'object',
    properties: {
      age: {
        type: 'number',
        minimum: 10,
        message: expected_error_message
      }
    }
  }

  amanda.validate({
    age: 1
  }, person, { singleError: false }, function(error) {
    test.equal(error[0].message, expected_error_message)
  })
  test.done()
};
