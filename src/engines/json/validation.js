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
  this.Errors = new AmandaError();

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