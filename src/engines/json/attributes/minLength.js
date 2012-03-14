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