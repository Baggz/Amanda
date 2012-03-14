/**
 * IsEqual
 *
 * @param {object} obj1
 * @param {object} obj2
 */
var isEqual = function(obj1, obj2) {

  /**
   * Arrays
   */
  if (isArray(obj1, obj2)) {

    if (obj1.length !== obj2.length) {
      return false;
    }

    return every(obj1, function(value, index, context) {
      return obj2[index] === value;
    });

  }

  /**
   * Objects
   */
  if (isObject(obj1, obj2)) {

    var keys1 = keys(obj1),
        keys2 = keys(obj2);

    if (!isEqual(keys1, keys2)) {
      return false;
    }

    for (key in obj1) {
      if (!obj2[key] || obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;

  }

  return false;

};