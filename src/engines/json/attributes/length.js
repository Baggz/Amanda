/**
 * Length
 */
Validation.prototype.addAttributeConstructor('length', function lengthConstructor() {
  return function length(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (isString(propertyValue) && propertyValue.length !== attributeValue) {
      this.addError();
    }

    return callback();

  };
});