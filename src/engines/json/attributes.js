/**
 * Attributes
 * --------------------
 */
Validation.prototype.attributes = {

  /**
   * Required
   */
  required: function requiredConstructor() {

    return function required(property, propertyValue, attributeValue, propertyAttributes, callback) {
      if (attributeValue && propertyValue === undefined) {
        return callback(true);
      } else {
        return callback();
      }
    };

  },

  /**
   * Type
   */
  type: function typeConstructor() {
    
    var types = {
      'string': isString,
      'number': isNumber,
      'function': isFunction,
      'boolean': isBoolean,
      'object': isObject,
      'array': isArray,
      'integer': isInteger,
      'int': isInteger,
      'null': isNull,
      'any': returnTrue
    };

    return function type(property, propertyValue, attributeValue, propertyAttributes, callback) {

      /**
       * {
       *   type: ['string', 'number']
       * }
       */
      if (isArray(attributeValue)) {

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
        if (!hasProperty(type, attributeValue)) {
          return callback('Type ‘' + type + '’ is not supported.');
        }
        return types[attributeValue](propertyValue) ? callback() : callback(true);
      }

    };

  },

  /**
   * Format
   */
  format: function formatConstructor() {

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

  },

  /**
   * MinLength
   */
  minLength: function minLengthConstructor() {
    return function minLength(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (typeof propertyValue === 'string' && propertyValue.length >= attributeValue) ? callback() : callback(true);
    };
  },

  /**
   * MaxLength
   */
  maxLength: function maxLengthConstructor() {
    return function maxLength(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (typeof propertyValue === 'string' && propertyValue.length <= attributeValue) ? callback() : callback(true);
    };
  },

  /**
   * Length
   */
  length: function lengthConstructor() {
    return function length(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (typeof propertyValue === 'string' && propertyValue.length === attributeValue) ? callback() : callback(true);
    };
  },

  /**
   * Enum
   */
  enum: function enumConstructor() {
    return function enum(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (attributeValue.indexOf(propertyValue) === -1) ? callback(true) : callback();
    };
  },

  /**
   * Except
   */
  except: function exceptConstructor() {
    return function except(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (attributeValue.indexOf(propertyValue) !== -1) ? callback(true) : callback();
    };
  },

  /**
   * Minimum
   */
  minimum: function minimumConstructor() {
    return function minimum(property, propertyValue, attributeValue, propertyAttributes, callback) {
      if (typeof propertyValue === 'number') {
        var condition = (propertyAttributes.exclusiveMinimum) ? propertyValue > attributeValue : propertyValue >= attributeValue;
        return (condition) ? callback() : callback(true);
      } else {
        return callback(true);
      }
    };
  },

  /**
   * Maximum
   */
  maximum: function maximumConstructor() {
    return function maximum(property, propertyValue, attributeValue, propertyAttributes, callback) {
      if (typeof propertyValue === 'number') {
        var condition = (propertyAttributes.exclusiveMaximum) ? propertyValue < attributeValue : propertyValue <= attributeValue;
        return (condition) ? callback() : callback(true);
      } else {
        return callback(true);
      }
    };
  },

  /**
   * Pattern
   */
  pattern: function patternConstructor() {
    return function pattern(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (typeof propertyValue === 'string' && !propertyValue.match(attributeValue)) ? callback(true) : callback();
    };
  },

  /**
   * MinItems
   */
  minItems: function minItemsConstructor() {
    return function minItems(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (isArray(propertyValue) && propertyValue.length >= attributeValue) ? callback() : callback(true);
    };
  },

  /**
   * MaxItems
   */
  maxItems: function maxItemsConstructor() {
    return function maxItems(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return (isArray(propertyValue) && propertyValue.length <= attributeValue) ? callback() : callback(true);
    };
  },

  /**
   * UniqueItems
   */
  uniqueItems: function uniqueItemsConstructor() {
    return function uniqueItems(property, propertyValue, attributeValue, propertyAttributes, callback) {
      return each(propertyValue, function(index, value, callback) {
        return (propertyValue.indexOf(value) < index) ? callback(true) : callback();
      }, callback);
    };
  },

  /**
   * DivisibleBy
   */
  divisibleBy: function divisibleByConstructor() {
    return function divisibleBy(property, propertyValue, attributeValue, propertyAttributes, callback) {
      if (isNumber(propertyValue) && (propertyValue % attributeValue === 0)) {
        return callback();
      } else {
        return callback(true);
      }
    };
  }

};

