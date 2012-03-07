if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var Amanda = require('../../../../dist/latest.js');
  var domains = require('../../../resources/domains.js');
  var domainNames = require('../../../resources/domainNames.js');
  var params = require('../../../resources/params.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#url', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'url'
  };

  /**
   * Validator
   */
  var Validator = new Amanda('json');

  test('should not return an error', function() {

    domains.forEach(function(domain) {
      domainNames.forEach(function(name) {

        Validator.validate(name + domain, schema, function(error) {
          count += 1;
          expect(error).to.not.be.ok();
        });

        params.forEach(function(param) {
          Validator.validate(name + domain + param, schema, function(error) {
            count += 1;
            expect(error).to.not.be.ok();
          });
        });

      });
    });

  });

  test('should return an error', function() {
    [
      'google.a',
      'google.rog',
      'google://google',
      'example',
      'http://ex.o',
      'www.ex.o',
      'pam.pam.pam',
      'go@gle',
      'g::gle',
      '☺☻☹.com',
      '☜☞☝☟'
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should run 18911 times', function() {
    expect(count).to.be.eql(18911);
  });

});