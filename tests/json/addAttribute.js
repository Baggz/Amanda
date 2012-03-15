if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../releases/latest/amanda.js');
}

/**
 * AddAttribute
 * --------------------
 */
suite('JSON/addAttribute', function() {

  var count = 0;

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  /**
   * MyAttribute
   */
  jsonSchemaValidator.addAttribute('myAttribute', function(property, propertyValue, attributeValue, propertyAttributes, callback) {

    var usernames = [
      'Baggz',
      'Amanda',
      'Administrator',
      'Admin'
    ];

    if (attributeValue && usernames.indexOf(propertyValue) !== -1) {
      this.addError();
    }

    return callback();

  });

  /**
   * Schema1
   */
  var schema1 = {
    myAttribute: true
  };

  /**
   * Schema2
   */
  var schema2 = {
    type: 'object',
    properties: {
      name: {
        myAttribute: true
      }
    }
  };

  test('should return an error', function() {

    var count = 0;

    jsonSchemaValidator.validate('Baggz', schema1, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate('Amanda', schema1, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate('Administrator', schema1, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate('Admin', schema1, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    expect(count).to.be.eql(4);

  });

  test('should return an error', function() {

    var count = 0;

    jsonSchemaValidator.validate({
      name: 'Baggz'
    }, schema2, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'Amanda'
    }, schema2, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'Administrator'
    }, schema2, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    jsonSchemaValidator.validate({
      name: 'Admin'
    }, schema2, function(error) {
      count += 1;
      expect(error).to.be.ok();
    });

    expect(count).to.be.eql(4);

  });

});