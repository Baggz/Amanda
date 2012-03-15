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

  /**
   * {
   *   type: 'array'
   *   items: [
   *     {
   *       type: 'string'
   *     },
   *     {
   *       type: 'number'
   *     },
   *     ...
   *   ],
   *   ...
   * }
   */
  if (isArray(schema.items)) {

    // Additional items are allowed
    if (isUndefined(schema.additionalItems) || schema.additionalItems === true) {
      return each(schema.items, function(itemIndex, itemSchema, callback) {
        return self.validateSchema(
          instance[itemIndex],
          itemSchema,
          self.joinPath(path, itemIndex),
          callback
        );
      }, callback);
    }

    return each(instance, function(itemIndex, itemValue, callback) {

      // The ‘additionalItems’ attribute is a schema that defines
      // the schema of the additional items
      if (schema.items[itemIndex] || isObject(schema.additionalItems)) {
        return self.validateSchema(
          itemValue,
          schema.items[itemIndex],
          self.joinPath(path, itemIndex),
          callback
        );
      }

      // Additional items are disallowed
      if (schema.additionalItems === false) {
        self.errors.push({
          property: self.joinPath(path, itemIndex),
          propertyValue: itemValue,
          attributeName: 'additionalItems',
          attributeValue: false
        });
        return callback();
      }

    }, callback);

  }

  /**
   * {
   *   type: 'array'
   *   items: {
   *     type: 'string'
   *   },
   *   ...
   * }
   */
  if (isObject(schema.items) && instance && !isEmpty(instance)) {
    return each(instance, function(itemIndex, itemValue, callback) {
      return self.validateSchema(
        instance[itemIndex],
        schema.items,
        self.joinPath(path, itemIndex),
        callback
      );
    }, callback);
  } else {
    return callback();
  }

};