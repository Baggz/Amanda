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