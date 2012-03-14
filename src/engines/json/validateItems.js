/**
 * Validation.validateItems
 *
 * @param {object} instance
 * @param {object} schema
 * @param {string} path
 * @param {function} callback
 */
Validation.prototype.validateItems = function(instance, schema, path, callback) {

  // Save a reference to the ‘this’
  var self = this;

  // If the instance is not empty
  if (instance && !isEmpty(instance)) {

    /**
     * {
     *   type: 'array',
     *   items: {
     *     type: 'object'
     *   }
     * }
     * — or —
     * {
     *   type: 'array',
     *   items: {
     *     type: 'array'
     *   }
     * }
     */
    if (['object', 'array'].indexOf(schema.items.type) !== -1) {
      return each(instance, function(index, propertyValue, callback) {

        var propertyPath = self.joinPath(path, index);

        return self.validateSchema(
          propertyValue,
          schema.items,
          propertyPath,
          callback
        );

      }, callback);

    /*
     * {
     *   type: 'array',
     *   items: {
     *     type: 'string'
     *   }
     * }
     */
    } else {
      return each(instance, function(index, propertyValue, callback) {

        var propertyPath = self.joinPath(path, index);

        return self.validateProperty(
          propertyPath,
          propertyValue,
          schema.items,
          callback
        );

      }, callback);
    }

  } else {
    return callback();
  }

};