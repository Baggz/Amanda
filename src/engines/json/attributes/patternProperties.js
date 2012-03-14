(function() {

  /**
   * PatternProperties
   */
  var attribute = function patternProperties(property, propertyValue, attributeValue, propertyAttributes, callback) {

    // Saves a reference to ‘this’
    var self = this;

    // Skip
    if (isEmpty(attributeValue)) {
      return callback();
    }

    var matches = {};
    var patterns = keys(attributeValue);

    each(propertyValue, function(key, value) {

      each(patterns, function(index, pattern) {
        if (key.match(new RegExp(pattern))) {
          matches[key] = attributeValue[pattern];
        }
      });

    });

    if (isEmpty(matches)) {
      return callback();
    }

    each(matches, function(propertyName, propertySchema, callback) {
      return self.validateSchema(
        propertyValue[propertyName],
        propertySchema,
        self.joinPath(property, propertyName),
        callback
      );
    }, callback);

  };

  // Export
  Validation.prototype.addAttribute('patternProperties', attribute);

}());