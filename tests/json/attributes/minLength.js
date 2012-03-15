if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../releases/latest/amanda.js');
}

/**
 * MinLength
 * --------------------
 */
suite('JSON/Attribute/minLength', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'string',
    minLength: 10
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      'abcdefghij',
      'abcdefghijk',
      'abcdefghijkl',
      'abcdefghijklm'
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should return an error', function() {
    [
      'a',
      'ab',
      'abc',
      'abcd',
      'abcde',
      'abcdef',
      'abcdefg',
      'abcdefgh',
      'abcdefghi'
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should run 13 times', function() {
    expect(count).to.be.eql(13);
  });

});