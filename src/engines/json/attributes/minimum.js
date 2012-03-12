/**
 * Minimum
 */
Validation.prototype.addAttributeConstructor('minimum', function minimumConstructor() {
  return function minimum(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (isNumber(propertyValue)) {
      if ((propertyAttributes.exclusiveMinimum && propertyValue <= attributeValue) || (propertyValue < attributeValue)) {
        this.addError();
      }
    }

    return callback();

  };
});
