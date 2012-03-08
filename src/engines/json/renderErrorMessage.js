/**
 * RenderErrorMessage
 *
 * @param {string} attributeName
 * @param {object} templateData
 */
Validation.prototype.renderErrorMessage = function(attributeName, templateData) {
  
  // Gets an error message
  var errorMessage = this.messages[attributeName];
  
  // If the error message is a function
  if (typeof errorMessage === 'function') {
    return errorMessage(
      templateData.property,
      templateData.propertyValue,
      templateData.attribute
    );
  }

  // If the error message is a string
  if (typeof errorMessage === 'string') {
    each(templateData, function(key, value) {
      errorMessage = errorMessage.replace(new RegExp('{{' + key + '}}', 'g'), value);
    });
    return errorMessage.replace(/\s+/g, ' ');
  }

  return '';

};