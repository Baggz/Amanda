// Load dependencies
var amanda = require('../src/amanda.js');

exports['can show default messages '] = function(test){
 var person = {
    type: 'object',
    properties: {
      soul: {
        type: 'boolean',
        required: true,
      },
      age: {
        type: 'number',
        minimum: 1,
        maximum: 10,
      },
      name: {
        type: 'string',
        length: [2, 8],
      },
      gender: {
        type: 'string',
        enum: ['male', 'female']
      },
      for_except: {
        type: 'string',
        except: ['aaa', 'bbb']
      },
    }
  }

  amanda.validate({
   
  }, person, { singleError: false }, function(error) {
    test.equal(error[0].message, 'soul is required')
  })

  amanda.validate({
    soul: true,
    age: -1
  }, person, { singleError: false }, function(error) {
    test.equal(error[0].message, 'age must be over 1')
  })

  amanda.validate({
    soul: true,
    age: 11
  }, person, { singleError: false }, function(error) {
    test.equal(error[0].message, 'age must be under 10')
  })

  amanda.validate({
    soul: true,
    name: 'a'
  }, person, { singleError: false }, function(error) {
    test.equal(error[0].message, 'name must be between 2 and 8 characters')
  })
  
  amanda.validate({
    soul: true,
    gender: 'none'
  }, person, { singleError: false }, function(error) {
    test.equal(error[0].message, 'gender must be one of male,female')
  })

  amanda.validate({
    soul: true,
    for_except: 'aaa'
  }, person, { singleError: false }, function(error) {
    test.equal(error[0].message, 'for_except must not be one of aaa,bbb')
  })

  test.done()
};

exports['can show default messages: type '] = function(test){
  var obj = {
    type: 'object'
  }
  amanda.validate('', obj, { singleError: false }, function(error) {
    test.equal(error[0].message, ' must be an object')
  })

  var a ={
    type: 'array'
  }
  amanda.validate('', a, { singleError: false }, function(error) {
    test.equal(error[0].message, ' must be an array')
  })

  var int ={
    type: 'integer'
  }
  amanda.validate('', int, { singleError: false }, function(error) {
    test.equal(error[0].message, ' must be an integer')
  })

  var s = {
    type: 'string',
  }
  amanda.validate(1, s, { singleError: false }, function(error) {
    test.equal(error[0].message, ' must be a string')
  })

  var num ={
    type: 'number'
  }
  amanda.validate('', num, { singleError: false }, function(error) {
    test.equal(error[0].message, ' must be a number')
  })

  var f ={
    type: 'function'
  }
  amanda.validate('', f, { singleError: false }, function(error) {
    test.equal(error[0].message, ' must be a function')
  })

  var b ={
    type: 'boolean'
  }
  amanda.validate('', b, { singleError: false }, function(error) {
    test.equal(error[0].message, ' must be a boolean')
  })

  test.done()
};

exports['can show default messages: format '] = function(test){
  var alpha = {
    type: 'string',
    format: 'alpha'
  }
  amanda.validate('', alpha, function(error){
    test.equal(error[0].message, ' must be alphabet')
  })

  var alphanumeric = {
    type: 'string',
    format: 'alphanumeric'
  }
  amanda.validate('', alphanumeric, function(error){
    test.equal(error[0]['message'],' must be alphanumeric')
  })
  var ipv4 = {
    type: 'string',
    format: 'ipv4'
    }
  amanda.validate('', ipv4, function(error){
    test.equal(error[0]['message'],' must be ipv4 format')
  })

  var ipv6 ={
    type: 'string',
    format: 'ipv6'
  }
  amanda.validate('', ipv6, function(error){
    test.equal(error[0]['message'],' must be ipv6 format' )
  })

  var ip = {
    type: 'string',
    format: 'ip'
  }
  amanda.validate('', ip, function(error){
    test.equal(error[0]['message'],' must be ip format' )
  })

  var email ={
    type: 'string',
    format: 'email'
  }
  amanda.validate('', email, function(error){
    test.equal(error[0]['message'],' must be an email address' )
  })

  var url ={
    type: 'string',
    format: 'url'
  }
  amanda.validate('', url, function(error){
    test.equal(error[0]['message'],' must be an url' )
  })

  var date ={
    type: 'string',
    format: 'date'
  }
  amanda.validate('', date, function(error){
    test.equal(error[0]['message'],' must be a date' )
  })

  var decimal ={
    type: 'string',
    format: 'decimal'
  }
  amanda.validate('', decimal, function(error){
    test.equal(error[0]['message'],' must be a decimal number' )
  })



  var int ={
    type: 'string',
    format: 'int'
  }
  amanda.validate('', int, function(error){
    test.equal(error[0]['message'],' must be an integer number' )
  })


  var percentage ={
    type: 'number',
    format: 'percentage'
  }
  amanda.validate(101, percentage, function(error){
    test.equal(error[0]['message'],' must be a percentage' )
  })


  var port ={
    type: 'string',
    format: 'port'
  }
  amanda.validate('', port, function(error){
    test.equal(error[0]['message'],' must be a port number')
  })


  var regexp ={
    type: 'string',
    format: 'regexp'
  }
  amanda.validate('', regexp, function(error){
    test.equal(error[0]['message'],' must be match against regexp' )
  })


  var unsignedInt ={
    type: 'string',
    format: 'unsignedInt'
  }
  amanda.validate('', unsignedInt, function(error){
    test.equal(error[0]['message'],' must be an unsigned integer number' )
  })

  var email = {
    type: 'string',
    format: 'email'
  }
  amanda.validate('aaa', email, { singleError: false }, function(error) {
    test.equal(error[0].message, ' must be an email address')
  })

  test.done()
};

