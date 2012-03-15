if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../releases/latest/amanda.js');
}

/**
 * Objects
 * --------------------
 */
suite('JSON/Objects (without the ‘singleError’ flag)', function() {

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
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      }
    };

    jsonSchemaValidator.validate({}, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      name: 'František'
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      name: 123
    }, schema, options, function(error) {

      count += 1;
      
      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'name');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    expect(count).to.be.eql(3);

  });

  /**
   * Example #2
   */
  test('Test #2', function() {

    var count = 0;

    var schema = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            location: {
              type: 'string'
            },
            language: {
              type: 'string'
            }
          }
        }
      }
    };

    jsonSchemaValidator.validate({}, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: {}
    }, schema, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: 'Hello'
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'user');
      expect(error[0]).to.have.property('propertyValue', 'Hello');
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'object');

    });

    jsonSchemaValidator.validate({
      user: {
        location: 'Internet'
      }
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: {
        language: 'en'
      }
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: {
        location: 'Internet',
        language: 'en'
      }
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: {
        location: 123,
        language: 'en'
      }
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'user.location');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate({
      user: {
        location: 'Internet',
        language: 123
      }
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'user.language');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate({
      user: {
        location: 123,
        language: 123
      }
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('length', 2);

      expect(error[0]).to.have.property('property', 'user.location');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

      expect(error[1]).to.have.property('property', 'user.language');
      expect(error[1]).to.have.property('propertyValue', 123);
      expect(error[1]).to.have.property('attributeName', 'type');
      expect(error[1]).to.have.property('attributeValue', 'string');

    });

    expect(count).to.be.eql(9);

  });

  /**
   * Example #3
   */
  test('Test #3', function() {

    var count = 0;

    var schema = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            localization: {
              type: 'object',
              properties: {
                location: {
                  type: 'string'
                },
                language: {
                  type: 'string'
                }
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

    jsonSchemaValidator.validate({
      user: {}
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: {
        localization: {}
      }
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: {
        localization: {
          location: 'Internet'
        }
      }
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: {
        localization: {
          language: 'en'
        }
      }
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate({
      user: {
        localization: {
          location: 'Internet',
          language: 'en'
        }
      }
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.be(undefined);
    });

    jsonSchemaValidator.validate(123, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', '');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'object');

    });

    jsonSchemaValidator.validate({
      user: 123
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'user');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'object');

    });

    jsonSchemaValidator.validate({
      user: {
        localization: 123
      }
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'user.localization');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'object');

    });

    jsonSchemaValidator.validate({
      user: {
        localization: {
          location: 'Internet',
          language: 123
        }
      }
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'user.localization.language');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate({
      user: {
        localization: {
          location: 123,
          language: 'en'
        }
      }
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('length', 1);

      expect(error[0]).to.have.property('property', 'user.localization.location');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate({
      user: {
        localization: {
          location: 123,
          language: 123
        }
      }
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('length', 2);

      expect(error[0]).to.have.property('property', 'user.localization.location');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

      expect(error[1]).to.have.property('property', 'user.localization.language');
      expect(error[1]).to.have.property('propertyValue', 123);
      expect(error[1]).to.have.property('attributeName', 'type');
      expect(error[1]).to.have.property('attributeValue', 'string');

    });

    expect(count).to.be.eql(12);

  });

  /**
   * Example #3
   */
  test('Test #3', function() {

    var count = 0;

    var schema = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            }
          }
        },
        message: {
          type: 'string'
        }
      }
    };

    jsonSchemaValidator.validate({
      user: {
        name: 'František'
      },
      message: 'Lorem ipsum'
    }, schema, options, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    jsonSchemaValidator.validate({
      user: 123,
      message: 123
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('length', 2);

      expect(error[0]).to.have.property('property', 'user');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'object');

      expect(error[1]).to.have.property('property', 'message');
      expect(error[1]).to.have.property('propertyValue', 123);
      expect(error[1]).to.have.property('attributeName', 'type');
      expect(error[1]).to.have.property('attributeValue', 'string');

    });

    jsonSchemaValidator.validate({
      user: {
        name: 123
      },
      message: 123
    }, schema, options, function(error) {

      count += 1;

      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('length', 2);

      expect(error[0]).to.have.property('property', 'user.name');
      expect(error[0]).to.have.property('propertyValue', 123);
      expect(error[0]).to.have.property('attributeName', 'type');
      expect(error[0]).to.have.property('attributeValue', 'string');

      expect(error[1]).to.have.property('property', 'message');
      expect(error[1]).to.have.property('propertyValue', 123);
      expect(error[1]).to.have.property('attributeName', 'type');
      expect(error[1]).to.have.property('attributeValue', 'string');

    });

    expect(count).to.be.eql(3);

  });

});