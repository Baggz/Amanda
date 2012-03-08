/**
 * HasProperty
 *
 * @param {object} input
 */
var hasProperty = function(obj, property) {
  return Object.prototype.hasOwnProperty.apply(obj, [property]);
};