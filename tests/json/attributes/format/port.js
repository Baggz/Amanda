if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var Amanda = require('../../../../dist/latest.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#array', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'port'
  };

  /**
   * Validator
   */
  var Validator = new Amanda('json');

  test('should not return an error', function() {
    [
      ':80',
      ':800',
      ':8080'
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.be.not.ok();
      });  
    });
  });

  test('should run 3 times', function() {
    expect(count).to.be.eql(3;
  });

};