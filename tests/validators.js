// Load dependencies
var amanda = require('../src/amanda.js'),
    async = require('async');

/**
 * Test ‘array’
 */
exports['Test ‘array’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'array'
  };

  [
    [],
    [1, 2, 3],
    ['a', 'b', 'c'],
    [function() {}, function() {}],
    [{}, {}, {}]
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    '',
    null,
    undefined,
    {},
    function() {}
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 10);
  test.done();

};

/**
 * Test ‘alpha’
 */
exports['Test ‘alpha’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'alpha'
  };

  [
    'abc',
    'ABC',
    'Abc',
    'aBc'
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    '123',
    '+@#$~^*{}',
    'lorem ipsum',
    ' ',
    123,
    null,
    [],
    function() {}
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 12);
  test.done();

};

/**
 * Test ‘alphanumeric’
 */
exports['Test ‘alphanumeric’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'alphanumeric'
  };

  [
    'abc123',
    '123abc',
    'a1b2c3',
    'abc',
    'ABC',
    'Abc',
    '123',
    123
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    undefined,
    '+@#$~^*{}',
    'lorem ipsum',
    ' ',
    null,
    [],
    function() {}
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 15);
  test.done();

};

/**
 * Test ‘ip’
 */
exports['Test ‘ip’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'ip'
  };

  [
    '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 1);
  test.done();

};

/**
 * Test ‘email’
 */
exports['Test ‘email’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'email'
  };

  var domains = [
    '.ac',
    '.ad',
    '.ae',
    '.af',
    '.ag',
    '.ai',
    '.al',
    '.am',
    '.an',
    '.ao',
    '.aq',
    '.ar',
    '.as',
    '.at',
    '.au',
    '.aw',
    '.ax',
    '.az',
    '.ba',
    '.bb',
    '.bd',
    '.be',
    '.bf',
    '.bg',
    '.bh',
    '.bi',
    '.bj',
    '.bm',
    '.bn',
    '.bo',
    '.br',
    '.bs',
    '.bt',
    '.bv',
    '.bw',
    '.by',
    '.bz',
    '.ca',
    '.cc',
    '.cd',
    '.cf',
    '.cg',
    '.ch',
    '.ci',
    '.ck',
    '.cl',
    '.cm',
    '.cn',
    '.co',
    '.cr',
    '.cs',
    '.cu',
    '.cv',
    '.cx',
    '.cy',
    '.cz',
    '.dd',
    '.de',
    '.dj',
    '.dk',
    '.dm',
    '.do',
    '.dz',
    '.ec',
    '.ee',
    '.eg',
    '.er',
    '.es',
    '.et',
    '.eu',
    '.fi',
    '.fj',
    '.fk',
    '.fm',
    '.fo',
    '.fr',
    '.ga',
    '.gb',
    '.gd',
    '.ge',
    '.gf',
    '.gg',
    '.gh',
    '.gi',
    '.gl',
    '.gm',
    '.gn',
    '.gp',
    '.gq',
    '.gr',
    '.gs',
    '.gt',
    '.gu',
    '.gw',
    '.gy',
    '.hk',
    '.hm',
    '.hn',
    '.hr',
    '.ht',
    '.hu',
    '.id',
    '.ie',
    '.il',
    '.im',
    '.in',
    '.io',
    '.iq',
    '.ir',
    '.is',
    '.it',
    '.je',
    '.jm',
    '.jo',
    '.jp',
    '.ke',
    '.kg',
    '.kh',
    '.ki',
    '.km',
    '.kn',
    '.kp',
    '.kr',
    '.kw',
    '.ky',
    '.kz',
    '.la',
    '.lb',
    '.lc',
    '.li',
    '.lk',
    '.lr',
    '.ls',
    '.lt',
    '.lu',
    '.lv',
    '.ly',
    '.ma',
    '.mc',
    '.md',
    '.me',
    '.mg',
    '.mh',
    '.mk',
    '.ml',
    '.mm',
    '.mn',
    '.mo',
    '.mp',
    '.mq',
    '.mr',
    '.ms',
    '.mt',
    '.mu',
    '.mv',
    '.mw',
    '.mx',
    '.my',
    '.mz',
    '.na',
    '.nc',
    '.ne',
    '.nf',
    '.ng',
    '.ni',
    '.nl',
    '.no',
    '.np',
    '.nr',
    '.nu',
    '.nz',
    '.om',
    '.pa',
    '.pe',
    '.pf',
    '.pg',
    '.ph',
    '.pk',
    '.pl',
    '.pm',
    '.pn',
    '.pr',
    '.ps',
    '.pt',
    '.pw',
    '.py',
    '.qa',
    '.re',
    '.ro',
    '.rs',
    '.ru',
    '.rw',
    '.sa',
    '.sb',
    '.sc',
    '.sd',
    '.se',
    '.sg',
    '.sh',
    '.si',
    '.sj',
    '.sk',
    '.sl',
    '.sm',
    '.sn',
    '.so',
    '.sr',
    '.st',
    '.su',
    '.sv',
    '.sy',
    '.sz',
    '.tc',
    '.td',
    '.tf',
    '.tg',
    '.th',
    '.tj',
    '.tk',
    '.tl',
    '.tm',
    '.tn',
    '.to',
    '.tp',
    '.tr',
    '.tt',
    '.tv',
    '.tw',
    '.tz',
    '.ua',
    '.ug',
    '.uk',
    '.us',
    '.uy',
    '.uz',
    '.va',
    '.vc',
    '.ve',
    '.vg',
    '.vi',
    '.vn',
    '.vu',
    '.wf',
    '.ws',
    '.ye',
    '.yt',
    '.za',
    '.zm',
    '.zw',
    '.aero',
    '.asia',
    '.biz',
    '.cat',
    '.com',
    '.coop',
    '.edu',
    '.gov',
    '.info',
    '.int',
    '.jobs',
    '.mil',
    '.mobi',
    '.museum',
    '.name',
    '.net',
    '.org',
    '.pro',
    '.tel',
    '.travel',
    '.xxx'
  ];

  var names = [
    'info',
    'myEmail',
    'myEmail+notifications',
    'my.email',
    'my_email',
    'my-email',
    'my.email.my.email'
  ];

  domains.forEach(function(domain) {

    names.forEach(function(name) {

      amanda.validate(name + '@' + 'example' + domain, schema, function(error) {
        count += 1;
        test.equal(error, undefined);
      });

    });

  });

  test.equal(count, (domains.length*names.length));
  test.done();

};

