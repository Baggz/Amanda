/**
 * Messages
 * --------------------
 */
var errorMessages = {

  /**
   * Maximum
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  required: function(property, propertyValue, attributeValue) {
    return 'The ‘' + property + '’ property is required.';
  },

  /**
   * MinLength
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  minLength: function(property, propertyValue, attributeValue) {
    return [
      'The ' + property + ' property must be at least ' + attributeValue + ' characters.',
      'The length of the property is ' + propertyValue.length + '.'
    ].join(' ');
  },

  /**
   * MaxLength
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  maxLength: function(property, propertyValue, attributeValue) {
    return [
      'The ' + property + ' property must not exceed ' + attributeValue + ' characters.',
      'The length of the property is ' + propertyValue.length + '.'
    ].join(' ');
  },

  /**
   * MaxLength
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  length: function(property, propertyValue, attributeValue) {
    return [
      'The ' + property + ' property must be exactly ' + attributeValue + ' characters.',
      'The length of the property is ' + propertyValue.length + '.'
    ].join(' ');
  },

  /**
   * Format
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  format: function(property, propertyValue, attributeValue) {
    return [
      'The ‘' + property + '’ property must be a/an ‘' + attributeValue + '’.',
      'The current value of the property is ‘' + propertyValue  + '’'
    ].join(' ');
  },

  /**
   * Type
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  type: function(property, propertyValue, attributeValue) {
    return [
      'The ‘' + property + '’ property must be a/an ‘' + attributeValue + '’.',
      'The type of the property is ‘' + detectType(propertyValue)  + '’'
    ].join(' ');
  },

  /**
   * Except
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  except: function(property, propertyValue, attributeValue) {
    return;
  },

  /**
   * Minimum
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  minimum: function(property, propertyValue, attributeValue) {
    return [
      'The minimum value of the ‘' + property + '’ must be ' + attributeValue + '.',
      'The current value of the property is ‘' + propertyValue  + '’'
    ].join(' ');
  },

  /**
   * Maximum
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  maximum: function(property, propertyValue, attributeValue) {
    return [
      'The maximum value of the ‘' + property + '’ must be ' + attributeValue + '.',
      'The current value of the property is ‘' + propertyValue  + '’.'
    ].join(' ');
  },

  /**
   * Maximum
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  pattern: function(property, propertyValue, attributeValue) {
    return 'The ‘' + property + '’ does not match the ‘' + attributeValue + '’ pattern.';
  },

  /**
   * MaxItems
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  maxItems: function(property, propertyValue, attributeValue) {    
    return [
      'The ‘' + property + '’ property must not contain more than ‘' + attributeValue + '’ items.',
      'Currently it contains ‘' + propertyValue.items  + '’ items.'
    ].join(' ');
  },

  /**
   * MinItems
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  minItems: function(property, propertyValue, attributeValue) {
    return [
      'The ‘' + property + '’ property must contain at least ‘' + attributeValue + '’ items.',
      'Currently it contains ‘' + propertyValue.items  + '’ items.'
    ].join(' ');
  },

  /**
   * Maximum
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  divisibleBy: function(property, propertyValue, attributeValue) {
    return 'The ‘' + property + '’ is not divisible by ‘' + attributeValue + '’.';
  },

  /**
   * Maximum
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  uniqueItems: function(property, propertyValue, attributeValue) {
    return 'All items in the ‘' + property + '’ property must be unique.';
  },

  /**
   * Enum
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {string} attributeValue
   */
  'enum': function(property, propertyValue, attributeValue) {
    return 'Value of the ‘' + property + '’ must be ' + attributeValue.join(' or ') + '.';
  }

};