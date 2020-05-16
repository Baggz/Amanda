if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Required
 * --------------------
 */
suite('JSON/Attribute/required#string', function() {

  /**
   * Schema
   */
  var schema = {
    required: true,
    type: 'string'
  };

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  test('should not return an error', function() {

    var count = 0;

    jsonSchemaValidator.validate('Hello', schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    expect(count).to.be.eql(1);

  });

  test('should return an error', function() {
    
    var count = 0;

    jsonSchemaValidator.validate(null, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate(undefined, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate('', schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    expect(count).to.be.eql(3);

  });

});

/**
 * Required
 * --------------------
 */
suite('JSON/Attribute/required#array', function() {

  /**
   * Schema
   */
  var schema = {
    required: true,
    type: 'array'
  };

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  test('should not return an error', function() {

    var count = 0;

    jsonSchemaValidator.validate([1, 2, 3], schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    expect(count).to.be.eql(1);

  });

  test('should return an error', function() {
    
    var count = 0;

    jsonSchemaValidator.validate(null, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate(undefined, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate([], schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    expect(count).to.be.eql(3);

  });

});

/**
 * Required
 * --------------------
 */
suite('JSON/Attribute/required#object', function() {

  /**
   * Schema
   */
  var schema = {
    required: true,
    type: 'object'
  };

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  test('should not return an error', function() {

    var count = 0;

    jsonSchemaValidator.validate({
      foo: 'bar'
    }, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    expect(count).to.be.eql(1);

  });

  test('should return an error', function() {
    
    var count = 0;

    jsonSchemaValidator.validate(null, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate(undefined, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate({}, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    expect(count).to.be.eql(3);

  });

});