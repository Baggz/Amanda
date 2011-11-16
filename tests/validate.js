// Load dependencies
var amanda = require('../src/amanda.js'),
    async = require('async');

/**
 * Test ‘validate’
 */
exports['Test #1'] = function(test) {

  /**
   * Schema
   */
  var schema = {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            length: [2, 45]
          },
          name: {
            type: 'string',
            length: [2, 45]
          },
          surname: {
            type: 'string',
            length: [2, 45]
          },
          localization: {
            type: 'object',
            properties: {
              language: {
                type: 'string',
                length: 2
              }
            }
          }
        }
      }
    }
  };

  /**
   * Data
   */
  var data = {
    user: {
      username: 'Baggz',
      name: 'František',
      surname: 'Hába',
      localization: {
        language: 'en'
      }
    }
  };

  async.series([

    function(callback) {
      amanda.validate(data, schema, function(error) {
        test.equal(error, undefined);
        callback(null);
      });
    },

    function(callback) {
      data.user.localization = 'enn';
      amanda.validate(data, schema, function(error) {
        test.ok(error);
        callback(null);
      });
    }

  ], test.done);  

};