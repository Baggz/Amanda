/**
 * JoinPath
 *
 * @param {string} path
 * @param {string} property
 */
Validation.prototype.joinPath = function(path, property) {

  path = path || [];

  // Converts the ‘property’ to a string
  property = property + '';

  path.push(property);

  return path;

};