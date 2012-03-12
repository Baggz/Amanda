/**
 * MaxItems
 */
Validation.prototype.addAttributeConstructor('maxItems', function maxItemsConstructor() {
  return function maxItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (isArray(propertyValue) && propertyValue.length > attributeValue) {
      this.addError();
    }

    return callback();

  };
});