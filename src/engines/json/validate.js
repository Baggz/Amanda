/**
 * Validation.validate
 *
 * @param {object} instance
 * @param {object} schema
 * @param {boolean} singleError
 * @param {function} callback
 */
Validation.prototype.validate = function(instance, schema, callback) {

  // Save a reference to the ‘this’
  var self = this;

  return this.validateSchema(instance, schema, '', function(error) {
    return callback((self.Errors.length > 0) ? self.Errors : undefined);
  });

};