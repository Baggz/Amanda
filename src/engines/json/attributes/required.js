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