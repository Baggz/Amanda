/**
 * Validation.validateProperty
 *
 * @param {string} propertyName
 * @param {object} propertyAttributes
 * @param {string|object} propertyValue
 * @param {boolean} singleError
 * @param {function} callback
 */
Validation.prototype.validateProperty = function(property, propertyValue, propertyAttributes, callback) {

  // Save a reference to the ‘this’
  var self = this;

  var context = {};

  [
    'validateItems',
    'validateProperties',
    'validateSchema',
    'validateProperty',
    'getProperty'
  ].forEach(function(key) {
    context[key] = this[key];
  }, self);

  /**
   * Iterator
   *
   * @param {string} attributeName
   * @param {function} attributeFn
   * @param {function} callback
   */
  var iterator = function(attributeName, attributeFn, callback) {

    var lastLength = self.errors.length;

    // Overwrite the ‘addError’ method
    context.addError = function(message) {
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
    var onComplete = function() {
      if (self.errors.length > lastLength && self.singleError) {
        return callback(true);
      } else {
        return callback();
      }
    };

    if (propertyAttributes[attributeName]) {
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