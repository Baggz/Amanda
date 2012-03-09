/**
 * AddAttribute
 *
 * @param {string} attributeName
 * @param {function} attributeFn
 */
Validation.prototype.addAttribute = function(attributeName, attributeFn) {
  return Validation.prototype.attributes[attributeName] = attributeFn;
};