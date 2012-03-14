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

  this.instance = instance;
  this.schema = schema;

  /**
   * Basic Types
   */
  var basicTypes = [
    'string',
    'number',
    'function',
    'boolean',
    'integer',
    'int',
    'null'
  ];

  /**
   * Object Types
   */
  var objectTypes = [
    'object', 
    'array'
  ];

  /**
   * CallbackProxy
   */
  var callbackProxy = function() {
    if (self.errors.length !== 0) {
      return callback(self.errors);
    } else {
      return callback();
    }
  };

  /**
   * {
   *   type: 'string',
   *   ...
   * }
   */
  if (basicTypes.indexOf(schema.type) !== -1) {
    return this.validateProperty(undefined, instance, schema, callbackProxy);
  }

  /**
   * {
   *   type: 'object',
   *   ...
   * }
   */
  if (objectTypes.indexOf(schema.type) !== -1) {

    if (isString(instance)) {
      try {
        instance = JSON.parse(instance);
      } catch(parseError) {

      }
    }

    return this.validateSchema(instance, schema, '', callbackProxy);

  }

  /**
   * {
   *   type: ???,
   *   ...
   * }
   */
  if (schema.type === 'any' || !schema.type) {

    if (isString(instance)) {
      try {
        instance = JSON.parse(instance);
        return this.validateSchema(instance, schema, '', callbackProxy);
      } catch(parseError2) {

      }
    }

    if (isObject(instance) || isArray (instance)) {
      return this.validateSchema(instance, schema, '', callbackProxy); 
    }

    return this.validateProperty(undefined, instance, schema, callbackProxy);

  }

};