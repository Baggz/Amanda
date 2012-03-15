if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#regex', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'regex'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      new RegExp(),
      /a/gi
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });  
    });
  });

  test('should return an error', function() {
    [
      new Date(),
      [],
      {},
      function() {},
      '11/11/11',
      11
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });  
    });
  });

  test('should run 8 times', function() {
    expect(count).to.be.eql(8);
  });

});