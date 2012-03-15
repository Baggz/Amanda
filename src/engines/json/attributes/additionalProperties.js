/**
 * AdditionalProperties
 */
var additionalPropertiesAttribute = function additionalProperties(property, propertyValue, attributeValue, propertyAttributes, callback) {

  var self = this;

  /**
   * {
   *   additionalProperties: true,
   *   ...
   * }
   */
  if (attributeValue === true) {
    return callback();
  }

  // Filter the forbidden properties
  var propertyKeys = keys(propertyValue);
  var forbiddenProperties = filter(propertyKeys, function(key) {
    return !propertyAttributes.properties[key];
  });

  if (isEmpty(forbiddenProperties)) {
    return callback();
  }

  /**
   * {
   *   additionalProperties: false,
   *   ...
   * }
   */
  if (attributeValue === false) {

    forbiddenProperties.forEach(function(forbiddenProperty) {
      this.addError({
        property: this.joinPath(property, forbiddenProperty),
        propertyValue: propertyValue[forbiddenProperty]
      });
    }, this);

    return callback();

  }

  /**
   * {
   *   additionalProperties: {
   *     type: 'string',
   *     ...
   *   },
   *   ...
   * }
   */
  if (isObject(attributeValue)) {
    return each(forbiddenProperties, function(index, key, callback) {
      return self.validateSchema(
        propertyValue[key],
        attributeValue,
        property + key,
        callback
      );
    }, callback);
  }

};

// Export
Validation.prototype.addAttribute('additionalProperties', additionalPropertiesAttribute);