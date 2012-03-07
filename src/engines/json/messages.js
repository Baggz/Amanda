/**
 * Messages
 * --------------------
 */
var messages = {

  'required': 'The ‘{{property}}’ property is required.',

  'minLength': function(property, propertyValue, validator) {
    return 'The ' + property + ' property must be at least ' + validator + ' characters. \
            The length of the property is ' + propertyValue.length + '.';
  },

  'maxLength': function(property, propertyValue, validator) {
    return 'The ' + property + ' property must not exceed ' + validator + ' characters. \
            The length of the property is ' + propertyValue.length + '.';
  },

  'length': 'The ‘{{property}}’ property must be exactly {{validator}} characters.',

  'format': 'The ‘{{property}}’ property must be a/an {{validator}}.',
  'type': 'The ‘{{property}}’ property must be a/an {{validator}}.',
  'except': 'The ‘{{property}}’ property must not be {{propertyValue}}',
  'minimum': 'The minimum value of the ‘{{property}}’ must be {{validator}}',
  'maximum': 'The maximum value of the ‘{{property}}’ must be {{validator}}',
  'pattern': 'The `{{property}}` does not match the ‘{{validator}}’ pattern.',
  'maxItems': 'The `{{property}}` property must not contain more than {{validator}} items.',
  'minItems': 'The `{{property}}` property must contain at least {{validator}} items.',
  'divisibleBy': 'The ‘{{property}}’ property is not divisible by {{validator}}.',
  'uniqueItems': 'All items in the ‘{{property}}’ property must be unique.',

  // Advanced
  'enum': function(property, propertyValue, validator) {
    return 'Value of the ‘' + property + '’ must be ' + validator.join(' or ') + '.';
  }

};