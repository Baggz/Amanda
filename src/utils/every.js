/**
 * Every
 *
 * @param {object} arr
 * @param {function} iterator
 */
var every = function(arr, iterator) {
  return Array.prototype.every.apply(arr, [iterator]);
};