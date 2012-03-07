if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var Amanda = require('../../../../dist/latest.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#int', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'int'
  };

  /**
   * Validator
   */
  var Validator = new Amanda('json');

  test('should not return an error', function() {
    [
      1,
      2,
      3,
      4,
      5,
      6,
      -1,
      -2
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });  
    });
  });

  test('should run 8 times', function() {
    expect(count).to.be.eql(8);
  });

});