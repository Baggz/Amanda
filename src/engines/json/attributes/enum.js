/**
 * Enum
 */
Validation.prototype.addAttributeConstructor('enum', function enumConstructor() {

  return function enum(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return (attributeValue.indexOf(propertyValue) === -1) ? callback(true) : callback();
  };

});