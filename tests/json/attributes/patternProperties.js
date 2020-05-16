if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../releases/latest/amanda.js');
}

/**
 * PatternProperties
 * --------------------
 */
suite('JSON/Attribute/patternProperties', function() {

  var count = 0;

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  test('regexp', function() {

    var count = 0;

    /**
     * Schema
     */
    var schema = {
      type: 'object',
      patternProperties: {
        '^name': {
          type: 'string'
        }
      },
    };
    
    jsonSchemaValidator.validate({}, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'František',
      surname: 'Hába'
    }, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      surname: 123
    }, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 123
    }, schema, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'name');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    expect(count).to.be.eql(4);

  });

});