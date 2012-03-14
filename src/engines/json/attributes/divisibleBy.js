/**
 * DivisibleBy
 */
var divisibleByAttribute = function divisibleBy(property, propertyValue, attributeValue, propertyAttributes, callback) {

  if (attributeValue === 0) {
    throw new Error('The value of this attribute should not be 0.');
  }

  if (isNumber(propertyValue) && (propertyValue % attributeValue !== 0)) {
    this.addError();
  }

  return callback();

};

// Export
Validation.prototype.addAttribute('divisibleBy', divisibleByAttribute);