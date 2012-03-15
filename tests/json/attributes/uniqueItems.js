if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../releases/latest/amanda.js');
}

/**
 * UniqueItems
 * --------------------
 */
suite('JSON/Attribute/uniqueItems', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'array',
    uniqueItems: true,
    items: {
      type: 'string'
    }
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should return an error', function() {
    [
      ['a', 'a', 'a'],
      ['a', 'a', 'b'],
      ['a', 'b', 'a'],
      ['a', 'b', 'b'],
      ['a', 'b', 'a', 'b'],
      [1, 1, 1],
      [1, 1, 2],
      [1, 2, 1],
      [1, 2, 2],
      [1, 2, 1, 2],
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
      ['a', 'b', 'c'],
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should run 12 times', function() {
    expect(count).to.be.eql(12);
  });

});