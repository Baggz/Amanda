/**
 * Minimum
 */
Validation.prototype.addAttributeConstructor('minimum', function minimumConstructor() {

  return function minimum(property, propertyValue, attributeValue, propertyAttributes, callback) {
    if (isNumber(propertyValue)) {
      var condition = (propertyAttributes.exclusiveMinimum) ? propertyValue > attributeValue : propertyValue >= attributeValue;
      return (condition) ? callback() : callback(true);
    } else {
      return callback(true);
    }
  };

});
