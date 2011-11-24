(function() {

  /**
   * IsObject
   *
   * @param {object} input
   */
  var isObject = function(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
  };

  /**
   * IsArray
   *
   * @param {object} input
   */
  var isArray = function(input) {
    return Object.prototype.toString.call(input) === '[object Array]';
  };

  /**
   * IsEmpty
   *  
   * Returns true if input is empty.
   *
   * @param {object} input
   */
  var isEmpty = function(input) {
    
    // Arrays and strings
    if (isArray(input)) {
      return input.length === 0;
    }

    // Objects
    if (isObject(input)) {
      for (var key in input) {
        if (hasOwnProperty.call(input, key)) {
          return false;
        }
      }
    }

    return true;

  };

  /**
   * Each
   *
   * Applies an iterator function to each item in an array or an object, in series.
   *
   * @param {object} list
   * @param {function} iterator
   * @param {function} callback
   */
  var each = function(list, iterator, callback) {

    /**
     * SyncEach
     *
     * @param {object} list
     * @param {function} iterator
     */
    var syncEach = function(list, iterator) {

      // If the list is an array
      if (isArray(list) && !isEmpty(list)) {
        for (var i = 0, len = list.length; i < len; i++) {
          iterator(i, list[i]);
        }
      }

      // If the list is an object
      if (isObject(list) && !isEmpty(list)) {
        for (var key in list) {
          if (list.hasOwnProperty(key)) {
            iterator(key, list[key]);
          }
        } 
      }

    };

    /**
     * AsyncEach
     * @param {object} list
     * @param {function} iterator
     * @param {function} callback
     */
    var asyncEach = function(list, iterator, callback) {

      var queue = [];

      /**
       * AddToQueue
       *
       * @param {string} key
       * @param {string|object} value
       */
      var addToQueue = function(key, value) {
        var index = queue.length + 1;
        queue.push(function() {

          var next = function(error) {
            var fn = queue[index];
            if (!error && fn) {
              return fn();
            } else if (!error && !fn) {
              return callback();
            } else {
              return callback(error);
            }
          };

          return iterator(key, value, next);

        });
      };

      // If the list is an array
      if (isArray(list) && !isEmpty(list)) {
        for (var i = 0, len = list.length; i < len; i++) {
          addToQueue(i, list[i]);
        }

      // If the list is an object
      } else if (isObject(list) && !isEmpty(list)) {
        for (var key in list) {
          if (list.hasOwnProperty(key)) {
            addToQueue(key, list[key]);
          }
        }

      // If the list is not an array or an object
      } else {
        return callback();
      }

      // And go!
      return queue[0]();

    };

    if (typeof callback === 'undefined') {
      return syncEach.apply(this, arguments);
    } else {
      return asyncEach.apply(this, arguments);
    }

  };

  /**
   * Pluck
   *
   * Extracts a list of property values.
   *
   * @param {object} list
   * @param {string} propertyName
   */
  var pluck = function(list, propertyName) {
    var output = [];
    for (var i = 0, len = list.length; i < len; i++) {
      var property = list[i][propertyName];
      if (output.indexOf(property) === -1) {
        output.push(property);
      }
    }
    return output;
  };

  /**
   * Error
   *
   * @constructor
   */
  var Error = function() {
    this.length = 0;
  };

  Error.prototype.addError = function(error) {
    this[this.length] = error;
    this.length++;
  };

  /**
   * Error.getProperties
   * Error.getMessages
   */
  each({
    getProperties: 'property',
    getMessages: 'message'
  }, function(key, value) {
    Error.prototype[key] = function() {
      return pluck(this, value);
    };    
  });

  /**
   * Validator
   *
   * @constructor
   * @param {object} options
   */
  var Validator = function(options) {

    var self = this;

    // Errors
    this.Errors = new Error();

    // Options
    each([
      'singleError',
      'validators'
    ], function(key, value) {
      self[value] = options[value];
    });

  };

  /**
   * Validator.validateProperty
   *
   * @param {string} property
   * @param {object} propertyValidators
   * @param {string|object} propertyValue
   * @param {boolean} singleError
   * @param {function} callback
   */
  Validator.prototype.validateProperty = function(property, propertyValue, propertyValidators, callback) {

    // Reference na this
    var self = this;

    /**
     * Iterator
     *
     * @param {string} validatorName
     * @param {function} callback
     */
    var iterator = function(validatorName, validatorFn, callback) {
      if (propertyValidators[validatorName]) {
        validatorFn(propertyValue, propertyValidators[validatorName], function(error) {

          if (error) {
            self.Errors.addError({
              property: property,
              propertyValue: propertyValue,
              validator: validatorName,
              validatorValue: propertyValidators[validatorName]
            });
            return (self.singleError) ? callback(true) : callback();
          }

          return callback();

        });
      } else {
        return callback();
      }
    };

    if (propertyValidators.required !== true && typeof propertyValue === 'undefined') {
      return callback();
    } else {
      return each(self.validators, iterator, callback);
    }

  };

  /**
   * Validator.validate
   *
   * @param {object} instance
   * @param {object} schema
   * @param {boolean} singleError
   * @param {function} callback
   */
  Validator.prototype.validate = function(instance, schema, callback) {

    var self = this;

    return this.validateSchema(instance, schema, '', function(error) {
      return callback((self.Errors.length > 0) ? self.Errors : undefined);
    });

  };

  /**
   * Validator.validateSchema
   *
   * @param {object} instance
   * @param {object} schema
   * @param {boolean} singleError
   * @param {function} callback
   */
  Validator.prototype.validateSchema = function(instance, schema, path, callback) {

    var self = this;

    /**
     * {
     *   type: 'object',
     *   properties: {
     *     ... 
     *   }
     * }
     * — or —
     * {
     *   type: 'array',
     *   items: {
     *     ...
     * }
     */
    if (['object', 'array'].indexOf(schema.type) !== -1) {
      return self.validateProperty(path, instance, schema, function(error) {

        // If an error occurred, the validation process can't continue
        if (error) {
          return callback(error);
        }

        /**
         * {
         *   type: 'object',
         *   properties: {
         *     ... 
         *   }
         * }
         */
        if (schema.properties) {
          return each(schema.properties, function(property, propertyValidators, callback) {
            
            var isObject = propertyValidators.type === 'object' && propertyValidators.properties,
                isArray =  propertyValidators.type === 'array';

            // Get the value of property (instance[property])
            var propertyValue = self.getProperty(instance, property);

            // Compose the property path
            var propertyPath = (path.length === 0) ? property : path + '.' + property;

            /**
             * {
             *   type: 'object',
             *   properties: {
             *     user: {
             *       type: 'object',
             *       properties: {
             *         ...
             *       }
             *     }
             *   }
             * }
             */
            if (isObject || isArray)  {
              return self.validateSchema(propertyValue, schema.properties[property], propertyPath, callback);
            } else {
              return self.validateProperty(propertyPath, propertyValue, propertyValidators, callback);
            }

          }, callback);

        /**
         * {
         *   type: 'array',
         *   items: {
         *     type: 'string'
         *     ... 
         *   }
         * }
         */
        } else if (schema.items) {

          /**
           * {
           *   type: 'array',
           *   items: {
           *     type: 'object'
           *   }
           * }
           * — or —
           * {
           *   type: 'array',
           *   items: {
           *     type: 'array'
           *   }
           * }
           */
          if (['object', 'array'].indexOf(schema.items.type) !== -1) {
            if (instance && !isEmpty(instance)) {
              return each(instance, function(index, propertyValue, callback) {
                var propertyPath = path + '[' + index + ']';
                return self.validateSchema(propertyValue, schema.items, propertyPath, callback);
              }, callback);
            } else {
              return callback();
            }

          /*
           * {
           *   type: 'array',
           *   items: {
           *     type: 'string'
           *   }
           * }
           */
          } else {
            if (instance && !isEmpty(instance)) {
              return each(instance, function(index, propertyValue, callback) {
                var propertyPath = path + '[' + index + ']';
                return self.validateProperty(propertyPath, propertyValue, schema.items, callback);
              }, callback);
            } else {
              return callback();
            }
          }

        /**
         * {
         *   type: 'array'
         * }
         * — or —
         * {
         *   type: 'object'
         * }
         */
        } else {
          return callback();
        }

      });

    /**
     * {
     *   type: 'string',
     *   length: ...
     * }
     */
    } else {
      return self.validateProperty(path, instance, schema, callback);
    }

  };

  /**
   * GetProperty
   *
   * @param {object} source
   * @param {string} property
   */
  Validator.prototype.getProperty = function(source, property) {
    if (!source) {
      return undefined;
    } else {
      return source[property];
    }
  };

  /**
   * Validators
   */
  var validators = {
    
    required: function(value, options, callback) {
      if (options && !value) {
        return callback(true);
      } else {
        return callback();
      }
    },

    type: (function() {
      
      var types = {
        'object': function(input) {
          return Object.prototype.toString.call(input) === '[object Object]';
        },
        'array': function(input) {
          return Object.prototype.toString.call(input) === '[object Array]';
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

      return function(value, options, callback) {

        /**
         * {
         *   type: ['string', 'number']
         * }
         */
        if (Object.prototype.toString.call(options) === '[object Array]') {
          var noError = options.some(function(type) {
            return types[type](value);
          });
          return (noError) ? callback() : callback(true);

        /**
         * {
         *   type: 'string'
         * }
         */
        } else {
          return (types[options](value)) ? callback() : callback(true);
        }

      };

    }()),

    /**
     * Format
     */
    format: (function() {

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
        'regexp': function(input) {
          return input && input.test && input.exec;
        },
        'unsignedInt': function(input) {
          return /^[0-9]+$/.test(input);
        }
      };

      return function(value, options, callback) {

        /**
         * {
         *   type: ['string', 'number']
         * }
         */
        if (Object.prototype.toString.call(options) === '[object Array]') {
          var noError = options.some(function(format) {
            return formats[format](value);
          });
          return (noError) ? callback() : callback(true);

        /**
         * {
         *   type: 'string'
         * }
         */
        } else {
          return (formats[options](value)) ? callback() : callback(true);
        }

      };

    }()),

    /**
     * Length
     */
    length: function(value, options, callback) {
    
      // Check the length only if the type of ‘paramValue’ is string
      if (typeof value === 'string') {


        // If the length is specified as an array (for instance ‘[2, 45]’)
        if (Array.isArray(options) && (value.length < options[0] || value.length > options[1])) {
          return callback(true);

        // If the length is specified as a string (for instance ‘2’)
        } else if (typeof options === 'number' && value.length !== options) {
          return callback(true);

        // If the length is specified in a different way
        } else {
          return callback();
        }

      } else {
        return callback(); 
      }

    },

    /**
     * Enum
     */
    enum: function(value, options, callback) {
      return (options.indexOf(value) === -1) ? callback(true) : callback();
    },

    /**
     * Except
     */
    except: function(value, options, callback) {
      return (options.indexOf(value) !== -1) ? callback(true) : callback();
    },

    /**
     * Min
     */
    min: function(value, options, callback) {
      return (typeof value !== 'number' || value < options) ? callback(true) : callback();
    },

    /**
     * Max
     */
    max: function(value, options, callback) {
      return (typeof value !== 'number' || value > options) ? callback(true) : callback();
    },

    /**
     * Pattern
     */
    pattern: function(value, options, callback) {
      return (typeof value === 'string' && !value.match(options)) ? callback(true) : callback();
    }

  };

  /**
   * Amanda
   */
  var amanda = {

    /**
     * Validate
     *
     * @param {object} structure
     */
    validate: function(data, schema, options, callback) {

      if ( typeof options === 'function') {
        callback = options;
        options = {
          singleError: true
        };
      }

      options.validators = validators;

      return (new Validator(options)).validate(data, schema, callback);

    },

    /**
     * AddValidator
     *
     * @param {string} validatorName
     * @param {function} validatorFn
     */
    addValidator: function(validatorName, validatorFn) {
      validators[validatorName] = validatorFn;
    },

    /**
     * GetVersion
     */
    getVersion: function() {
      return [0, 0, 2].join('.');
    },

    /**
     * GetValidators
     */
    getValidators: function() {
      return validators;
    }

  };

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = amanda;
  } else if (typeof define !== 'undefined') {
    define(function() {
      return amanda;
    });
  } else {
    this.amanda = amanda;
  }

}());