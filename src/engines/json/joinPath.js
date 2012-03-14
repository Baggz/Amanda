/**
 * JoinPath
 *
 * @param {string} path 
 * @param {string} property
 */
Validation.prototype.joinPath = function(path, property) {
  if (property.match(/^[a-zA-Z]+$/)) {
    return (path) ? (path + '.' + property) : property;
  } else if (property.match(/\d+/)) {
    return path + '[' + property + ']';
  } else  {
    return path + '["' + property + '"]';
  }
};