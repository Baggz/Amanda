if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../dist/latest.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#ip', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'ip'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    [
      '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      '210.232.115.79',
      '18.239.245.96',
      '15.138.29.10',
      '182.166.124.240',
      '118.118.155.180',
      '80.200.1.109',
      '139.170.113.124',
      '85.13.30.193',
      '80.198.199.175',
      '111.162.166.83'
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        count += 1;
        expect(error).to.not.be.ok();
      });  
    });
  });

  test('should run 11 times', function() {
    expect(count).to.be.eql(11);
  });

});