/**
 * Required
 * --------------------
 */
Validation.prototype.addAttributeConstructor('required', function requiredConstructor() {
  return function required(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (attributeValue && isUndefined(propertyValue)) {
      this.addError();
    }

    return callback();

  };
});