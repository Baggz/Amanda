/**
 * Enum
 */
Validation.prototype.addAttributeConstructor('enum', function enumConstructor() {
  return function(property, propertyValue, attributeValue, propertyAttributes, callback) {
    
    if (attributeValue.indexOf(propertyValue) === -1) {
      this.addError();
    }
    
    return callback();

  };
});