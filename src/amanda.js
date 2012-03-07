var tmpValidators = {};

var Amanda = function(engine) {

  this.engine = engine;
  this.validate = Amanda.validate;
  this.addValidator = Amanda.addValidator;

};

/**
 * Amanda
 *
 * @constructor
 * @param {string} engine
 */
Amanda.validate = function(instance, schema, options, callback) {

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  each(tmpValidators, engines.json.addValidator);

  this.engine = this.engine || 'json';

  return engines[this.engine].validate(instance, schema, options, callback);  

};

/**
 * AddValidator
 *
 * @param {string} validatorName
 * @param {function} validatorFn
 */
Amanda.addValidator = function(validatorName, validatorFn) {
  tmpValidators[validatorName] = validatorFn;
};