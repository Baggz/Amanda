/**
 * IsArray
 *
 * Returns true if the passed-in object is an array.
 *
 * @param {object} input
 */
var isArray = function(input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};