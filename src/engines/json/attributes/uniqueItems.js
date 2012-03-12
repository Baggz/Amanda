/**
 * UniqueItems
 */
var uniqueItemsAttribute = function uniqueItems(property, propertyValue, attributeValue, propertyAttributes, callback) {

  var self =  this;

  each(propertyValue, function(index, value) {
    if ((propertyValue.indexOf(value) < index)) {
      self.addError();
    }
  });

  return callback();

};

// Export
Validation.prototype.addAttribute('uniqueItems', uniqueItemsAttribute);