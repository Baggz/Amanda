/**
 * Pattern
 */
Validation.prototype.addAttributeConstructor('pattern', function patternConstructor() {

  return function pattern(property, propertyValue, attributeValue, propertyAttributes, callback) {
    if (isString(propertyValue) && !propertyValue.match(attributeValue)) {
      return callback(true);
    } else {
      return callback();
    }
  };

});