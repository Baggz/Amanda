if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../releases/latest/amanda.js');
}

/**
 * Error
 * --------------------
 */
suite('JSON/Error', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      surname: {
        type: 'string'
      }
    }
  };

  /**
   * Validator
   */
  var jsonSchemaValidator = amanda('json');

  test('has all methods', function() {

    var count = 0;

    jsonSchemaValidator.validate({
      name: 123,
      surname: 456
    }, schema, { singleError: false }, function(error) {
      
      expect(error).to.be.ok();
      expect(error).to.have.property('0');
      expect(error).to.have.property('1');
      expect(error).to.have.property('length', 2);

      expect(error).to.have.property('getProperties');
      expect(error).to.have.property('getMessages');

      expect(error.getProperties()).to.be.eql(['name', 'surname']);

    });

  });

});