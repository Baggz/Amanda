/**
 * Attributes
 * --------------------
 */
var attributes = {

  /**
   * Required
   */
  required: function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    if (attributeValue && propertyValue === undefined) {
      return callback(true);
    } else {
      return callback();
    }
  },

  /**
   * Type
   */
  'type': (function() {
    
    var types = {
      'object': function(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
      },
      'array': function(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
      },
      'integer': function(input) {
        return (typeof input === 'number') && input % 1 === 0;
      }
    };

    // Generate the rest of type checkers
    [
      'string',
      'number',
      'function',
      'boolean'
    ].forEach(function(type) {
      types[type] = function() {
        return typeof arguments[0] === type;
      };
    });

    return function(property, propertyValue, attributeValue, propertyAttributes, callback) {

      /**
       * {
       *   type: ['string', 'number']
       * }
       */
      if (Object.prototype.toString.call(attributeValue) === '[object Array]') {
        var noError = attributeValue.some(function(type) {
          return types[type](propertyValue);
        });
        return (noError) ? callback() : callback(true);

      /**
       * {
       *   type: 'string'
       * }
       */
      } else {
        return (types[attributeValue](propertyValue)) ? callback() : callback(true);
      }

    };

  }()),

  /**
   * Format
   */
  'format': (function() {

    /**
     * Aliases
     *
     * Amanda allows you to use alases for format
     */
    var aliases = {

    };

    /**
     * CustomFormats
     */
    var customFormats = {
      'alpha': {
        type: 'string',
        regex: /^[a-zA-Z]+$/
      },
      'alphanumeric': {
        type: 'string',
        allowedType: 'number',
        regex: /^[a-zA-Z0-9]+$/
      },
    };

    /**
     * Formats
     */
    var formats = {
      'alpha': function(input) {
        return (typeof input === 'string' && input.match(/^[a-zA-Z]+$/));
      },
      'alphanumeric': function(input) {
        return (typeof input === 'string' && /^[a-zA-Z0-9]+$/.test(input)) || typeof input === 'number';
      },
      'ipv4': function(input) {
        return typeof input === 'string' && input.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
      },
      'ipv6': function(input) {
        return typeof input === 'string' && input.match(/(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(?:(?:[a-f\d]{1,4}:)*[a-f\d]{1,4})?::(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))?)/);
      },
      'ip': function(input) {
        return formats.ipv4(input) || formats.ipv6;
      },
      'email': function(input) {
        return typeof input === 'string' && input.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
      },
      'url': function(input) {
        return typeof input === 'string' && input.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|cat|coop|int|pro|tel|xxx|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2})?)|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/);
      },
      'date': function(input) {
        return Object.prototype.toString.call(input) === '[object Date]';
      },
      'decimal': function(input) {
        return /^[0-9]+(\.[0-9]{1,2})?$/.test(input);
      },
      'int': function(input) {
        return /^-?[0-9]+$/.test(input);
      },
      'percentage': function(input) {
        return (typeof input == 'string' && input.match(/^-?[0-9]{0,2}(\.[0-9]{1,2})?$|^-?(100)(\.[0]{1,2})?$/)) || (input >= -100 && input <= 100);
      },
      'port': function(input) {
        return /\:\d+/.test(input);
      },
      'regex': function(input) {
        return input && input.test && input.exec;
      },
      'unsignedInt': function(input) {
        return /^[0-9]+$/.test(input);
      }
    };

    return function(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (formats[attributeValue](propertyValue)) ? callback() : callback(true);
    };

  }()),

  /**
   * MinLength
   */
  'minLength': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (typeof propertyValue === 'string' && propertyValue.length >= attributeValue) ? callback() : callback(true);
  },

  /**
   * MaxLength
   */
  'maxLength': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (typeof propertyValue === 'string' && propertyValue.length <= attributeValue) ? callback() : callback(true);
  },

  /**
   * Length
   */
  'length': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (typeof propertyValue === 'string' && propertyValue.length === attributeValue) ? callback() : callback(true);
  },

  /**
   * Enum
   */
  'enum': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (attributeValue.indexOf(propertyValue) === -1) ? callback(true) : callback();
  },

  /**
   * Except
   */
  'except': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (attributeValue.indexOf(propertyValue) !== -1) ? callback(true) : callback();
  },

  /**
   * Minimum
   */
  'minimum': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    if (typeof propertyValue === 'number') {
      var condition = (propertyAttributes.exclusiveMinimum) ? propertyValue > attributeValue : propertyValue >= attributeValue;
      return (condition) ? callback() : callback(true);
    } else {
      return callback(true);
    }
  },

  /**
   * Maximum
   */
  'maximum': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    if (typeof propertyValue === 'number') {
      var condition = (propertyAttributes.exclusiveMaximum) ? propertyValue < attributeValue : propertyValue <= attributeValue;
      return (condition) ? callback() : callback(true);
    } else {
      return callback(true);
    }
  },

  /**
   * Pattern
   */
  'pattern': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (typeof propertyValue === 'string' && !propertyValue.match(attributeValue)) ? callback(true) : callback();
  },

  /**
   * MinItems
   */
  'minItems': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (isArray(propertyValue) && propertyValue.length >= attributeValue) ? callback() : callback(true);
  },

  /**
   * MaxItems
   */
  'maxItems': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (isArray(propertyValue) && propertyValue.length <= attributeValue) ? callback() : callback(true);
  },

  /**
   * UniqueItems
   */
  'uniqueItems': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return each(propertyValue, function(index, value, callback) {
      return (propertyValue.indexOf(value) < index) ? callback(true) : callback();
    }, callback);
  },

  /**
   * DivisibleBy
   */
  'divisibleBy': function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    var isNumber = typeof propertyValue === 'number',
        isDivisible = propertyValue % attributeValue === 0;
    return (isNumber && isDivisible) ? callback() : callback(true);
  }

};