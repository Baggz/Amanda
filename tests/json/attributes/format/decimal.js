if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#decimal', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'decimal'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      1,
      10,
      20,
      30,
      1.11,
      1.23,
      1.30,
      230.36
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should return an error', function() {
    [
      1.123981273,
      19723.129319,
      '+@#$~^*{}',
      'lorem ipsum',
      ' ',
      null,
      [],
      {},
      function() {}
    ].forEach(function(instance) {
      Validator.validate(instance, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should run 17 times', function() {
    expect(count).to.be.eql(17);
  });

});