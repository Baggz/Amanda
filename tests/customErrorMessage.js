// Load dependencies
var amanda = require('../src/amanda.js');

/**
 * Test #1
 */
exports['should be able to set custom error messages'] = function(test) {

  var expected_error_message = 'this is a custome error messsage.';
  var schema = {
    type: 'object',
    properties: {
      some_number: {
        required: true,
        type: 'string',
        message: expected_error_message
      }
    }
  };

  amanda.validate({
  }, schema, { singleError: true }, function(error) {
    var error_messages = error
    console.log(error_messages)
    test.equal(error_messages[0]['message'], expected_error_message)
  })

  test.done();

};
