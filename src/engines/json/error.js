/**
 * ValidationError
 *
 * @constructor
 */
var ValidationError = function() {
  this.length = 0;
};

/**
 * Error
 *
 * Adds a new error to the ‘Error’ instance.
 *
 * @param {object} error
 */
ValidationError.prototype.addError = function(error) {
  this[this.length] = error;
  this.length++;
};

// Generates the ‘getProperties’ and the ‘getMessages’ method
each({
  getProperties: 'property',
  getMessages: 'message'
}, function(key, value) {
  ValidationError.prototype[key] = function() {
    return pluck(this, value);
  };    
});
 