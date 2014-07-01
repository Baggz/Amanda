/**
 * Required
 */
var requiredAttribute = function required(property, propertyValue, attributeValue, propertyAttributes, callback) {

  if (attributeValue) {

    var undefinedCondition = isUndefined(propertyValue);

    if (undefinedCondition) {
      this.addError();
    }

  }

  return callback();

};

// Export
Validation.prototype.addAttribute('required', requiredAttribute);
