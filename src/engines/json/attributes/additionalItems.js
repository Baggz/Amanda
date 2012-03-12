/**
 * AdditionalItems
 */
Validation.prototype.addAttributeConstructor('additionalItems', function additionalItemsConstructor() {
  return function additionalItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

    //this.errors.addError('divisibleBy', property);
    return callback();

  };
});