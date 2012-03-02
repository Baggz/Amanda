(function() {

  /**
   * IsObject
   *
   * Returns true if the passed-in object is an object.
   *
   * @param {object} input
   */
  var isObject = function(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
  };

  /**
   * IsArray
   *
   * Returns true if the passed-in object is an array.
   *
   * @param {object} input
   */
  var isArray = function(input) {
    return Object.prototype.toString.call(input) === '[object Array]';
  };

  /**
   * IsEmpty
   *
   * Returns true if the passed-in object is empty.
   *
   * @param {object} input
   */
  var isEmpty = function(input) {

    // If the passed-in object is an array or a string
    if (isArray(input) || typeof input === 'string') {
      return input.length === 0;
    }

    // If the passed-in object is an object
    if (isObject(input)) {
      for (var key in input) {
        if (hasOwnProperty.call(input, key)) return false;
      }
    }

    return true;

  };

  /**
   * Merge
   *
   * Copy all of the properties in the source objects over to the destination object.
   *
   * @param {object} obj1
   * @param {object} obj2
   */
  var merge = function(obj1, obj2) {
    for (var key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        obj1[key] = obj2[key];
      }
    }
    return obj1;
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
          iterator.apply(list, [i, list[i]]);
        }
      }

      // If the list is an object
      if (isObject(list) && !isEmpty(list)) {
        for (var key in list) {
          if (list.hasOwnProperty(key)) {
            iterator.apply(list, [key, list[key]]);
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

  /**
   * Error
   *
   * Adds a new error to the ‘Error’ instance.
   *
   * @param {object} error
   */
  Error.prototype.addError = function(error) {
    this[this.length] = error;
    this.length++;
  };

  // Generates the ‘getProperties’ and the ‘getMessages’ method
  each({
    getProperties: 'property',
    getMessages: 'message'
  }, function(key, value) {
    Error.prototype[key] = function() {
      return pluck(this, value);
    };
  });

  /**
   * Messages
   */
  var messages = {

    // Basic
    'required': 'The ‘{{property}}’ property is required.',
    'minLength': 'The ‘{{property}}’ property must be at least {{validator}} characters.',
    'maxLength': 'The ‘{{property}}’ property must not exceed {{validator}} characters.',
    'length': 'The ‘{{property}}’ property must be exactly {{validator}} characters.',
    'format': 'The ‘{{property}}’ property must be a/an {{validator}}.',
    'type': 'The ‘{{property}}’ property must be a/an {{validator}}.',
    'except': 'The ‘{{property}}’ property must not be {{propertyValue}}',
    'minimum': 'The minimum value of the ‘{{property}}’ must be {{validator}}',
    'maximum': 'The maximum value of the ‘{{property}}’ must be {{validator}}',
    'pattern': 'The `{{property}}` does not match the ‘{{validator}}’ pattern.',
    'maxItems': 'The `{{property}}` property must not contain more than {{validator}} items.',
    'minItems': 'The `{{property}}` property must contain at least {{validator}} items.',
    'divisibleBy': 'The ‘{{property}}’ property is not divisible by {{validator}}.',
    'uniqueItems': 'All items in the ‘{{property}}’ property must be unique.',

    // Advanced
    'enum': function(property, propertyValue, validator) {
      return 'Value of the ‘' + property + '’ must be ' + validator.join(' or ') + '.';
    }

  };

  /**
   * Validation
   *
   * @constructor
   * @param {object} options
   */
  var Validation = function(options) {

    // Save a reference to the ‘this’
    var self = this;

    // Options
    this.singleError = options.hasOwnProperty('singleError') ? options.singleError : true;
    this.validators = validators;
    this.messages = (options.messages) ? merge(options.messages, messages) : messages;

    // Initializes a new instance of the ‘Error’ object
    this.Errors = new Error();

  };

  /**
   * RenderErrorMessage
   *
   * @param {string} validatorName
   * @param {object} templateData
   */
  Validation.prototype.renderErrorMessage = function(validatorName, templateData) {

    // Gets an error message
    var errorMessage = this.messages[validatorName];

    // If the error message is a function
    if (typeof errorMessage === 'function') {
      return errorMessage(
        templateData.property,
        templateData.propertyValue,
        templateData.validator
      );
    }

    // If the error message is a string
    if (typeof errorMessage === 'string') {
      each(templateData, function(key, value) {
        errorMessage = errorMessage.replace(new RegExp('{{' + key + '}}', 'g'), value);
      });
      return errorMessage.replace(/\s+/g, ' ');
    }

    return '';

  };

  /**
   * Validation.validateProperty
   *
   * @param {string} property
   * @param {object} propertyValidators
   * @param {string|object} propertyValue
   * @param {boolean} singleError
   * @param {function} callback
   */
  Validation.prototype.validateProperty = function(property, propertyValue, propertyValidators, callback) {

    // Save a reference to the ‘this’
    var self = this;

    /**
     * Iterator
     *
     * @param {string} validatorName
     * @param {function} callback
     */
    var iterator = function(validatorName, validatorFn, callback) {

      /**
       * OnComplete
       *
       * @param {object} error
       */
      var onComplete = function(error) {

        if (!error) return callback();

        // Renders an error messaage
        var errorMessage = self.renderErrorMessage(validatorName, {
          property: property,
          propertyValue: propertyValue,
          validator: propertyValidators[validatorName]
        });

        // Add a new error
        self.Errors.addError({
          property: property,
          propertyValue: propertyValue,
          validator: validatorName,
          validatorValue: propertyValidators[validatorName],
          message: errorMessage
        });

        // If the ‘singleError’ is on, stop the validation process
        return callback(self.singleError ? true : null);

      };

      if (propertyValidators[validatorName]) {
        return validatorFn(
          property,
          propertyValue,
          propertyValidators[validatorName],
          propertyValidators,
          onComplete
        );
      } else {
        return callback();
      }

    };

    // If it's not a required param and it's empty, skip
    if (propertyValidators.required !== true && typeof propertyValue === 'undefined') {
      return callback();
    } else {
      return each(self.validators, iterator, callback);
    }

  };

  /**
   * Validation.validate
   *
   * @param {object} instance
   * @param {object} schema
   * @param {boolean} singleError
   * @param {function} callback
   */
  Validation.prototype.validate = function(instance, schema, callback) {

    // Save a reference to the ‘this’
    var self = this;

    return this.validateSchema(instance, schema, '', function(error) {
      return callback((self.Errors.length > 0) ? self.Errors : undefined);
    });

  };

  /**
   * Validation.validateProperties
   *
   * @param {object} instance
   * @param {object} schema
   * @param {string} path
   * @param {function} callback
   */
  Validation.prototype.validateProperties = function(instance, schema, path, callback) {

    // Save a reference to the ‘this’
    var self = this;

    // Goes
    return each(schema.properties, function(property, propertyValidators, callback) {

      var isObject = propertyValidators.type === 'object' && propertyValidators.properties,
          isArray =  propertyValidators.type === 'array';

      // Get the value of property (instance[property])
      var propertyValue = self.getProperty(instance, property);

      // Compose the property path
      var propertyName = property.indexOf(' ') !== -1 ? '[\'' + property + '\']' : '.' + property,
          propertyPath = path.length === 0 ? property : path + propertyName;

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
      if (instance || property == "required") {
        // only do work if the instance itself exists
        if (isObject || isArray)  {
          return self.validateSchema(
            propertyValue,
            schema.properties[property],
            propertyPath,
            callback
          );
        } else {
          return self.validateProperty(
            propertyPath,
            propertyValue,
            propertyValidators,
            callback
          );
        }

      } else {
        // not required... carry on
        callback();
      }

    }, callback);

  };

  /**
   * Validation.validateItems
   *
   * @param {object} instance
   * @param {object} schema
   * @param {string} path
   * @param {function} callback
   */
  Validation.prototype.validateItems = function(instance, schema, path, callback) {

    // Save a reference to the ‘this’
    var self = this;

    // If the instance is not empty
    if (instance && !isEmpty(instance)) {

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
        return each(instance, function(index, propertyValue, callback) {

          var propertyPath = path + '[' + index + ']';

          return self.validateSchema(
            propertyValue,
            schema.items,
            propertyPath,
            callback
          );

        }, callback);

      /*
       * {
       *   type: 'array',
       *   items: {
       *     type: 'string'
       *   }
       * }
       */
      } else {
        return each(instance, function(index, propertyValue, callback) {

          var propertyPath = path + '[' + index + ']';

          return self.validateProperty(
            propertyPath,
            propertyValue,
            schema.items,
            callback
          );

        }, callback);
      }

    } else {
      return callback();
    }

  };

  /**
   * Validation.validateSchema
   *
   * @param {object} instance
   * @param {object} schema
   * @param {boolean} singleError
   * @param {function} callback
   */
  Validation.prototype.validateSchema = function(instance, schema, path, callback) {

    // Reference na this
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

        /**
         * {
         *   type: 'object',
         *   properties: {
         *     ...
         *   }
         * }
         */
        if (schema.properties) {
          return self.validateProperties(instance, schema, path, callback);

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
          return self.validateItems(instance, schema, path, callback);

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
  Validation.prototype.getProperty = function(source, property) {
    return (!source) ? undefined : source[property];
  };

  /**
   * Validators
   */
  var validators = {

    /**
     * Required
     */
    'required': function(property, propertyValue, validator, propertyValidators, callback) {
      if (validator && propertyValue === undefined) {
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

      return function(property, propertyValue, validator, propertyValidators, callback) {

        /**
         * {
         *   type: ['string', 'number']
         * }
         */
        if (Object.prototype.toString.call(validator) === '[object Array]') {
          var noError = validator.some(function(type) {
            return types[type](propertyValue);
          });
          return (noError) ? callback() : callback(true);

        /**
         * {
         *   type: 'string'
         * }
         */
        } else {
          return (types[validator](propertyValue)) ? callback() : callback(true);
        }

      };

    }()),

    /**
     * Format
     */
    'format': (function() {

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

      return function(property, propertyValue, validator, propertyValidators, callback) {
        return (formats[validator](propertyValue)) ? callback() : callback(true);
      };

    }()),

    /**
     * MinLength
     */
    'minLength': function(property, propertyValue, validator, propertyValidators, callback) {
      return (typeof propertyValue === 'string' && propertyValue.length >= validator) ? callback() : callback(true);
    },

    /**
     * MaxLength
     */
    'maxLength': function(property, propertyValue, validator, propertyValidators, callback) {
      return (typeof propertyValue === 'string' && propertyValue.length <= validator) ? callback() : callback(true);
    },

    /**
     * Length
     */
    'length': function(property, propertyValue, validator, propertyValidators, callback) {
      return (typeof propertyValue === 'string' && propertyValue.length === validator) ? callback() : callback(true);
    },

    /**
     * Enum
     */
    'enum': function(property, propertyValue, validator, propertyValidators, callback) {
      return (validator.indexOf(propertyValue) === -1) ? callback(true) : callback();
    },

    /**
     * Except
     */
    'except': function(property, propertyValue, validator, propertyValidators, callback) {
      return (validator.indexOf(propertyValue) !== -1) ? callback(true) : callback();
    },

    /**
     * Minimum
     */
    'minimum': function(property, propertyValue, validator, propertyValidators, callback) {
      if (typeof propertyValue === 'number') {
        var condition = (propertyValidators.exclusiveMinimum) ? propertyValue > validator : propertyValue >= validator;
        return (condition) ? callback() : callback(true);
      } else {
        return callback(true);
      }
    },

    /**
     * Maximum
     */
    'maximum': function(property, propertyValue, validator, propertyValidators, callback) {
      if (typeof propertyValue === 'number') {
        var condition = (propertyValidators.exclusiveMaximum) ? propertyValue < validator : propertyValue <= validator;
        return (condition) ? callback() : callback(true);
      } else {
        return callback(true);
      }
    },

    /**
     * Pattern
     */
    'pattern': function(property, propertyValue, validator, propertyValidators, callback) {
      return (typeof propertyValue === 'string' && !propertyValue.match(validator)) ? callback(true) : callback();
    },

    /**
     * MinItems
     */
    'minItems': function(property, propertyValue, validator, propertyValidators, callback) {
      return (isArray(propertyValue) && propertyValue.length >= validator) ? callback() : callback(true);
    },

    /**
     * MaxItems
     */
    'maxItems': function(property, propertyValue, validator, propertyValidators, callback) {
      return (isArray(propertyValue) && propertyValue.length <= validator) ? callback() : callback(true);
    },

    /**
     * UniqueItems
     */
    'uniqueItems': function(property, propertyValue, validator, propertyValidators, callback) {
      return each(propertyValue, function(index, value, callback) {
        return (propertyValue.indexOf(value) < index) ? callback(true) : callback();
      }, callback);
    },

    /**
     * DivisibleBy
     */
    'divisibleBy': function(property, propertyValue, validator, propertyValidators, callback) {
      var isNumber = typeof propertyValue === 'number',
          isDivisible = propertyValue % validator === 0;
      return (isNumber && isDivisible) ? callback() : callback(true);
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
    validate: function(instance, schema, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      return (new Validation(options)).validate(instance, schema, callback);
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
      return [0, 3, 0].join('.');
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
