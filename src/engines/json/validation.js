/**
 * Validation
 *
 * @constructor
 * @param {object} options
 */
var Validation = function(options) {

  // Save a reference to the ‘this’
  var self = this;

  // Options
  this.singleError = options.hasOwnProperty('singleError') ? options.singleError : true;
  this.attributes = attributes;
  this.messages = (options.messages) ? merge(options.messages, messages) : messages;

  // Initializes a new instance of the ‘Error’ object
  this.Errors = new AmandaError();

};