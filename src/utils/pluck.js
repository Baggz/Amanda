/**
 * Pluck
 *
 * Extracts a list of property values.
 *
 * @param {object} list
 * @param {string} propertyName
 */
var pluck = function(list, propertyName) {
  var output = [];
  for (var i = 0, len = list.length; i < len; i++) {
    var property = list[i][propertyName];
    if (output.indexOf(property) === -1) {
      output.push(property);
    }
  }
  return output;
};