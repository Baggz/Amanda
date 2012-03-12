/**
 * MinLength
 */
Validation.prototype.addAttributeConstructor('minLength', function minLengthConstructor() {
  return function minLength(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (isString(propertyValue) && propertyValue.length < attributeValue) {
      this.addError();
    }

    return callback();

  };
});