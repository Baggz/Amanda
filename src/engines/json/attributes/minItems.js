/**
 * MinItems
 */
var minItems = function minItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

  if (isArray(propertyValue) && propertyValue.length < attributeValue) {
    this.addError();
  }

  return callback();

};

// Export
Validation.prototype.addAttribute('minItems', minItems);