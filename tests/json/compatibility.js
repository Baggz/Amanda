if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../releases/latest/amanda.js');
}

/**
 * Backward Compatibility
 * --------------------
 */
suite('JSON/Backward Compatibility', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'string'
  };

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  test('The ‘Error’ object has the ‘getProperties’ method', function() {
    jsonSchemaValidator.validate(123, schema, function(error) {
      expect(error).to.be.ok();
      expect(error).to.have.property('getProperties');
    });
  });

  test('The ‘Error’ object has the ‘getMessages’ method', function() {
    jsonSchemaValidator.validate(123, schema, function(error) {
      expect(error).to.be.ok();
      expect(error).to.have.property('getMessages');
    });
  });

  test('The ‘Error’ object has all properties', function() {
    jsonSchemaValidator.validate(123, schema, function(error) {
      expect(error).to.be.ok();
      expect(error[0]).to.have.property('property', undefined);
      expect(error[0]).to.have.property('propertyValue');
      expect(error[0]).to.have.property('validatorName');
      expect(error[0]).to.have.property('validatorValue');
    });
  });

  test('Amanda has the ‘addValidator’ method', function() {
    expect(amanda).to.have.property('addValidator');
  });

  test('Amanda has the ‘validate’ method', function() {
    expect(amanda).to.have.property('validate');
  });

});