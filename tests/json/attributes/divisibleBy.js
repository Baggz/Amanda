if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../releases/latest/amanda.js');
}

/**
 * DivisibleBy
 * --------------------
 */
suite('JSON/Attribute/divisibleBy', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'number',
    divisibleBy: 2
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should return an error', function() {
    [
      1,
      3,
      5,
      7,
      9,
      11,
      111,
      1111
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should not return an error', function() {
    [
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18,
      20,
      22,
      40,
      100,
      1000
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should run 22 times', function() {
    expect(count).to.be.eql(22);
  });

});