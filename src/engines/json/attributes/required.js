/**
 * Required
 */
var requiredAttribute = function required(property, propertyValue, attributeValue, propertyAttributes, callback) {

  if (attributeValue) {

    var undefinedCondition = isUndefined(propertyValue);
    var nullCondition = isNull(propertyValue);

    if (undefinedCondition || nullCondition) {
      this.addError();
    }

  }

  return callback();

};

// Export
Validation.prototype.addAttribute('required', requiredAttribute);
