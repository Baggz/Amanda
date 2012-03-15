if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Type
 * --------------------
 */
suite('JSON/Attribute/type#array', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'array'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      [],
      [1, 2, 3],
      ['a', 'b', 'c'],
      [function() {}, function() {}],
      [{}, {}, {}]
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
      function() {}
    ].forEach(function(instance) {
      Validator.validate(instance, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should run 10 times', function() {
    expect(count).to.be.eql(10);
  });

});