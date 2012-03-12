/**
 * MinItems
 */
Validation.prototype.addAttributeConstructor('minItems', function minItemsConstructor() {
  return function minItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (isArray(propertyValue) && propertyValue.length < attributeValue) {
      this.addError();
    }

    return callback();

  };
});