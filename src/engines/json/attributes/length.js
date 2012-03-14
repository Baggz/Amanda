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