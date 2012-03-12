/**
 * Type
 * --------------------
 */
Validation.prototype.addAttributeConstructor('type', function typeConstructor() {

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

      var noError = attributeValue.some(function(type) {
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

});