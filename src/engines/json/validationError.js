/**
 * Error
 *
 * @constructor
 */
var ValidationError = function() {
  this.length = 0;
};

ValidationError.prototype.push = function(item) {
  this[this.length] = item;
  this.length += 1;
};