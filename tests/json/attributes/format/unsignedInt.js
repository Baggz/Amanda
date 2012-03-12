if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../dist/latest.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#unsignedInt', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'unsignedInt'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      1,
      2,
      3,
      4,
      5,
      6
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });  
    });
  });

  test('should return an error', function() {
    [
      -1212,
      -2112,
      -12.21
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });  
    });
  });

  test('should run 9 times', function() {
    expect(count).to.be.eql(9);
  });

});