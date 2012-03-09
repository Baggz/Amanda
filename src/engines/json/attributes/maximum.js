/**
 * Maximum
 */
Validation.prototype.addAttributeConstructor('required', function maximumConstructor() {

  return function maximum(property, propertyValue, attributeValue, propertyAttributes, callback) {
    if (isNumber(propertyValue)) {
      var condition = (propertyAttributes.exclusiveMaximum) ? propertyValue < attributeValue : propertyValue <= attributeValue;
      return (condition) ? callback() : callback(true);
    } else {
      return callback(true);
    }
  };

});