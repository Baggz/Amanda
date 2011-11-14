// Load
var amanda = require('../src/amanda.js');

/**
 * Test route matching
 */
exports['Test #1'] = function(test) {

  var schema = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        length: [2, 45]
      },
      name: {
        type: 'string',
        length: [2, 45]
      }
    }
  };

  amanda.validate({
    username: 'John',
    name: 'John Dee'
  }, schema, function(error) {
    test.equal(error, undefined);
  });

  amanda.validate({
    username: '',
    name: 'John Dee'
  }, schema, function(error) {
    test.ok(error);
    test.done();
  });

};



/*
amanda.validate([
  'a', 'b'
], {
  type: 'array',
  items: {
    type: 'number' 
  }
}, function() {
  console.log(arguments);
});
*/