if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../releases/latest/amanda.js');
}

/**
 * Enum
 * --------------------
 */
suite('JSON/Attribute/enum', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'string',
    enum: [
      'admin',
      'administrator'
    ]
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should return an error when an instance equals ‘superadmin’', function() {
    Validator.validate('superadmin', schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });
  });

  test('should return an error when an instance equals ‘amanda’', function() {
    Validator.validate('amanda', schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });
  });

  test('should not return an error when an instance equals ‘admin’', function() {
    Validator.validate('admin', schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });
  });

  test('should not return an error when an instance equals ‘administrator’', function() {
    Validator.validate('administrator', schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });
  });

  test('should run 4 times', function() {
    expect(count).to.be.eql(4);
  });

});