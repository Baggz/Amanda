/**
 * JoinPath
 *
 * @param {string} path 
 * @param {string} property
 */
Validation.prototype.joinPath = function(path, property) {
  if (property.match(/^[a-zA-Z]+$/)) {
    return (path) ? (path + '.' + key) : property;
  } else if (key.match(/\d+/)) {
    return path + '[' + key + ']';
  } else  {
    return path + '["' + key + '"]';
  }
};