/**
 * Test ‘url’
 */
exports['Test ‘url’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'url'
  };

  var domains = [
    '.ac',
    '.ad',
    '.ae',
    '.af',
    '.ag',
    '.ai',
    '.al',
    '.am',
    '.an',
    '.ao',
    '.aq',
    '.ar',
    '.as',
    '.at',
    '.au',
    '.aw',
    '.ax',
    '.az',
    '.ba',
    '.bb',
    '.bd',
    '.be',
    '.bf',
    '.bg',
    '.bh',
    '.bi',
    '.bj',
    '.bm',
    '.bn',
    '.bo',
    '.br',
    '.bs',
    '.bt',
    '.bv',
    '.bw',
    '.by',
    '.bz',
    '.ca',
    '.cc',
    '.cd',
    '.cf',
    '.cg',
    '.ch',
    '.ci',
    '.ck',
    '.cl',
    '.cm',
    '.cn',
    '.co',
    '.cr',
    '.cs',
    '.cu',
    '.cv',
    '.cx',
    '.cy',
    '.cz',
    '.dd',
    '.de',
    '.dj',
    '.dk',
    '.dm',
    '.do',
    '.dz',
    '.ec',
    '.ee',
    '.eg',
    '.er',
    '.es',
    '.et',
    '.eu',
    '.fi',
    '.fj',
    '.fk',
    '.fm',
    '.fo',
    '.fr',
    '.ga',
    '.gb',
    '.gd',
    '.ge',
    '.gf',
    '.gg',
    '.gh',
    '.gi',
    '.gl',
    '.gm',
    '.gn',
    '.gp',
    '.gq',
    '.gr',
    '.gs',
    '.gt',
    '.gu',
    '.gw',
    '.gy',
    '.hk',
    '.hm',
    '.hn',
    '.hr',
    '.ht',
    '.hu',
    '.id',
    '.ie',
    '.il',
    '.im',
    '.in',
    '.io',
    '.iq',
    '.ir',
    '.is',
    '.it',
    '.je',
    '.jm',
    '.jo',
    '.jp',
    '.ke',
    '.kg',
    '.kh',
    '.ki',
    '.km',
    '.kn',
    '.kp',
    '.kr',
    '.kw',
    '.ky',
    '.kz',
    '.la',
    '.lb',
    '.lc',
    '.li',
    '.lk',
    '.lr',
    '.ls',
    '.lt',
    '.lu',
    '.lv',
    '.ly',
    '.ma',
    '.mc',
    '.md',
    '.me',
    '.mg',
    '.mh',
    '.mk',
    '.ml',
    '.mm',
    '.mn',
    '.mo',
    '.mp',
    '.mq',
    '.mr',
    '.ms',
    '.mt',
    '.mu',
    '.mv',
    '.mw',
    '.mx',
    '.my',
    '.mz',
    '.na',
    '.nc',
    '.ne',
    '.nf',
    '.ng',
    '.ni',
    '.nl',
    '.no',
    '.np',
    '.nr',
    '.nu',
    '.nz',
    '.om',
    '.pa',
    '.pe',
    '.pf',
    '.pg',
    '.ph',
    '.pk',
    '.pl',
    '.pm',
    '.pn',
    '.pr',
    '.ps',
    '.pt',
    '.pw',
    '.py',
    '.qa',
    '.re',
    '.ro',
    '.rs',
    '.ru',
    '.rw',
    '.sa',
    '.sb',
    '.sc',
    '.sd',
    '.se',
    '.sg',
    '.sh',
    '.si',
    '.sj',
    '.sk',
    '.sl',
    '.sm',
    '.sn',
    '.so',
    '.sr',
    '.st',
    '.su',
    '.sv',
    '.sy',
    '.sz',
    '.tc',
    '.td',
    '.tf',
    '.tg',
    '.th',
    '.tj',
    '.tk',
    '.tl',
    '.tm',
    '.tn',
    '.to',
    '.tp',
    '.tr',
    '.tt',
    '.tv',
    '.tw',
    '.tz',
    '.ua',
    '.ug',
    '.uk',
    '.us',
    '.uy',
    '.uz',
    '.va',
    '.vc',
    '.ve',
    '.vg',
    '.vi',
    '.vn',
    '.vu',
    '.wf',
    '.ws',
    '.ye',
    '.yt',
    '.za',
    '.zm',
    '.zw',
    '.aero',
    '.asia',
    '.biz',
    '.cat',
    '.com',
    '.coop',
    '.edu',
    '.gov',
    '.info',
    '.int',
    '.jobs',
    '.mil',
    '.mobi',
    '.museum',
    '.name',
    '.net',
    '.org',
    '.pro',
    '.tel',
    '.travel',
    '.xxx'
  ];

  var names = [
    'http://www.example',
    'https://www.example',
    'http://example',
    'https://example',
    'www.example',
    'www.example',
    'example',
    'example'
  ];

  var params = [
    '/?foo',
    '/?foo=bar',
    '/path/to/file/',
    '/path/to/file/?query',
    '/path/to/file/?foo1=bar1&foo2=bar2',
    '/index.html'
  ];

  domains.forEach(function(domain) {

    names.forEach(function(name) {

      amanda.validate(name + domain, schema, function(error) {
        count += 1;
        test.equal(error, undefined);
      });

      params.forEach(function(param) {
        amanda.validate(name + domain + param, schema, function(error) {
          count += 1;
          test.equal(error, undefined);
        });
      });

    });

  });

  test.equal(count, (domains.length*names.length) + (domains.length*names.length*params.length));
  test.done();

};

