/**
 * IsInteger
 *
 * @param {object} input
 */
var isInteger = function(input) {
  return isNumber(input) && input % 1 === 0;
};