/**
 * AmandaError
 *
 * @constructor
 */
var AmandaError = function() {
  this.length = 0;
};

/**
 * Error
 *
 * Adds a new error to the ‘Error’ instance.
 *
 * @param {object} error
 */
AmandaError.prototype.addError = function(error) {
  this[this.length] = error;
  this.length++;
};

// Generates the ‘getProperties’ and the ‘getMessages’ method
each({
  getProperties: 'property',
  getMessages: 'message'
}, function(key, value) {
  AmandaError.prototype[key] = function() {
    return pluck(this, value);
  };    
});
