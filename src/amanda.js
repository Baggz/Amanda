(function() {

  /**
   * Error
   *
   */
  var Error = function(paramName, paramValue, validatorName, validatorValue, message) {

    var properties = [
      'paramName', 
      'paramValue',
      'validatorName',
      'validatorValue',
      'message'
    ];

    for (var i = 0, len = arguments.length; i < len; i++) {
      this[properties[i]] = arguments[i];
    }

    return this;

  };

  /**
   * Each
   *
   * @param {object} list
   * @param {function} iterator
   * @param {function} callback
   */
  var each = function(list, iterator, callback) {

    // Fronta jednotlivých požadavků
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
          if ( !error && fn ) {
            return fn();
          } else if ( !error && !fn ) {
            return callback(null);
          } else {
            return callback(error);
          }
        };

        return ( key && value ) ? iterator(key, value, next) : iterator(value, next);

      });
    };

    // If list is an array
    if ( Object.prototype.toString.call(list) === '[object Array]' ) {
      for (var i = 0, len = list.length; i < len; i++) {
        addToQueue(undefined, list[i]);
      }
    }

    // If list is an object
    if ( Object.prototype.toString.call(list) === '[object Object]' ) {
      for (var key in list) {
        if (list.hasOwnProperty(key)) {
          addToQueue(key, list[key]);
        }
      }
    }

    // And goo!
    return queue[0]();

  };

  /**
   * Validators
   *
   * List of validators.
   */
  var validators = {};

  /**
   * ValidatorsList
   *
   * List of validators names, the order is important.
   */
  var validatorsList = [];

  /**
   * ValidateParam
   *
   * @param {string} paramName
   * @param {object} paramValidators
   * @param {string|object} paramValue
   * @param {function} callback
   */
  var validateParam = function(paramName, paramValidators, paramValue, callback) {

    /**
     * Iterator
     *
     * @param {string} validatorName
     * @param {function} callback
     */
    var iterator = function(validatorName, callback) {
      if (paramValidators[validatorName]) {
        var fn = validators[validatorName];  
        fn(paramName, paramValue, paramValidators[validatorName], paramValidators, callback);
      } else {
        return callback(null);
      }
    };

    if (paramValidators.required === false && paramValue === undefined) {
      return callback(null);
    } else {
      return each(validatorsList, iterator, callback);
    }

  };

  /**
   * ValidateSchema
   *
   * @param {object} instance
   * @param {object} schema
   * @param {function} callback
   */
  var validateSchema = function(instance, schema, callback) {

    if (schema.required === false && instance === undefined) {
      return callback(null);
    } else {

      /**
       * {
       *   type: 'object',
       *   properties: {
       *     ... 
       *   }
       * }
       */
      if (schema.type === 'object' && schema.properties) {
        return validateParam(undefined, schema, instance, function(error) {
          if (error) {
            return callback(error);
          } else {
            return each(schema.properties, function(paramName, paramValidators, callback) {
              if ((paramValidators.type === 'object' && paramValidators.properties) || paramValidators.type === 'array' )  {
                return validateSchema(instance[paramName], schema.properties[paramName], callback);
              } else {
                return validateParam(paramName, paramValidators, instance[paramName], callback);
              }
            }, callback);
          }
        });

      /**
       * {
       *   type: 'array',
       *   items: {
       *     type: ...,
       *     length: ...
       *   }
       * }
       */
      } else if (schema.type === 'array') {
        return validateParam(undefined, schema, instance, function(error) {
          if (error) {
            return callback(error);
          } else {
            if ( schema.items ) {
              return each(instance, function(item, callback) {
                return validateParam(undefined, schema.items, item, callback);
              }, callback);
            } else {
              return callback(null);
            }
          }
        });

      /**
       * {
       *   type: 'string',
       *   length: ...
       * }
       */
      } else {
        return validateParam(undefined, schema, instance, callback);
      }

    }

  };

  /**
   * amanda
   *
   */
  var amanda = {

    /**
     * Validate
     *
     * @param {object} structure
     */
    validate: function() {
      return validateSchema.apply(this, arguments);
    },

    /**
     * AddValidator
     *
     * @param {string} validatorName
     * @param {function} validatorFn
     */
    addValidator: function(validatorName, validatorFn) {
      validatorsList.push(validatorName);
      validators[validatorName] = validatorFn;
    }

  };

  /**
   * Type
   */
  amanda.addValidator('type', (function() {

    /**
     * Types
     */
    var types = {
      'array': function(input) {
        return Array.isArray(input);
      },
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
        return types.ipv4(input) || types.ipv6;
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
        return (typeof input === 'string' && input.match(/^-?[0-9]{0,2}(\.[0-9]{1,2})?$|^-?(100)(\.[0]{1,2})?$/));
      },
      'port': function(input) {
        return /\:\d+/.test(input);
      },
      'regexp': function(input) {
        return input && input.test && input.exec;
      },
      'unsignedInt':function(input) {
        return /^[0-9]+$/.test(input);
      }
    };

    // Generate the rest of type checkers
    [
      'string',
      'number',
      'function',
      'object',
      'boolean'
    ].forEach(function(type) {
      types[type] = function() {
        return ( typeof arguments[0] === type ) ? true : false;
      };
    });

    return function(paramName, paramValue, validator, validators, callback) {
      if ( !types[validator](paramValue) ) {
        return callback(new Error(
          paramName,
          paramValue,
          'type',
          validator,
          null
        ));
      } else {
        return callback(null);
      }
    };

  }()));

  /**
   * Length
   */
  amanda.addValidator('length', function(paramName, paramValue, validator, validators, callback) {

    // Validátor spustíme jen pokud se jedná string, jinak přeskočíme
    if (typeof paramValue === 'string') {

      // Pokud je validátor zapsán ve tvaru “[2, 45]”
      if (Array.isArray(validator) && (paramValue.length < validator[0] || paramValue.length > validator[1])) {
        return callback(new Error(
          paramName,
          paramValue,
          'length',
          validator,
          null
        ));
      }

      // Pokud je validátor zapsán ve tvaru “12”
      if (typeof validator === 'number' && paramValue.length !== validator) {
        return callback(new Error(
          paramName,
          paramValue,
          'length',
          validator,
          null
        ));
      }

      // Vše je v pořádku, jedeme dál
      return callback(null);

    }

    // Vše je v pořádku, jedeme dál
    return callback(null);

  });

  /**
   * Values
   */
  amanda.addValidator('values', function(paramName, paramValue, validator, validators, callback) {

    // Pokud hodnota parametru neodpovídá výčtu
    if (validator.indexOf( paramValue ) === -1) {
      return callback(new Error(
        paramName,
        paramValue,
        'values',
        validator,
        null
      ));
    }

    // Vše je v pořádku, jedeme dál
    return callback(null);

  });

  /**
   * Except
   */
  amanda.addValidator('except', function(paramName, paramValue, validator, validators, callback) {
    
    // Pokud hodnota parametru odpovídá výčtu nepovolených hodnot
    if (validator.indexOf( paramValue ) !== -1) {
      return callback(new Error(
        paramName,
        paramValue,
        'except',
        validator,
        null
      ));
    }

    // Vše je v pořádku, jedeme dál
    return callback(null);

  });

  /**
   * Min
   */
  amanda.addValidator('min', function(paramName, paramValue, validator, validators, callback) {
    if (typeof paramValue === 'number' && paramValue < validator) {
      return callback(new Error(
        paramName,
        paramValue,
        'min',
        validator,
        null
      ));
    } else {
      return callback(null);
    }
  });

  /**
   * Max
   */
  amanda.addValidator('max', function(paramName, paramValue, validator, validators, callback) {
    if (typeof paramValue === 'number' && paramValue > validator) {
      return callback(new Error(
        paramName,
        paramValue,
        'max',
        validator,
        null
      ));
    } else {
      return callback(null);
    }
  });

  /**
   * Pattern
   */
  amanda.addValidator('pattern', function(paramName, paramValue, validator, validators, callback) {
    if (typeof paramValue === 'string' && !paramValue.match(validator)) {
      return callback(new Error(
        paramName,
        paramValue,
        'pattern',
        validator,
        null
      ));
    } else {
      return callback(null); 
    }
  });

  // Export
  if ( typeof module !== 'undefined' && module.exports ) {
    module.exports = amanda;
  } else if ( typeof define !== 'undefined' ) {
    define(function() {
      return amanda;
    });
  } else {
    this.amanda = amanda;
  }

}());