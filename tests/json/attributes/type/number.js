if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Type
 * --------------------
 */
suite('JSON/Attribute/type#number', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    type: 'number'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      0,
      676,
      737,
      157,
      617,
      303,
      545,
      183,
      893,
      773,
      253,
      686,
      12.12,
      212.2917,
      -21,
      -21.212
    ].forEach(function(instance) {
      Validator.validate(instance, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should return an error', function() {
    [
      'Hello',
      true,
      {},
      [],
      function() {}
    ].forEach(function(instance) {
      Validator.validate(instance, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should run 21 times', function() {
    expect(count).to.be.eql(21);
  });

});