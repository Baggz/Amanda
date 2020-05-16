if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../releases/latest/amanda.js');
}

/**
 * Maximum
 * --------------------
 */
suite('JSON/ArraysObjects (without the ‘singleError’ flag)', function() {

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

    /**
     * Schema
     */
    var schema = {
      type: 'object',
      properties: {
        users: {
          type: 'array'
        }
      }
    };

    jsonSchemaValidator.validate({}, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({ users: [] }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

  });

  /**
   * Example #2
   */
  test('Test #2', function() {

    var count = 0;

    /**
     * Schema
     */
    var schema = {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              surname: {
                type: 'string'
              }
            }
          }
        }
      }
    };

    jsonSchemaValidator.validate({}, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({ users: [] }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      users: [
        {
          name: 'František'
        }
      ]
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      users: [
        {
          name: 'František',
          surname: 'Hába'
        }
      ]
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      users: [
        {},
        {
          name: 'František',
          surname: 'Hába'
        }
      ]
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      users: [
        {},
        {
          name: 'František',
          surname: 'Hába'
        },
        {}
      ]
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      users: [
        {
        },
        {
          name: 123,
          surname: 123,
        },
        {
          name: 123,
        }
      ]
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('2');
      expect(error).to.have.property('length', 3);

      expect(error[0]).to.have.property('property', 'users[1].name');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

      expect(error[1]).to.have.property('property', 'users[1].surname');
      expect(error[1]).to.have.property('propertyValue', 123);
      expect(error[1]).to.have.property('attributeName', 'type');
      expect(error[1]).to.have.property('attributeValue', 'string');

      expect(error[2]).to.have.property('property', 'users[2].name');
      expect(error[2]).to.have.property('propertyValue', 123);
      expect(error[2]).to.have.property('attributeName', 'type');
      expect(error[2]).to.have.property('attributeValue', 'string');

    });

  });

});