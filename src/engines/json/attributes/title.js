/**
 * Title
 */
var titleAttribute = function except(property, propertyValue, attributeValue, propertyAttributes, callback) {
  return callback();
};

// Export
Validation.prototype.addAttribute('title', titleAttribute);