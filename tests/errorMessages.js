// Load dependencies
var amanda = require('../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  /**
   * Messages
   */
  var messages1 = {
    type: 'My custom message'
  };

  /**
   * Messages
   */
  var messages2 = {
    type: 'My custom message with placeholders {{property}} and {{propertyValue}} and {{validator}}.'
  };

  /**
   * Messages
   */
  var messages3 = {
    type: function(property, propertyValue, validator) {
      return 'My custom message with placeholders ' + property + ' and ' + propertyValue + ' and ' + validator + '.';
    }
  };

  amanda.validate(123, {
    type: 'string'
  }, {
    singleError: true,
    messages: messages1
  }, function(error) {
    count += 1;
    test.equal(error[0].message, 'My custom message');
  });

  amanda.validate(123, {
    type: 'string'
  }, {
    singleError: true,
    messages: messages2
  }, function(error) {
    count += 1;
    test.equal(error[0].message, 'My custom message with placeholders and 123 and string.');
  });

  amanda.validate({
    name: 123
  }, {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      }
    }
  }, {
    singleError: true,
    messages: messages2
  }, function(error) {
    count += 1;
    test.equal(error[0].message, 'My custom message with placeholders name and 123 and string.');
  });

  amanda.validate({
    name: 123
  }, {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      }
    }
  }, {
    singleError: true,
    messages: messages3
  }, function(error) {
    count += 1;
    test.equal(error[0].message, 'My custom message with placeholders name and 123 and string.');
  });

  test.equal(count, 4);
  test.done();

};