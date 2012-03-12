/**
 * Filter
 *
 * @param {object} arr
 * @param {function} iterator
 */
var filter = function(arr, iterator, context) {
  return Array.prototype.filter.apply(arr, [iterator, context || this]);
};