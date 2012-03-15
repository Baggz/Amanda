if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
  var percentage = require('../../../resources/percentage.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#percentage', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'percentage'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    percentage.forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });  
    });
  });

  test('should run ' + percentage.length + ' times', function() {
    expect(count).to.be.eql(percentage.length);
  });

});