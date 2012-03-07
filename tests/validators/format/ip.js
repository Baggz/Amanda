// Load dependencies
var amanda = require('../../../dist/latest.js');

/**
 * Test #1
 */
exports['Test #1'] = function(test) {

  var count = 0;

  var schema = {
    required: true,
    format: 'ip'
  };

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
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 11);
  test.done();

};