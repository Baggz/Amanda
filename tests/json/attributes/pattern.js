if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var Amanda = require('../../../dist/latest.js');
}

/**
 * Pattern
 * --------------------
 */
suite('JSON/Attribute/pattern', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'string',
    pattern: /a/
  };

  /**
   * Validator
   */
  var Validator = new Amanda('json');

  test('should not return an error', function() {
    Validator.validate('hola', schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });
  });

  test('should return an error', function() {
    Validator.validate('hello', schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });
  });

  test('should run 2 times', function() {
    expect(count).to.be.eql(2);
  });

});