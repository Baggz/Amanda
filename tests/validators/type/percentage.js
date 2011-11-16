// Load dependencies
var amanda = require('../../../src/amanda.js'),
    async = require('async');

/**
 * Test ‘percentage’
 */
exports['Test ‘percentage’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'decimal'
  };

  var percentage = [
    96,
    78,
    55,
    3,
    67,
    49,
    70,
    7,
    8.92,
    12.12,
    31,
    73,
    10,
    77,
    99,
    82,
    98,
    69,
    53,
    66,
    51,
    85,
    8,
    58,
    71,
    5,
    79,
    57,
    61,
    27,
    13,
    20,
    48,
    43,
    39,
    23,
    93,
    87,
    74,
    29,
    22,
    64,
    65,
    91,
    21,
    12,
    76,
    14,
    17,
    24,
    45,
    84,
    88,
    1,
    50,
    56,
    52,
    97,
    81,
    72,
    11,
    94,
    36,
    89,
    42,
    41,
    4,
    46,
    40,
    35,
    33,
    0,
    100,
    15,
    6,
    59,
    60,
    92,
    80,
    83,
    19,
    47,
    26,
    62,
    95,
    9,
    68,
    30,
    38,
    34,
    90,
    28,
    37,
    44,
    54,
    86,
    75,
    16,
    18,
    63,
    32,
    2,
    25
  ];

  percentage.forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, percentage.length);
  test.done();

};