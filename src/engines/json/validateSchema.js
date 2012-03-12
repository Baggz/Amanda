/**
 * Validation.validateSchema
 *
 * @param {object} instance
 * @param {object} schema
 * @param {string} path
 * @param {function} callback
 */
Validation.prototype.validateSchema = function(instance, schema, path, callback) {

  var self = this;

  return self.validateProperty(path, instance, schema, function(error) {

    /**
     * {
     *   type: 'object',
     *   properties: {
     *     ... 
     *   }
     * }
     */
    if (schema.properties) {
      return self.validateProperties(
        instance,
        schema,
        path,
        callback
      );

    /**
     * {
     *   type: 'array',
     *   items: {
     *     type: 'string'
     *     ... 
     *   }
     * }
     */
    } else if (schema.items) {
      return self.validateItems(
        instance,
        schema,
        path,
        callback
      );

    /**
     * {
     *   type: 'array'
     * }
     * — or —
     * {
     *   type: 'object'
     * }
     */
    } else {
      return callback();
    }

  });

};