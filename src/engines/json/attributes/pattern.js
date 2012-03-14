/**
 * Pattern
 */
var patternAttribute = function pattern(property, propertyValue, attributeValue, propertyAttributes, callback) {

  if (isString(propertyValue) && !propertyValue.match(attributeValue)) {
    this.addError();
  }

  return callback();

};

// Export
Validation.prototype.addAttribute('pattern', patternAttribute);