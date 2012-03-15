/**
 * IsEmpty
 *  
 * Returns true if the passed-in object is empty.
 *
 * @param {object} input
 */
var isEmpty = function(input) {

  if (isNumber(input)) {
    return false;
  }

  if (input === null) {
    return true;
  }

  // If the passed-in object is an array or a string
  if (isArray(input) || typeof input === 'string') {
    return input.length === 0;
  }

  // If the passed-in object is an object
  if (isObject(input)) {
    for (var key in input) {
      if (hasOwnProperty.call(input, key)) return false;
    }
  }

  return true;

};