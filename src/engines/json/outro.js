  
  /**
   * Export
   * --------------------
   */
  engines.json = (function() {

    /**
     * Cache
     */
    var cache = [];
    var cacheIndex = {};

    return {

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
       * AddAttribute
       *
       * @param {string} attributeName
       * @param {function} attributeFn
       */
      addAttribute: function(attributeName, attributeFn) {
        return Validation.prototype.addAttribute.apply(Validation, arguments);
      },

      /**
       * AddAttributeConstructor
       *
       * @param {string} attributeName
       * @param {function} attributeConstructor
       */
      addAttributeConstructor: function(attributeName, attributeConstructor) {
        return Validation.prototype.addAttributeConstructor.apply(Validation, arguments);
      }

    };

  }());

}());