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

      var typesSupported;

      typesSupported = every(attributeValue, function(type) {
        return hasProperty(types, type);
      });

      if (!typesSupported) {
        this.addError('One of the following types ‘' + attributeValue.join(',') + '’ is not supported.');
        return callback();
      }


      var noError = attributeValue.some(function(type) {
        return types[type](propertyValue);
      });

      if (!noError) {
        this.addError();
      }

      return callback();

    /**
     * {
     *   type: 'string'
     * }
     */
    } else {

      if (!hasProperty(types, attributeValue)) {
        this.addError('Type ‘' + attributeValue + '’ is not supported.');
      } else {
        var testSuccess = types[attributeValue](propertyValue);
        if (!testSuccess) {
          this.addError();
        }
      }

      return callback();

    }

  };

};

// Export
Validation.prototype.addAttributeConstructor('type', typeConstructor);