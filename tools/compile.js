var async = require('async');
var fs = require('fs');

console.log('\nCompiling...');

var files = [
  './src/intro.js',
  './src/utils/each.js',
  './src/utils/isArray.js',
  './src/utils/isEmpty.js',
  './src/utils/isObject.js',
  './src/utils/merge.js',
  './src/utils/pluck.js',
  './src/engines/json/intro.js',
  './src/engines/json/messages.js',
  './src/engines/json/error.js',
  './src/engines/json/validators.js',
  './src/engines/json/validation.js',
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

  fs.writeFile('./dist/latest.js', content.join('\n\n'), 'utf8', function(error) {
    if (error) return handleError(error);
    console.log('Done.\n');
  });

});