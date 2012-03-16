/**
 * GetProperty
 *
 * @param {string} property 
 * @param {object} source
 */
Validation.prototype.getProperty = function(property, source) {
  var tree = property.match(/([a-zA-Z0-9\s]+)/g);
  return tree.reduce(function(previousValue, currentValue, index) {
    return (previousValue && isDefined(previousValue[currentValue])) ? previousValue[currentValue] : undefined;
  }, source);
};