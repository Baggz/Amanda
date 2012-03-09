/**
 * MaxLength
 */
Validation.prototype.addAttributeConstructor('maxLength', function maxLengthConstructor() {

  return function maxLength(property, propertyValue, attributeValue, propertyAttributes, callback) {
    if (isString(propertyValue) && propertyValue.length <= attributeValue) {
      return callback();
    } else {
      return callback(true);
    }
  };

});