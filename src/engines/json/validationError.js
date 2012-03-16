/**
 * Error
 *
 * @constructor
 */
var ValidationError = function(parent) {

  this.length = 0;
  
  this.errorMessages = parent.messages;

};

ValidationError.prototype.renderErrorMessage = function(error) {

  var errorMessage = this.errorMessages[error.attributeName];

  if (errorMessage && isFunction(errorMessage)) {
    return errorMessage(
      error.property,
      error.propertyValue,
      error.attributeValue
    );
  }

  if (errorMessage && isString(errorMessage)) {

    [
      'property',
      'propertyValue',
      'attributeValue'
    ].forEach(function(placeholder) {
      errorMessage = errorMessage.replace(new RegExp('{{' + placeholder + '}}', 'g'), error[placeholder]);
    });

    // Deprecated
    errorMessage = errorMessage.replace(/{{validator}}/g, error['attributeValue']);

    return errorMessage.replace(/\s+/g, ' ');

  }

  return error.message;

};

ValidationError.prototype.push = function(error) {

  this[this.length] = {

    property: error.property,
    propertyValue: error.propertyValue,
    attributeName: error.attributeName,
    attributeValue: error.attributeValue,
    message: this.renderErrorMessage(error),

    // Deprecated
    validator: error.attributeName,
    validatorName: error.attributeName,
    validatorValue: error.attributeValue

  };

  this.length += 1;

};

/**
 * GetProperties
 */
ValidationError.prototype.getProperties = function() {
  return pluck(this, 'property');
};

/**
 * GetMessages
 */
ValidationError.prototype.getMessages = function() {
  return pluck(this, 'message');
};