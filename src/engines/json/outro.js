
  /**
   * Export
   * --------------------
   */
  engines.json = {

    /**
     * Validate
     *
     * @param {object} instance
     * @param {object} schema
     * @param {object} options
     * @param {function} callback
     */
    validate: function(instance, schema, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      return (new Validation(options)).validate(instance, schema, callback);
    },

    /**
     * AddValidator
     *
     * @param {string} validatorName
     * @param {function} validatorFn
     */
    addValidator: function(validatorName, validatorFn) {
      validators[validatorName] = validatorFn;
    }

  };

}());