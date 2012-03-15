if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#alphanumeric', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'alphanumeric'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      'abc123',
      '123abc',
      'a1b2c3',
      'abc',
      'ABC',
      'Abc',
      '123',
      123
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });  
    });
  });

  test('should return an error', function() {
    [
      '+@#$~^*{}',
      'lorem ipsum',
      ' ',
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });  
    });
  });

  test('should run 11 times', function() {
    expect(count).to.be.eql(11);
  });

});