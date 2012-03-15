if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
  var domains = require('../../../resources/domains.js');
  var emails = require('../../../resources/emails.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#email', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'email'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {

    domains.forEach(function(domain) {
      emails.forEach(function(name) {

        Validator.validate(name + '@' + 'example' + domain, schema, function(error) {
          count += 1;
          expect(error).to.not.be.ok();
        });

      });
    });

  });

  test('should run 1890 times', function() {
    expect(count).to.be.eql(1890);
  });

});