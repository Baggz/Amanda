/**
 * Validation
 *
 * @constructor
 * @param {object} options
 */
var Validation = function(options) {

  // Save a reference to the ‘this’
  var self = this;

  var defaultOptions = {
    singleError: true,
    messages: errorMessages,
    cache: false
  };

  each(defaultOptions, function(key, value) {

    if (isObject(value) && options[key]) {
      self[key] = merge(options[key], defaultOptions[key]);

    } else if (isObject(value) && !options[key]) {
      self[key] = merge ({}, defaultOptions[key]);

    } else {
      self[key] = (isDefined(options[key])) ? options[key] : defaultOptions[key];
    }

  });

  this.errors = new ValidationError(this);

};