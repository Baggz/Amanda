// Load dependencies
var async = require('async');
var fs = require('fs');

console.log('\nCompiling...');

var files = [

  './src/intro.js',
  
  // Utils
  './src/utils/detectType.js',
  './src/utils/each.js',
  './src/utils/every.js',
  './src/utils/filter.js',
  './src/utils/hasProperty.js',
  './src/utils/isArray.js',
  './src/utils/isBoolean.js',
  './src/utils/isDefined.js',
  './src/utils/isEmpty.js',
  './src/utils/isEqual.js',
  './src/utils/isFunction.js',
  './src/utils/isInteger.js',
  './src/utils/isNull.js',
  './src/utils/isNumber.js',
  './src/utils/isObject.js',
  './src/utils/isString.js',
  './src/utils/isUndefined.js',
  './src/utils/keys.js',
  './src/utils/merge.js',
  './src/utils/pluck.js',
  './src/utils/returnTrue.js',
  './src/utils/some.js',


  './src/engines/json/intro.js',
  './src/engines/json/validation.js',

  './src/engines/json/attributes.js',
  './src/engines/json/addAttribute.js',
  './src/engines/json/addAttributeConstructor.js',

  './src/engines/json/attributes/additionalProperties.js',
  './src/engines/json/attributes/divisibleBy.js',
  './src/engines/json/attributes/enum.js',
  './src/engines/json/attributes/except.js',
  './src/engines/json/attributes/format.js',
  './src/engines/json/attributes/length.js',
  './src/engines/json/attributes/maximum.js',
  './src/engines/json/attributes/maxItems.js',
  './src/engines/json/attributes/maxLength.js',
  './src/engines/json/attributes/minimum.js',
  './src/engines/json/attributes/minItems.js',
  './src/engines/json/attributes/minLength.js',
  './src/engines/json/attributes/pattern.js',
  './src/engines/json/attributes/patternProperties.js',
  './src/engines/json/attributes/required.js',
  './src/engines/json/attributes/type.js',
  './src/engines/json/attributes/uniqueItems.js',

  './src/engines/json/validationError.js',
  './src/engines/json/errorMessages.js',
  './src/engines/json/getProperty.js',
  './src/engines/json/joinPath.js',

  './src/engines/json/validate.js',
  './src/engines/json/validateItems.js',
  './src/engines/json/validateProperties.js',
  './src/engines/json/validateProperty.js',
  './src/engines/json/validateSchema.js',

  './src/engines/json/outro.js',

  './src/amanda.js',
  './src/outro.js'

];

var handleError = function(error) {
  console.log('An error occured.');
  console.log(error);
};

async.mapSeries(files, function(fileName, callback) {
  return fs.readFile(fileName, callback);
}, function(error, content) {

  if (error) return handleError(error);

  fs.writeFile('./releases/latest/amanda.js', content.join('\n\n'), 'utf8', function(error) {
    if (error) return handleError(error);
    console.log('Done.\n');
  });

});