/**
 * GetProperty
 *
 * @param {string} property 
 * @param {object} source
 */
Validation.prototype.getProperty = function(property, source) {
  if (source) {
    return (source[property]) ? source[property] : undefined;
  } else {
    return undefined;
  }
};