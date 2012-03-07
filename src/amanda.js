var tmpValidators = {};

/**
 * Amanda
 *
 * @constructor
 * @param {string} engine
 */
var Amanda = {

  validate: function(instance, schema, options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    each(tmpValidators, engines.json.addValidator);

    return engines.json.validate(instance, schema, options, callback);  

  },

  /**
   * AddValidator
   *
   * @param {string} validatorName
   * @param {function} validatorFn
   */
  addValidator: function(validatorName, validatorFn) {
    tmpValidators[validatorName] = validatorFn;
  }



};