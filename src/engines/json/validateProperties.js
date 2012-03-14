/**
 * Validation.validateProperties
 *
 * @param {object} instance
 * @param {object} schema
 * @param {string} path
 * @param {function} callback
 */
Validation.prototype.validateProperties = function(instance, schema, path, callback) {
  
  // Save a reference to the ‘this’
  var self = this;

  // Goes
  return each(schema.properties, function(property, propertyAttributes, callback) {

    var isObject = propertyAttributes.type === 'object' && propertyAttributes.properties,
        isArray =  propertyAttributes.type === 'array';

    // Get the value of property (instance[property])
    var propertyValue = self.getProperty(property, instance);
    var propertyPath = self.joinPath(path, property);

    /**
     * {
     *   type: 'object',
     *   properties: {
     *     user: {
     *       type: 'object',
     *       properties: {
     *         ...
     *       }
     *     }
     *   }
     * }
     */
    if (isObject || isArray)  {
      return self.validateSchema(
        propertyValue,
        schema.properties[property],
        propertyPath,
        callback
      );
    } else {
      return self.validateProperty(
        propertyPath,
        propertyValue,
        propertyAttributes,
        callback
      );
    }

  }, callback);

};