if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../releases/latest/amanda.js');
}

/**
 * MaxItems
 * --------------------
 */
suite('JSON/Attribute/maxItems', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'array',
    maxItems: 2
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should return an error', function() {
    [
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5]
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should not return an error', function() {
    [
      [],
      [1],
      [1, 2]
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should run 6 times', function() {
    expect(count).to.be.eql(6);
  });

});