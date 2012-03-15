if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Type
 * --------------------
 */
suite('JSON/Attribute/type#boolean', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'boolean'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      true,
      false
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
      {},
      [],
      function() {}
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