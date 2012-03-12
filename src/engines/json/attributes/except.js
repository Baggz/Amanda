/**
 * Except
 */
Validation.prototype.addAttributeConstructor('except', function exceptConstructor() {
  return function except(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (attributeValue.indexOf(propertyValue) !== -1) {
      this.addError('except', property);
    }

    return callback();

  };
});