/**
 * Validation.validateProperty
 *
 * @param {string} property
 * @param {object} propertyAttributes
 * @param {string|object} propertyValue
 * @param {boolean} singleError
 * @param {function} callback
 */
Validation.prototype.validateProperty = function(property, propertyValue, propertyAttributes, callback) {

  // Save a reference to the ‘this’
  var self = this;

  /**
   * Iterator
   *
   * @param {string} attributeName
   * @param {function} callback
   */
  var iterator = function(attributeName, attributeFn, callback) {

    /**
     * OnComplete
     *
     * @param {object} error
     */
    var onComplete = function(error) {

      if (!error) return callback();

      // Renders an error messaage
      var errorMessage = self.renderErrorMessage(attributeName, {
        property: property,
        propertyValue: propertyValue,
        attribute: propertyAttributes[attributeName]
      });

      // Add a new error
      self.Errors.addError({
        property: property,
        propertyValue: propertyValue,
        attribute: attributeName,
        attributeValue: propertyAttributes[attributeName],
        message: errorMessage
      });

      // If the ‘singleError’ is on, stop the validation process
      return callback(self.singleError ? true : null);

    };

    if (propertyAttributes[attributeName]) {
      return attributeFn(
        property,
        propertyValue,
        propertyAttributes[attributeName],
        propertyAttributes,
        onComplete
      );
    } else {
      return callback();
    }

  };

  // If it's not a required param and it's empty, skip
  if (propertyAttributes.required !== true && typeof propertyValue === 'undefined') {
    return callback();
  } else {
    return each(self.attributes, iterator, callback);
  }

};