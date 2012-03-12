/**
 * Maximum
 */
Validation.prototype.addAttributeConstructor('required', function maximumConstructor() {
  return function maximum(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (isNumber(propertyValue)) {
      if ((propertyAttributes.exclusiveMaximum && propertyValue >= attributeValue) || (propertyValue > attributeValue)) {
        this.addError();
      }
    }
  
    return callback();

  };
});