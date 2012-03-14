var Amanda = function(engine) {

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
Amanda.validate = function(instance, schema, options, callback) {
  var json = engines.json;
  return json.validate.apply(json, arguments);
};

/**
 * Amanda.addValidator
 *
 * This method is deprecated, please use ‘amanda('json').addValidator’ instead.
 */
Amanda.addValidator = function(attributeName, attributeFn) {
  var json = engines.json;
  return json.addAttribute.apply(json, arguments);
};

/**
 * Amanda.addAttribute
 *
 * This method is deprecated, please use ‘amanda('json').addAttribute’ instead.
 */
Amanda.addAttribute = function(attributeName, attributeFn) {
  var json = engines.json;
  return json.addAttribute.apply(json, arguments);
};

/**
 * Amanda.addAttributeConstructor
 *
 * This method is deprecated, please use ‘amanda('json').addAttributeConstructor’ instead.
 */
Amanda.addAttributeConstructor = function(attributeName, attributeConstructor) {
  var json = engines.json;
  return json.addAttributeConstructor.apply(json, arguments);
};