if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../releases/latest/amanda.js');
}

/**
 * Maximum
 * --------------------
 */
suite('JSON/Arrays (without the ‘singleError’ flag)', function() {

  /**
   * Options
   */
  var options = {
    singleError: false
  };

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  /**
   * Example #1
   */
  test('Test #1', function() {

    var count = 0;

    var schema = {
      type: 'array',
      items: {
        type: 'string'
      }
    };

    jsonSchemaValidator.validate([], schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate([
      'a',
      'b',
      'c',
      'd'
    ], schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate([
      1,
      2,
      3,
      4
    ], schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[0]');
      expect(error[0]).to.have.property('propertyValue', 1);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      1,
      'b',
      'c',
      'd'
    ], schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[0]');
      expect(error[0]).to.have.property('propertyValue', 1);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      'a',
      2,
      'c',
      'd'
    ], schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[1]');
      expect(error[0]).to.have.property('propertyValue', 2);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      'a',
      'b',
      3,
      'd'
    ], schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[2]');
      expect(error[0]).to.have.property('propertyValue', 3);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      'a',
      'b',
      'c',
      4
    ], schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[3]');
      expect(error[0]).to.have.property('propertyValue', 4);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      1,
      'b',
      'c',
      4
    ], schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('length', 2);

      expect(error[0]).to.have.property('property', '[0]');
      expect(error[0]).to.have.property('propertyValue', 1);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

      expect(error[1]).to.have.property('property', '[3]');
      expect(error[1]).to.have.property('propertyValue', 4);
      expect(error[1]).to.have.property('attributeName', 'type');
      expect(error[1]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      undefined,
      undefined,
      undefined,
      1
    ], schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[3]');
      expect(error[0]).to.have.property('propertyValue', 1);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    expect(count).to.be.eql(9);

  });

  /**
   * Example #2
   */
  test('Test #2', function() {

    var count = 0;

    var schema = {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    };

    jsonSchemaValidator.validate([], schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate([[]], schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate([[], []], schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate([[], undefined, []], schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate([
      ['a', 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e']
    ], schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate([
      [1, 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e']
    ], schema, options, function(error) {

      count += 1;
      
      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[0][0]');
      expect(error[0]).to.have.property('propertyValue', 1);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      ['a', 'b', 'c', 'd', 'e'],
      [1, 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e']
    ], schema, options, function(error) {

      count += 1;
      
      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[1][0]');
      expect(error[0]).to.have.property('propertyValue', 1);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      ['a', 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e'],
      [1, 'b', 'c', 'd', 'e']
    ], schema, options, function(error) {

      count += 1;
      
      expect(error).to.be.ok();
      expect(error).to.have.property('0');

      expect(error[0]).to.have.property('property', '[2][0]');
      expect(error[0]).to.have.property('propertyValue', 1);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate([
      [1, 'b', 'c', 'd', 'e'],
      ['a', 'b', 1, 'd', 'e'],
      ['a', 'b', 'c', 'd', 1]
    ], schema, options, function(error) {

      count += 1;
      
      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('2');
      expect(error).to.have.property('length', 3);

      expect(error[0]).to.have.property('property', '[0][0]');
      expect(error[0]).to.have.property('propertyValue', 1);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

      expect(error[1]).to.have.property('property', '[1][2]');
      expect(error[1]).to.have.property('propertyValue', 1);
      expect(error[1]).to.have.property('attributeName', 'type');
      expect(error[1]).to.have.property('attributeValue', 'string');

      expect(error[2]).to.have.property('property', '[2][4]');
      expect(error[2]).to.have.property('propertyValue', 1);
      expect(error[2]).to.have.property('attributeName', 'type');
      expect(error[2]).to.have.property('attributeValue', 'string');

    });

    expect(count).to.be.eql(9);

  });

});