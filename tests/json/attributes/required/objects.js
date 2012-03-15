if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Required
 * --------------------
 */
suite('JSON/Attribute/required#objects', function() {

  /**
   * Schema
   */
  var schema = {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          name: {
            required: true
          },
          surname: {
            required: true
          }
        }
      }
    }
  };

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  test('should not return an error', function() {

    var count = 0;

    jsonSchemaValidator.validate({
      user: {
        name: 'František',
        surname: 'Hába'
      }
    }, schema, function(error) {
      count += 1;
      expect(error).to.not.be.ok();
    });

    expect(count).to.be.eql(1);

  });

  test('should return an error', function() {

    var count = 0;

    jsonSchemaValidator.validate({}, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate({
      user: {}
    }, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate({
      user: {
        name: 'František'
      }
    }, schema, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    expect(count).to.be.eql(3);

  });



});