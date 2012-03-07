/**
 * Merge
 *
 * Copy all of the properties in the source objects over to the destination object.
 *
 * @param {object} obj1
 * @param {object} obj2
 */
var merge = function(obj1, obj2) {
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
};