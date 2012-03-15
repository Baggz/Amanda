/**
 * Error
 *
 * @constructor
 */
var ValidationError = function() {
  this.length = 0;
};

ValidationError.prototype.push = function(error) {

  this[this.length] = {

    property: error.property,
    propertyValue: error.propertyValue,
    attributeName: error.attributeName,
    attributeValue: error.attributeValue,
    message: error.message,

    // Deprecated
    validator: error.attributeName,
    validatorName: error.attributeName,
    validatoValue: error.attributeValue

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