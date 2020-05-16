/**
 * Required
 */
var requiredAttribute = function required(property, propertyValue, attributeValue, propertyAttributes, callback) {

  if (attributeValue) {

    var undefinedCondition = isUndefined(propertyValue);
    var emptyCondition = (isString(propertyValue) || isArray(propertyValue) || isObject(propertyValue)) && isEmpty(propertyValue);

    if (undefinedCondition || emptyCondition) {
      this.addError();
    }

  }

  return callback();

};

// Export
Validation.prototype.addAttribute('required', requiredAttribute);