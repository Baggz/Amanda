/**
 * Except
 */
var exceptAttribute = function except(property, propertyValue, attributeValue, propertyAttributes, callback) {
  if (attributeValue.indexOf(propertyValue) !== -1) {
    this.addError('except', property);
  }
  return callback();
};

// Export
Validation.prototype.addAttribute('except', exceptAttribute);