(function() {

  /**
   * UniqueItems
   */
  var attribute = function uniqueItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

    var self =  this;

    each(propertyValue, function(index, value) {

      if (isString(value)) {
        if ((propertyValue.indexOf(value) < index)) {
          self.addError();
        }
      }

      if (isObject(value) || isArray(value)) {
        propertyValue.forEach(function(subValue, subIndex) {

          if (subIndex !== index) {
            if (isEqual(value, subValue)) {
              self.addError({
                property: self.joinPath(property, subIndex)
              });
            }
          }

        });
      }

    });

    return callback();

  };

  // Export
  Validation.prototype.addAttribute('uniqueItems', attribute);

}());