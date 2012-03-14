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
