/**
 * Some
 *
 * @param {object} arr
 * @param {function} iterator
 */
var some = function(arr, iterator) {
  return Array.prototype.some.apply(arr, [iterator]);
};