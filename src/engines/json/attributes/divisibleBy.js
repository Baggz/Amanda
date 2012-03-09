/**
 * DivisibleBy
 */
Validation.prototype.addAttributeConstructor('divisibleBy', function divisibleByConstructor() {

  return function divisibleBy(property, propertyValue, attributeValue, propertyAttributes, callback) {
    if (isNumber(propertyValue) && (propertyValue % attributeValue === 0)) {
      return callback();
    } else {
      return callback(true);
    }
  };

});