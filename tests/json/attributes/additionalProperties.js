if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../releases/latest/amanda.js');
}

/**
 * DivisibleBy
 * --------------------
 */
suite('JSON/Attribute/additionalProperties', function() {

  var count = 0;

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  test('true', function() {

    var count = 0;

    /**
     * Schema
     */
    var schema = {
      type: 'object',
      additionalProperties: true,
      properties: {
        name: {
          type: 'string'
        }
      }
    };
    
    jsonSchemaValidator.validate({}, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'František',
      surname: 'Hába',
      age: 19
    }, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    expect(count).to.be.eql(2);

  });

  test('false', function() {

    var count = 0;

    /**
     * Schema
     */
    var schema = {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: {
          type: 'string'
        }
      }
    };
    
    jsonSchemaValidator.validate({}, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'František'
    }, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'František',
      surname: 'Hába',
      age: 19
    }, schema, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('length', 2);

      expect(error[0]).to.have.property('property', 'surname');
      expect(error[0]).to.have.property('propertyValue', 'Hába');
      expect(error[0]).to.have.property('attributeName', 'additionalProperties');
      expect(error[0]).to.have.property('attributeValue', false);

      expect(error[1]).to.have.property('property', 'age');
      expect(error[1]).to.have.property('propertyValue', 19);
      expect(error[1]).to.have.property('attributeName', 'additionalProperties');
      expect(error[1]).to.have.property('attributeValue', false);

    });

    expect(count).to.be.eql(3);

  });

  test('schema', function() {

    var count = 0;

    /**
     * Schema
     */
    var schema = {
      type: 'object',
      additionalProperties: {
        type: 'number'
      },
      properties: {
        name: {
          type: 'string'
        }
      }
    };
    
    jsonSchemaValidator.validate({}, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'František'
    }, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'František',
      surname: 'Hába',
      age: 19
    }, schema, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'surname');
      expect(error[0]).to.have.property('propertyValue', 'Hába');
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'number');

    });

    expect(count).to.be.eql(3);

  });

});