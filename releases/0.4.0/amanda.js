(function () {

  /**
   * Engines
   * --------------------
   */
  var engines = {};

  /**
   * DetectType
   *
   * @param {object} input
   */
  var detectType = function (input) {
      return typeof input;
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
  var each = function (list, iterator, callback) {

      /**
       * SyncEach
       *
       * @param {object} list
       * @param {function} iterator
       */
      var syncEach = function (list, iterator) {

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
      var asyncEach = function (list, iterator, callback) {

          var queue = [];

          /**
           * AddToQueue
           *
           * @param {string} key
           * @param {string|object} value
           */
          var addToQueue = function (key, value) {
              var index = queue.length + 1;
              queue.push(function () {

                var next = function (error) {
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
   * Every
   *
   * @param {object} arr
   * @param {function} iterator
   */
  var every = function (arr, iterator) {
      return Array.prototype.every.apply(arr, [iterator]);
    };

  /**
   * Filter
   *
   * @param {object} arr
   * @param {function} iterator
   */
  var filter = function (arr, iterator, context) {
      return Array.prototype.filter.apply(arr, [iterator, context || this]);
    };

  /**
   * HasProperty
   *
   * @param {object} input
   */
  var hasProperty = function (obj, property) {
      return Object.prototype.hasOwnProperty.apply(obj, [property]);
    };

  /**
   * IsArray
   *
   * Returns true if the passed-in object is an array.
   *
   * @param {object} input
   */
  var isArray = function (input) {
      return Object.prototype.toString.call(input) === '[object Array]';
    };

  /**
   * IsBoolean
   *
   * @param {object} input
   */
  var isBoolean = function (input) {
      return typeof input === 'boolean';
    };

  /**
   * IsDefined
   *
   * @param {object} input
   */
  var isDefined = function (input) {
      return typeof input !== 'undefined';
    };

  /**
   * IsEmpty
   *  
   * Returns true if the passed-in object is empty.
   *
   * @param {object} input
   */
  var isEmpty = function (input) {

      if (isNumber(input)) {
        return false;
      }

      if (input === null) {
        return true;
      }

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
   * IsEqual
   *
   * @param {object} obj1
   * @param {object} obj2
   */
  var isEqual = function (obj1, obj2) {

      /**
       * Arrays
       */
      if (isArray(obj1, obj2)) {

        if (obj1.length !== obj2.length) {
          return false;
        }

        return every(obj1, function (value, index, context) {
          return obj2[index] === value;
        });

      }

      /**
       * Objects
       */
      if (isObject(obj1, obj2)) {

        var keys1 = keys(obj1),
          keys2 = keys(obj2);

        if (!isEqual(keys1, keys2)) {
          return false;
        }

        for (key in obj1) {
          if (!obj2[key] || obj1[key] !== obj2[key]) {
            return false;
          }
        }

        return true;

      }

      return false;

    };

  /**
   * IsFunction
   *
   * @param {object} input
   */
  var isFunction = function (input) {
      return typeof input === 'function';
    };

  /**
   * IsInteger
   *
   * @param {object} input
   */
  var isInteger = function (input) {
      return isNumber(input) && input % 1 === 0;
    };

  /**
   * IsNull
   *
   * @param {object} input
   */
  var isNull = function (input) {
      return input === null;
    };

  /**
   * IsNumber
   *
   * @param {object} input
   */
  var isNumber = function (input) {
      return typeof input === 'number';
    };

  /**
   * IsObject
   *
   * Returns true if the passed-in object is an object.
   *
   * @param {object} input
   */
  var isObject = function (input) {
      return Object.prototype.toString.call(input) === '[object Object]';
    };

  /**
   * IsString
   *
   * @param {object} input
   */
  var isString = function (input) {
      return typeof input === 'string';
    };

  /**
   * IsUndefined
   *
   * @param {object} input
   */
  var isUndefined = function (input) {
      return typeof input === 'undefined';
    };

  /**
   * Keys
   *
   * @param {object} obj
   */
  var keys = function (obj) {
      return Object.keys(obj);
    };

  /**
   * Merge
   *
   * Copy all of the properties in the source objects over to the destination object.
   *
   * @param {object} obj1
   * @param {object} obj2
   */
  var merge = function (obj1, obj2) {
      for (var key in obj2) {
        if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
          obj1[key] = obj2[key];
        }
      }
      return obj1;
    };

  /**
   * Pluck
   *
   * Extracts a list of property values.
   *
   * @param {object} list
   * @param {string} propertyName
   */
  var pluck = function (list, propertyName) {
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
   * ReturnTrue
   */
  var returnTrue = function () {
      return true;
    };

  /**
   * Some
   *
   * @param {object} arr
   * @param {function} iterator
   */
  var some = function (arr, iterator) {
      return Array.prototype.some.apply(arr, [iterator]);
    };

  (function () {

    /**
     * Validation
     *
     * @constructor
     * @param {object} options
     */
    var Validation = function (options) {

        // Save a reference to the ‘this’
        var self = this;

        var defaultOptions = {
          singleError: true,
          errorMessages: errorMessages,
          cache: false
        };

        each(defaultOptions, function (key, value) {

          if (isObject(value) && options[key]) {
            self[key] = merge(options[key], defaultOptions[key]);

          } else if (isObject(value) && !options[key]) {
            self[key] = merge({}, defaultOptions[key]);

          } else {
            self[key] = (isDefined(options[key])) ? options[key] : defaultOptions[key];
          }

        });

        this.errors = new ValidationError(this);

      };

    /**
     * Attributes
     * --------------------
     */
    Validation.prototype.attributes = {};

    /**
     * AddAttribute
     *
     * @param {string} attributeName
     * @param {function} attributeFn
     */
    Validation.prototype.addAttribute = function (attributeName, attributeFn) {
      return Validation.prototype.attributes[attributeName] = attributeFn;
    };

    /**
     * AddAttributeConstructor
     *
     * @param {string} attributeName
     * @param {function} attributeConstructor
     */
    Validation.prototype.addAttributeConstructor = function (attributeName, attributeConstructor) {
      return Validation.prototype.attributes[attributeName] = attributeConstructor();
    };

    /**
     * AdditionalProperties
     */
    var additionalPropertiesAttribute = function additionalProperties(property, propertyValue, attributeValue, propertyAttributes, callback) {

        var self = this;

        /**
         * {
         *   additionalProperties: true,
         *   ...
         * }
         */
        if (attributeValue === true) {
          return callback();
        }

        // Filter the forbidden properties
        var propertyKeys = keys(propertyValue);
        var forbiddenProperties = filter(propertyKeys, function (key) {
          return !propertyAttributes.properties[key];
        });

        if (isEmpty(forbiddenProperties)) {
          return callback();
        }

        /**
         * {
         *   additionalProperties: false,
         *   ...
         * }
         */
        if (attributeValue === false) {

          forbiddenProperties.forEach(function (forbiddenProperty) {
            this.addError({
              property: this.joinPath(property, forbiddenProperty),
              propertyValue: propertyValue[forbiddenProperty]
            });
          }, this);

          return callback();

        }

        /**
         * {
         *   additionalProperties: {
         *     type: 'string',
         *     ...
         *   },
         *   ...
         * }
         */
        if (isObject(attributeValue)) {
          return each(forbiddenProperties, function (index, key, callback) {
            return self.validateSchema(
            propertyValue[key], attributeValue, property + key, callback);
          }, callback);
        }

      };

    // Export
    Validation.prototype.addAttribute('additionalProperties', additionalPropertiesAttribute);

    /**
     * DivisibleBy
     */
    var divisibleByAttribute = function divisibleBy(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (attributeValue === 0) {
          throw new Error('The value of this attribute should not be 0.');
        }

        if (isNumber(propertyValue) && (propertyValue % attributeValue !== 0)) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('divisibleBy', divisibleByAttribute);

    /**
     * Enum
     */
    var enumAttribute = function (property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (attributeValue.indexOf(propertyValue) === -1) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('enum', enumAttribute);

    /**
     * Except
     */
    var exceptAttribute = function except(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (attributeValue.indexOf(propertyValue) !== -1) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('except', exceptAttribute);

    /**
     * Format
     */
    Validation.prototype.addAttributeConstructor('format', function formatConstructor() {

      // Uložíme si referenci na this
      var self = this;

      /**
       * Formats
       */
      var formats = {

        /**
         * date-time
         *
         * This should be a date in ISO 8601 format of YYYY-MM-DDThh:mm:ssZ in UTC
         * time. This is the recommended form of date/timestamp.
         */
        'date-time': {
          type: 'string',
          pattern: /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        },

        /**
         * date
         *
         * This should be a date in the format of YYYY-MM-DD. It is recommended that you
         * use the "date-time" format instead of "date" unless you need to transfer only the date part.
         */
        date: function (input) {
          if (isString(input)) {
            return input.match(/^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}$/);
          }
          if (isObject(input)) {
            return Object.prototype.toString.call(input) === '[object Date]';
          }
          return false;
        },

        /**
         * time
         *
         * This should be a time in the format of hh:mm:ss.
         */
        'time': {
          type: 'string',
          pattern: /^\d{2}:\d{2}:\d{2}$/
        },

        /**
         * utc-milisec
         *
         * This should be the difference, measured in milliseconds, between the specified
         * time and midnight, 00:00 of January 1, 1970 UTC.  The value
         * should be a number (integer or float).
         */
        'utc-milisec': {
          type: 'number'
        },

        /**
         * regex
         *
         * This should be a time in the format of hh:mm:ss.
         */
        regex: function (input) {
          return input && input.test && input.exec;
        },

        /**
         * color
         *
         * This is a CSS color (like "#FF0000" or "red"), based on CSS 2.1.
         */
        'color': {
          type: 'string'
        },

        /**
         * style
         *
         * This is a CSS style definition (like "color: red; background-color:#FFF"), based on CSS 2.1.
         */
        'style': {
          type: 'string'
        },

        /**
         * phone
         *
         * This should be a phone number.
         */
        'phone': {
          type: 'number'
        },

        /**
         * uri
         *
         * This value should be a URI.
         */
        'uri': {
          type: 'string',
          pattern: /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|cat|coop|int|pro|tel|xxx|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2})?)|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/
        },

        /**
         * email
         *
         * This should be an email address.
         */
        'email': {
          type: 'string',
          pattern: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
        },

        /**
         * ip-address
         *
         * This should be an ip version 4 address.
         */
        'ip-address': {
          type: 'string',
          pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        },

        /**
         * ipv6
         *
         * This should be an ip version 6 address.
         */
        'ipv6': {
          type: 'string',
          pattern: /(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(?:(?:[a-f\d]{1,4}:)*[a-f\d]{1,4})?::(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))?)/
        },

        /**
         * host-name
         *
         * This should be a host-name.
         */
        'host-name': {
          type: 'string'
        }

      };

      /**
       * CustomFormats
       * --------------------
       */
      formats.alpha = {
        required: true,
        type: 'string',
        pattern: /^[a-zA-Z]+$/
      };

      formats.alphanumeric = {
        required: true,
        type: ['string', 'number'],
        pattern: /^[a-zA-Z0-9]+$/
      };

      formats.decimal = function (input) {
        if (!isNumber(input)) return false;
        return (input + '').match(/^[0-9]+(\.[0-9]{1,2})?$/);
      };

      formats.percentage = {
        required: true,
        type: ['string', 'number'],
        pattern: /^-?[0-9]{0,2}(\.[0-9]{1,2})?$|^-?(100)(\.[0]{1,2})?$/,
        minimum: -100,
        maximum: 100
      };

      formats.port = {
        required: true,
        type: ['string', 'number'],
        pattern: /\:\d+/
      };

      /**
       * Aliases
       * --------------------
       */
      var aliases = {
        url: 'uri',
        ip: 'ip-address',
        ipv4: 'ip-address',
        host: 'host-name',
        hostName: 'host-name'
      };

      // Apply aliases
      each(aliases, function (alias, format) {
        formats[alias] = formats[format];
      });

      // Export
      return function format(property, propertyValue, attributeValue, propertyAttributes, callback) {

        /**
         * {
         *   format: {
         *     type: 'string',
         *     pattern: /abc/
         *     ... 
         *   }
         *   ...
         * }
         */
        if (isObject(attributeValue)) {
          return this.validateProperty(property, propertyValue, attributeValue, callback);
        }

        /**
         * {
         *   format: 'lorem ipsum dolor',
         *   ...
         * }
         */
        if (isString(attributeValue) && !hasProperty(formats, attributeValue))  {
          throw new Error('The format ‘' + attributeValue + '’ is not supported.');
        }

        /**
         * {
         *   format: 'phone',
         *   ...
         * }
         */
        if (isString(attributeValue)) {

          var fn = formats[attributeValue];

          if (isFunction(fn)) {
            var noError = fn(propertyValue);
            if (!noError) {
              this.addError();
            }
            return callback();
          }

          if (isObject(fn)) {
            return this.validateProperty(property, propertyValue, fn, callback);
          }

        }

      };

    });

    /**
     * Length
     */
    var lengthAttribute = function length(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (isString(propertyValue) && propertyValue.length !== attributeValue) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('length', lengthAttribute);

    /**
     * Maximum
     */
    var maximumAttribute = function maximum(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (isNumber(propertyValue)) {
          if ((propertyAttributes.exclusiveMaximum && propertyValue >= attributeValue) || (propertyValue > attributeValue)) {
            this.addError();
          }
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('maximum', maximumAttribute);

    /**
     * MaxItems
     */
    var maxItemsAttribute = function maxItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (isArray(propertyValue) && propertyValue.length > attributeValue) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('maxItems', maxItemsAttribute);

    /**
     * MaxLength
     */
    var maxLengthAttribute = function maxLength(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (isString(propertyValue) && propertyValue.length > attributeValue) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('maxLength', maxLengthAttribute);

    /**
     * Minimum
     */
    var minimumAttribute = function minimum(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (isNumber(propertyValue)) {
          if ((propertyAttributes.exclusiveMinimum && propertyValue <= attributeValue) || (propertyValue < attributeValue)) {
            this.addError();
          }
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('minimum', minimumAttribute);


    /**
     * MinItems
     */
    var minItems = function minItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (isArray(propertyValue) && propertyValue.length < attributeValue) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('minItems', minItems);

    /**
     * MinLength
     */
    var minLengthAttribute = function minLength(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (isString(propertyValue) && propertyValue.length < attributeValue) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('minLength', minLengthAttribute);

    /**
     * Pattern
     */
    var patternAttribute = function pattern(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (isString(propertyValue) && !propertyValue.match(attributeValue)) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('pattern', patternAttribute);

    (function () {

      /**
       * PatternProperties
       */
      var attribute = function patternProperties(property, propertyValue, attributeValue, propertyAttributes, callback) {

          // Saves a reference to ‘this’
          var self = this;

          // Skip
          if (isEmpty(attributeValue)) {
            return callback();
          }

          var matches = {};
          var patterns = keys(attributeValue);

          each(propertyValue, function (key, value) {

            each(patterns, function (index, pattern) {
              if (key.match(new RegExp(pattern))) {
                matches[key] = attributeValue[pattern];
              }
            });

          });

          if (isEmpty(matches)) {
            return callback();
          }

          each(matches, function (propertyName, propertySchema, callback) {
            return self.validateSchema(
            propertyValue[propertyName], propertySchema, self.joinPath(property, propertyName), callback);
          }, callback);

        };

      // Export
      Validation.prototype.addAttribute('patternProperties', attribute);

    }());

    /**
     * Required
     */
    var requiredAttribute = function required(property, propertyValue, attributeValue, propertyAttributes, callback) {

        if (attributeValue && (isUndefined(propertyValue) || isEmpty(propertyValue))) {
          this.addError();
        }

        return callback();

      };

    // Export
    Validation.prototype.addAttribute('required', requiredAttribute);

    /**
     * Type
     */
    var typeConstructor = function typeConstructor() {

        /**
         * Types
         */
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

        // Export
        return function type(property, propertyValue, attributeValue, propertyAttributes, callback) {

          /**
           * {
           *   type: ['string', 'number']
           * }
           */
          if (isArray(attributeValue)) {

            var noError = attributeValue.some(function (type) {

              if (!hasProperty(types, type)) {
                throw new Error('Type ‘' + attributeValue + '’ is not supported.');
              }

              return types[type](propertyValue);

            });

            if (!noError) {
              this.errors.addError();
            }

            return callback();

            /**
             * {
             *   type: 'string'
             * }
             */
          } else {

            if (!hasProperty(types, attributeValue)) {
              throw new Error('Type ‘' + attributeValue + '’ is not supported.');
            }

            if (!types[attributeValue](propertyValue)) {
              this.addError();
            }

            return callback();

          }

        };

      };

    // Export
    Validation.prototype.addAttributeConstructor('type', typeConstructor);

    (function () {

      /**
       * UniqueItems
       */
      var attribute = function uniqueItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

          var self = this;

          each(propertyValue, function (index, value) {

            if (isString(value)) {
              if ((propertyValue.indexOf(value) < index)) {
                self.addError();
              }
            }

            if (isObject(value) || isArray(value)) {
              propertyValue.forEach(function (subValue, subIndex) {

                if (subIndex !== index) {
                  if (isEqual(value, subValue))  {
                    self.addError({
                      property: self.joinPath(property, subIndex)
                    });
                  }
                }

              });
            }

          });

          return callback();

        };

      // Export
      Validation.prototype.addAttribute('uniqueItems', attribute);

    }());

    /**
     * Error
     *
     * @constructor
     */
    var ValidationError = function (parent) {

        this.length = 0;

        this.errorMessages = parent.errorMessages;

      };

    ValidationError.prototype.renderErrorMessage = function (error) {

      var errorMessage = this.errorMessages[error.attributeName];

      if (errorMessage && isFunction(errorMessage)) {
        return errorMessage(
        error.property, error.propertyValue, error.attributeValue);
      }

      if (errorMessage && isString(errorMessage)) {

        [
          'property',
          'propertyValue',
          'attributeValue'
          ].forEach(function (placeholder) {
          errorMessage = errorMessage.replace(new RegExp('{{' + placeholder + '}}', 'g'), error[placeholder]);
        });

        // Deprecated
        errorMessage = errorMessage.replace(/{{validator}}/g, error['attributeValue']);

        return errorMessage.replace(/\s+/g, ' ');

      }

      return error.message;

    };

    ValidationError.prototype.push = function (error) {

      this[this.length] = {

        property: error.property,
        propertyValue: error.propertyValue,
        attributeName: error.attributeName,
        attributeValue: error.attributeValue,
        message: this.renderErrorMessage(error),

        // Deprecated
        validator: error.attributeName,
        validatorName: error.attributeName,
        validatorValue: error.attributeValue

      };

      this.length += 1;

    };

    /**
     * GetProperties
     */
    ValidationError.prototype.getProperties = function () {
      return pluck(this, 'property');
    };

    /**
     * GetMessages
     */
    ValidationError.prototype.getMessages = function () {
      return pluck(this, 'message');
    };

    /**
     * Messages
     * --------------------
     */
    var errorMessages = {

      /**
       * Maximum
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      required: function (property, propertyValue, attributeValue) {
        return 'The ‘' + property + '’ property is required.';
      },

      /**
       * MinLength
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      minLength: function (property, propertyValue, attributeValue) {
        return ['The ' + property + ' property must be at least ' + attributeValue + ' characters.', 'The length of the property is ' + propertyValue.length + '.'].join(' ');
      },

      /**
       * MaxLength
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      maxLength: function (property, propertyValue, attributeValue) {
        return ['The ' + property + ' property must not exceed ' + attributeValue + ' characters.', 'The length of the property is ' + propertyValue.length + '.'].join(' ');
      },

      /**
       * MaxLength
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      length: function (property, propertyValue, attributeValue) {
        return ['The ' + property + ' property must be exactly ' + attributeValue + ' characters.', 'The length of the property is ' + propertyValue.length + '.'].join(' ');
      },

      /**
       * Format
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      format: function (property, propertyValue, attributeValue) {
        return ['The ‘' + property + '’ property must be a/an ‘' + attributeValue + '’.', 'The current value of the property is ‘' + propertyValue + '’'].join(' ');
      },

      /**
       * Type
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      type: function (property, propertyValue, attributeValue) {
        return ['The ‘' + property + '’ property must be a/an ‘' + attributeValue + '’.', 'The type of the property is ‘' + detectType(propertyValue) + '’'].join(' ');
      },

      /**
       * Except
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      except: function (property, propertyValue, attributeValue) {
        return;
      },

      /**
       * Minimum
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      minimum: function (property, propertyValue, attributeValue) {
        return ['The minimum value of the ‘' + property + '’ must be ' + attributeValue + '.', 'The current value of the property is ‘' + propertyValue + '’'].join(' ');
      },

      /**
       * Maximum
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      maximum: function (property, propertyValue, attributeValue) {
        return ['The maximum value of the ‘' + property + '’ must be ' + attributeValue + '.', 'The current value of the property is ‘' + propertyValue + '’.'].join(' ');
      },

      /**
       * Maximum
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      pattern: function (property, propertyValue, attributeValue) {
        return 'The ‘' + property + '’ does not match the ‘' + attributeValue + '’ pattern.';
      },

      /**
       * MaxItems
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      maxItems: function (property, propertyValue, attributeValue) {
        return ['The ‘' + property + '’ property must not contain more than ‘' + attributeValue + '’ items.', 'Currently it contains ‘' + propertyValue.items + '’ items.'].join(' ');
      },

      /**
       * MinItems
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      minItems: function (property, propertyValue, attributeValue) {
        return ['The ‘' + property + '’ property must contain at least ‘' + attributeValue + '’ items.', 'Currently it contains ‘' + propertyValue.items + '’ items.'].join(' ');
      },

      /**
       * Maximum
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      divisibleBy: function (property, propertyValue, attributeValue) {
        return 'The ‘' + property + '’ is not divisible by ‘' + attributeValue + '’.';
      },

      /**
       * Maximum
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      uniqueItems: function (property, propertyValue, attributeValue) {
        return 'All items in the ‘' + property + '’ property must be unique.';
      },

      /**
       * Enum
       *
       * @param {string} property
       * @param {any} propertyValue
       * @param {string} attributeValue
       */
      'enum': function (property, propertyValue, attributeValue) {
        return 'Value of the ‘' + property + '’ must be ' + attributeValue.join(' or ') + '.';
      }

    };

    /**
     * GetProperty
     *
     * @param {string} property 
     * @param {object} source
     */
    Validation.prototype.getProperty = function (property, source) {
      var tree = property.match(/([a-zA-Z0-9\s]+)/g);
      return tree.reduce(function (previousValue, currentValue, index) {
        return (previousValue && previousValue[currentValue]) ? previousValue[currentValue] : undefined;
      }, source);
    };

    /**
     * JoinPath
     *
     * @param {string} path 
     * @param {string} property
     */
    Validation.prototype.joinPath = function (path, property) {

      // If the ‘path’ is undefined (object), convert the path to a string
      path = path || '';

      // Converts the ‘property’ to a string
      property = property + '';

      if (property.match(/^[a-zA-Z]+$/)) {
        return (path) ? (path + '.' + property) : property;
      } else if (property.match(/\d+/)) {
        return path + '[' + property + ']';
      } else {
        return path + '["' + property + '"]';
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
    Validation.prototype.validate = function (instance, schema, callback) {

      // Save a reference to the ‘this’
      var self = this;

      this.instance = instance;
      this.schema = schema;

      /**
       * Basic Types
       */
      var basicTypes = [
        'string',
        'number',
        'function',
        'boolean',
        'integer',
        'int',
        'null'
        ];

      /**
       * Object Types
       */
      var objectTypes = [
        'object',
        'array'
        ];

      /**
       * CallbackProxy
       */
      var callbackProxy = function () {
          if (self.errors.length !== 0) {
            return callback(self.errors);
          } else {
            return callback();
          }
        };

      /**
       * {
       *   type: 'string',
       *   ...
       * }
       */
      if (basicTypes.indexOf(schema.type) !== -1) {
        return this.validateProperty(undefined, instance, schema, callbackProxy);
      }

      /**
       * {
       *   type: 'object',
       *   ...
       * }
       */
      if (objectTypes.indexOf(schema.type) !== -1) {

        if (isString(instance)) {
          try {
            instance = JSON.parse(instance);
          } catch (parseError) {

          }
        }

        return this.validateSchema(instance, schema, '', callbackProxy);

      }

      /**
       * {
       *   type: ???,
       *   ...
       * }
       */
      if (schema.type === 'any' || !schema.type) {

        if (isString(instance)) {
          try {
            instance = JSON.parse(instance);
            return this.validateSchema(instance, schema, '', callbackProxy);
          } catch (parseError2) {

          }
        }

        if (isObject(instance) || isArray(instance)) {
          return this.validateSchema(instance, schema, '', callbackProxy);
        }

        return this.validateProperty(undefined, instance, schema, callbackProxy);

      }

    };

    /**
     * Validation.validateItems
     *
     * @param {object} instance
     * @param {object} schema
     * @param {string} path
     * @param {function} callback
     */
    Validation.prototype.validateItems = function (instance, schema, path, callback) {

      // Save a reference to the ‘this’
      var self = this;

      /**
       * {
       *   type: 'array'
       *   items: [
       *     {
       *       type: 'string'
       *     },
       *     {
       *       type: 'number'
       *     },
       *     ...
       *   ],
       *   ...
       * }
       */
      if (isArray(schema.items)) {

        // Additional items are allowed
        if (isUndefined(schema.additionalItems) || schema.additionalItems === true) {
          return each(schema.items, function (itemIndex, itemSchema, callback) {
            return self.validateSchema(
            instance[itemIndex], itemSchema, self.joinPath(path, itemIndex), callback);
          }, callback);
        }

        return each(instance, function (itemIndex, itemValue, callback) {

          // The ‘additionalItems’ attribute is a schema that defines
          // the schema of the additional items
          if (schema.items[itemIndex] || isObject(schema.additionalItems)) {
            return self.validateSchema(
            itemValue, schema.items[itemIndex], self.joinPath(path, itemIndex), callback);
          }

          // Additional items are disallowed
          if (schema.additionalItems === false) {
            self.errors.push({
              property: self.joinPath(path, itemIndex),
              propertyValue: itemValue,
              attributeName: 'additionalItems',
              attributeValue: false
            });
            return callback();
          }

        }, callback);

      }

      /**
       * {
       *   type: 'array'
       *   items: {
       *     type: 'string'
       *   },
       *   ...
       * }
       */
      if (isObject(schema.items) && instance && !isEmpty(instance)) {
        return each(instance, function (itemIndex, itemValue, callback) {
          return self.validateSchema(
          instance[itemIndex], schema.items, self.joinPath(path, itemIndex), callback);
        }, callback);
      } else {
        return callback();
      }

    };

    /**
     * Validation.validateProperties
     *
     * @param {object} instance
     * @param {object} schema
     * @param {string} path
     * @param {function} callback
     */
    Validation.prototype.validateProperties = function (instance, schema, path, callback) {

      // Save a reference to the ‘this’
      var self = this;

      // Goes
      return each(schema.properties, function (property, propertyAttributes, callback) {

        var isObject = propertyAttributes.type === 'object' && propertyAttributes.properties,
          isArray = propertyAttributes.type === 'array';

        // Get the value of property (instance[property])
        var propertyValue = self.getProperty(property, instance);
        var propertyPath = self.joinPath(path, property);

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
        if (isObject || isArray) {
          return self.validateSchema(
          propertyValue, schema.properties[property], propertyPath, callback);
        } else {
          return self.validateProperty(
          propertyPath, propertyValue, propertyAttributes, callback);
        }

      }, callback);

    };

    /**
     * Validation.validateProperty
     *
     * @param {string} propertyName
     * @param {object} propertyAttributes
     * @param {string|object} propertyValue
     * @param {boolean} singleError
     * @param {function} callback
     */
    Validation.prototype.validateProperty = function (property, propertyValue, propertyAttributes, callback) {

      // Save a reference to the ‘this’
      var self = this;

      var context = {};

      [
        'validateItems',
        'validateProperties',
        'validateSchema',
        'validateProperty',
        'getProperty',
        'attributes',
        'errors',
        'joinPath'
        ].forEach(function (key) {
        context[key] = this[key];
      }, self);

      /**
       * Iterator
       *
       * @param {string} attributeName
       * @param {function} attributeFn
       * @param {function} callback
       */
      var iterator = function (attributeName, attributeFn, callback) {

          var lastLength = self.errors.length;

          // Overwrite the ‘addError’ method
          context.addError = function (message) {

            if (isObject(message)) {
              return self.errors.push({
                property: message.property || property,
                propertyValue: message.propertyValue || propertyValue,
                attributeName: message.attributeName || attributeName,
                attributeValue: message.attributeValue || propertyAttributes[attributeName],
                message: message.message || undefined
              });
            }

            return self.errors.push({
              property: property,
              propertyValue: propertyValue,
              attributeName: attributeName,
              attributeValue: propertyAttributes[attributeName],
              message: message
            });

          };

          /**
           * OnComplete
           */
          var onComplete = function (error) {

              // Deprecated
              if (error === true || isString(error)) {
                context.addError(error);
                return callback(true);
              };

              if (self.errors.length > lastLength && self.singleError) {
                return callback(true);
              } else {
                return callback();
              }

            };

          if (isDefined(propertyAttributes[attributeName])) {
            return attributeFn.apply(context, [
              property,
              propertyValue,
              propertyAttributes[attributeName],
              propertyAttributes,
              onComplete
              ]);
          } else {
            return callback();
          }

        };

      // If it's not a required param and it's empty, skip
      if (propertyAttributes.required !== true && isUndefined(propertyValue)) {
        return callback();
      }

      // Validate the property  
      return each(self.attributes, iterator, callback);

    };

    /**
     * Validation.validateSchema
     *
     * @param {object} instance
     * @param {object} schema
     * @param {string} path
     * @param {function} callback
     */
    Validation.prototype.validateSchema = function (instance, schema, path, callback) {

      var self = this;

      return self.validateProperty(path, instance, schema, function (error) {

        /**
         * {
         *   type: 'object',
         *   properties: {
         *     ... 
         *   }
         * }
         */
        if (schema.properties) {
          return self.validateProperties(
          instance, schema, path, callback);

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
          return self.validateItems(
          instance, schema, path, callback);

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

    };


    /**
     * Export
     * --------------------
     */
    engines.json = (function () {

      /**
       * Cache
       */
      var cache = [];
      var cacheIndex = {};

      return {

        /**
         * Validate
         *
         * @param {object} instance
         * @param {object} schema
         * @param {object} options
         * @param {function} callback
         */
        validate: function (instance, schema, options, callback) {
          if (typeof options === 'function') {
            callback = options;
            options = {};
          }
          return (new Validation(options)).validate(instance, schema, callback);
        },

        /**
         * AddAttribute
         *
         * @param {string} attributeName
         * @param {function} attributeFn
         */
        addAttribute: function (attributeName, attributeFn) {
          return Validation.prototype.addAttribute.apply(Validation, arguments);
        },

        /**
         * AddAttributeConstructor
         *
         * @param {string} attributeName
         * @param {function} attributeConstructor
         */
        addAttributeConstructor: function (attributeName, attributeConstructor) {
          return Validation.prototype.addAttributeConstructor.apply(Validation, arguments);
        }

      };

    }());

  }());

  var amanda = function (engine) {

      if (!hasProperty(engines, engine)) {
        throw new Error('The ‘' + engine + '’ engine is not supported. Please use a different one.');
      }

      return engines[engine];

    };

  /**
   * Amanda.validate
   *
   * This method is deprecated, please use ‘amanda('json').validate’ instead.
   */
  amanda.validate = function (instance, schema, options, callback) {
    var json = engines.json;
    return json.validate.apply(json, arguments);
  };

  /**
   * Amanda.addValidator
   *
   * This method is deprecated, please use ‘amanda('json').addValidator’ instead.
   */
  amanda.addValidator = function (attributeName, attributeFn) {
    var json = engines.json;
    return json.addAttribute.apply(json, arguments);
  };

  /**
   * Amanda.addAttribute
   *
   * This method is deprecated, please use ‘amanda('json').addAttribute’ instead.
   */
  amanda.addAttribute = function (attributeName, attributeFn) {
    var json = engines.json;
    return json.addAttribute.apply(json, arguments);
  };

  /**
   * Amanda.addAttributeConstructor
   *
   * This method is deprecated, please use ‘amanda('json').addAttributeConstructor’ instead.
   */
  amanda.addAttributeConstructor = function (attributeName, attributeConstructor) {
    var json = engines.json;
    return json.addAttributeConstructor.apply(json, arguments);
  };

  /**
   * Export
   * --------------------
   */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = amanda;
  } else if (typeof define !== 'undefined') {
    define(function () {
      return amanda;
    });
  } else {
    this.amanda = amanda;
  }

}());