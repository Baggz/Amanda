/**
 * IsObject
 *
 * Returns true if the passed-in object is an object.
 *
 * @param {object} input
 */
var isObject = function(input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};