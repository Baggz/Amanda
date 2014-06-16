/**
 * Each
 *
 * Applies an iterator function to each item in an array or an object, in series.
 *
 * @param {object} list
 * @param {function} iterator
 * @param {function} callback
 */
var each = function(list, iterator, callback) {

  /**
   * SyncEach
   *
   * @param {object} list
   * @param {function} iterator
   */
  var syncEach = function(list, iterator) {

    // If the list is an array
    if (isArray(list) && !isEmpty(list)) {
      for (var i = 0, len = list.length; i < len; i++) {
        iterator.apply(list, [i, list[i]]);
      }
    }

    // If the list is an object
    if (isObject(list) && !isEmpty(list)) {
      for (var key in list) {
        if (list.hasOwnProperty(key)) {
          iterator.apply(list, [key, list[key]]);
        }
      }
    }

  };

  /**
   * AsyncEach
   * @param {object} list
   * @param {function} iterator
   * @param {function} callback
   */
    var asyncEach = function(list, iterator, callback) {

      var finished    = 0;
      var started     = 0;
      var hasCalled   = false;
      var mayCallback = false;

      var tryCallback = function() {
        if (mayCallback && finished == started) {
          // finished all functions, celebrate!
            return callback();
        }
      }

      /**
       * AddToQueue
       *
       * @param {string} key
       * @param {string|object} value
       */
      var addToQueue = function(key, value) {
        var cb = function(error) {
          // return early if already called back
          if (hasCalled) return;

          if (error) {
            // if error, fail fast
            hasCalled = true;
            return callback(error);

          }

          finished++;
            return tryCallback();

        };

        // execute right away
        started++;
        return iterator(key, value, cb);
      }


      // If the list is an array
      if (isArray(list) && !isEmpty(list)) {
        for (var i = 0, len = list.length; i < len; i++) {
          addToQueue(i, list[i]);
        }

      // If the list is an object
      } else if (isObject(list) && !isEmpty(list)) {
        for (var key in list) {
          if (list.hasOwnProperty(key)) {
            addToQueue(key, list[key]);
          }
        }

      // If the list is not an array or an object
      } else {
        return callback();
      }

      // Done adding items. Allow callback to fire
      mayCallback = true
      return tryCallback();
    };

    if (typeof callback === 'undefined') {
      return syncEach.apply(this, arguments);
    } else {
      return asyncEach.apply(this, arguments);
    }

  };