/**
 * Test ‘date’
 */
exports['Test ‘date’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'date'
  };

  [
    new Date()
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    0,
    1,
    2,
    null,
    {},
    [],
    function() {},
    'Hello!',
    undefined,
    ''
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 11);
  test.done();

};

/**
 * Test ‘decimal’
 */
exports['Test ‘decimal’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'decimal'
  };

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
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    1.123981273,
    19723.129319
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 10);
  test.done();

};

/**
 * Test ‘int’
 */
exports['Test ‘int’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'int'
  };

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
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 8);
  test.done();

};

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

/**
 * Test ‘port’
 */
exports['Test ‘port’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'port'
  };

  [
    ':80',
    ':800',
    ':8080'
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 3);
  test.done();

};

/**
 * Test ‘regexp’
 */
exports['Test ‘regexp’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'regexp'
  };

  [
    new RegExp()
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  test.equal(count, 1);
  test.done();

};

/**
 * Test ‘unsignedInt’
 */
exports['Test ‘unsignedInt’'] = function(test) {

  var count = 0;

  var schema = {
    type: 'unsignedInt'
  };

  [
    1,
    2,
    3,
    4,
    5,
    6
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.equal(error, undefined);
    });  
  });

  [
    -1212,
    -2112,
    -12.21
  ].forEach(function(data) {
    amanda.validate(data, schema, function(error) {
      count += 1;
      test.ok(error);
    });  
  });

  test.equal(count, 9);
  test.done();

};

