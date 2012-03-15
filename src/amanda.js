var amanda = function(engine) {

  if (!hasProperty(engines, engine)) {
    throw new Error('The ‘' + engine + '’ engine is not supported. Please use a different one.');
  }

  return engines[engine];

};

/**
 * Amanda.validate
 *
 * This method is deprecated, please use ‘amanda('json').validate’ instead.
 */
amanda.validate = function(instance, schema, options, callback) {
  var json = engines.json;
  return json.validate.apply(json, arguments);
};

/**
 * Amanda.addValidator
 *
 * This method is deprecated, please use ‘amanda('json').addValidator’ instead.
 */
amanda.addValidator = function(attributeName, attributeFn) {
  var json = engines.json;
  return json.addAttribute.apply(json, arguments);
};

/**
 * Amanda.addAttribute
 *
 * This method is deprecated, please use ‘amanda('json').addAttribute’ instead.
 */
amanda.addAttribute = function(attributeName, attributeFn) {
  var json = engines.json;
  return json.addAttribute.apply(json, arguments);
};

/**
 * Amanda.addAttributeConstructor
 *
 * This method is deprecated, please use ‘amanda('json').addAttributeConstructor’ instead.
 */
amanda.addAttributeConstructor = function(attributeName, attributeConstructor) {
  var json = engines.json;
  return json.addAttributeConstructor.apply(json, arguments);
};