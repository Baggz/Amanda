/**
 * AddAttributeConstructor
 *
 * @param {string} attributeName
 * @param {function} attributeConstructor
 */
Validation.prototype.addAttributeConstructor = function(attributeName, attributeConstructor) {
  return Validation.prototype.attributes[attributeName] = attributeConstructor();
};