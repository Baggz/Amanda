/**
 * Validation.validateSchema
 *
 * @param {object} instance
 * @param {object} schema
 * @param {boolean} singleError
 * @param {function} callback
 */
Validation.prototype.validateSchema = function(instance, schema, path, callback) {

  // Reference na this
  var self = this;

  /**
   * {
   *   type: 'object',
   *   properties: {
   *     ... 
   *   }
   * }
   * — or —
   * {
   *   type: 'array',
   *   items: {
   *     ...
   * }
   */
  if (['object', 'array'].indexOf(schema.type) !== -1) {
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
        return self.validateProperties(instance, schema, path, callback);

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
        return self.validateItems(instance, schema, path, callback);

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

  /**
   * {
   *   type: 'string',
   *   length: ...
   * }
   */
  } else {
    return self.validateProperty(path, instance, schema, callback);
  }

};