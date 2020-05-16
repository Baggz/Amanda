if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../releases/latest/amanda.js');
}

/**
 * Maximum
 * --------------------
 */
suite('JSON/ArraysObjects (with the ‘singleError’ flag)', function() {

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

    jsonSchemaValidator.validate({}, schema, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({ users: [] }, schema, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    expect(count).to.be.eql(2);

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

    jsonSchemaValidator.validate({}, schema, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({ users: [] }, schema, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      users: [
        {
          name: 'František'
        }
      ]
    }, schema, function(error) {
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
    }, schema, function(error) {
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
    }, schema, function(error) {
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
    }, schema, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      users: [
        {
          name: 123,
        }
      ]
    }, schema, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'users[0].name');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate({
      users: [
        {
          name: 'František',
          surname: 123
        }
      ]
    }, schema, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'users[0].surname');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate({
      users: [
        {},
        {
          name: 'František',
          surname: 123
        }
      ]
    }, schema, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'users[1].surname');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    expect(count).to.be.eql(9);

  });

});