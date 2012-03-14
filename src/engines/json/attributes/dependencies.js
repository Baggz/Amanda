(function() {

  /**
   * Dependencies
   */
  var attribute = function dependencies(property, propertyValue, attributeValue, propertyAttributes, callback) {
    return this.validateSchema(this.instance, attributeValue, '', callback);
  };

  // Export
  Validation.prototype.addAttribute('dependencies', attribute);

}());