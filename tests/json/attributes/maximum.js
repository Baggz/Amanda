if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../dist/latest.js');
}

/**
 * Maximum
 * --------------------
 */
suite('JSON/Attribute/maximum', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'number',
    maximum: 10
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should return an error', function() {
    [
      11,
      12,
      13,
      14,
      15,
      20,
      100,
      1000,
      10000
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should not return an error', function() {
    [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should run 20 times', function() {
    expect(count).to.be.eql(20);
  });

});