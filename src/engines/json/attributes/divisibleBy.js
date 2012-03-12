/**
 * DivisibleBy
 */
var divisibleByAttribute = function divisibleBy(property, propertyValue, attributeValue, propertyAttributes, callback) {
  if (isNumber(propertyValue) && (propertyValue % attributeValue !== 0)) {
    this.addError();
  }
  return callback();
};

// Export
Validation.prototype.addAttribute('divisibleBy', divisibleByAttribute);