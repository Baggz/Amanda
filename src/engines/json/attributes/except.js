/**
 * Except
 */
var exceptAttribute = function except(property, propertyValue, attributeValue, propertyAttributes, callback) {

  if (attributeValue.indexOf(propertyValue) !== -1) {
    this.addError();
  }

  return callback();

};

// Export
Validation.prototype.addAttribute('except', exceptAttribute);