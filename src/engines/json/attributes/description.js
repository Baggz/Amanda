/**
 * Description
 */
var descriptionAttribute = function except(property, propertyValue, attributeValue, propertyAttributes, callback) {
  return callback();
};

// Export
Validation.prototype.addAttribute('description', descriptionAttribute);