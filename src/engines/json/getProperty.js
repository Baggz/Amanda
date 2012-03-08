/**
 * GetProperty
 *
 * @param {object} source
 * @param {string} property
 */
Validation.prototype.getProperty = function(source, property) {
  return (!source) ? undefined : source[property];
};