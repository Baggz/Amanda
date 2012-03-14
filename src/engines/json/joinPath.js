/**
 * JoinPath
 *
 * @param {string} path 
 * @param {string} property
 */
Validation.prototype.joinPath = function(path, property) {

  // If the ‘path’ is undefined (object), convert the path to a string
  path = path || '';

  // Converts the ‘property’ to a string
  property = property + '';

  if (property.match(/^[a-zA-Z]+$/)) {
    return (path) ? (path + '.' + property) : property;
  } else if (property.match(/\d+/)) {
    return path + '[' + property + ']';
  } else  {
    return path + '["' + property + '"]';
  }

};