if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Type
 * --------------------
 */
suite('JSON/Attribute/type#function', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'function'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      function() {},
      (function() {})
    ].forEach(function(instance) {
      Validator.validate(instance, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should return an error', function() {
    [
      'Hello',
      123,
      true,
      {},
      []
    ].forEach(function(instance) {
      Validator.validate(instance, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should run 7 times', function() {
    expect(count).to.be.eql(7);
  });

});