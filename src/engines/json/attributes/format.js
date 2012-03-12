/**
 * Format
 */
Validation.prototype.addAttributeConstructor('format', function formatConstructor() {
  
  // Uložíme si referenci na this
  var self = this;

  /**
   * Formats
   */
  var formats = {

    /**
     * date-time
     *
     * This should be a date in ISO 8601 format of YYYY-MM-DDThh:mm:ssZ in UTC
     * time. This is the recommended form of date/timestamp.
     */
    'date-time': {
      type: 'string',
      pattern: /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    },

    /**
     * date
     *
     * This should be a date in the format of YYYY-MM-DD. It is recommended that you
     * use the "date-time" format instead of "date" unless you need to transfer only the date part.
     */
    date: function(input) {
      if (isString(input)) {
        return input.match(/^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}$/);
      }
      if (isObject(input)) {
        return Object.prototype.toString.call(input) === '[object Date]';
      }
      return false;
    },

    /**
     * time
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'time': {
      type: 'string',
      pattern: /^\d{2}:\d{2}:\d{2}$/
    },

    /**
     * utc-milisec
     *
     * This should be the difference, measured in milliseconds, between the specified
     * time and midnight, 00:00 of January 1, 1970 UTC.  The value
     * should be a number (integer or float).
     */
    'utc-milisec': {
      type: 'number'
    },

    /**
     * regex
     *
     * This should be a time in the format of hh:mm:ss.
     */
    regex: function(input) {
      return input && input.test && input.exec;
    },

    /**
     * color
     *
     * This is a CSS color (like "#FF0000" or "red"), based on CSS 2.1.
     */
    'color': {
      type: 'string'
    },

    /**
     * style
     *
     * This is a CSS style definition (like "color: red; background-color:#FFF"), based on CSS 2.1.
     */
    'style': {
      type: 'string'
    },

    /**
     * phone
     *
     * This should be a phone number.
     */
    'phone': {
      type: 'number'
    },

    /**
     * uri
     *
     * This value should be a URI.
     */
    'uri': {
      type: 'string',
      pattern: /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|cat|coop|int|pro|tel|xxx|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2})?)|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/
    },

    /**
     * email
     *
     * This should be an email address.
     */
    'email': {
      type: 'string',
      pattern: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
    },

    /**
     * ip-address
     *
     * This should be an ip version 4 address.
     */
    'ip-address': {
      type: 'string',
      pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    },

    /**
     * ipv6
     *
     * This should be an ip version 6 address.
     */
    'ipv6': {
      type: 'string',
      pattern: /(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(?:(?:[a-f\d]{1,4}:)*[a-f\d]{1,4})?::(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))?)/
    },

    /**
     * host-name
     *
     * This should be a host-name.
     */
    'host-name': {
      type: 'string'
    }

  };

  /**
   * CustomFormats
   * --------------------
   */
  formats.alpha = {
    required: true,
    type: 'string',
    pattern: /^[a-zA-Z]+$/
  };

  formats.alphanumeric = {
    required: true,
    type: ['string', 'number'],
    pattern: /^[a-zA-Z0-9]+$/
  };

  formats.decimal = function(input) {
    if (!isNumber(input)) return false;
    return (input + '').match(/^[0-9]+(\.[0-9]{1,2})?$/);
  };

  formats.percentage = {
    required: true,
    type: ['string', 'number'],
    pattern: /^-?[0-9]{0,2}(\.[0-9]{1,2})?$|^-?(100)(\.[0]{1,2})?$/,
    minimum: -100,
    maximum: 100
  };

  formats.port = {
    required: true,
    type: ['string', 'number'],
    pattern: /\:\d+/
  };

  /**
   * Aliases
   * --------------------
   */
  var aliases = {
    url: 'uri',
    ip: 'ip-address',
    ipv4: 'ip-address',
    host: 'host-name',
    hostName: 'host-name'
  };

  // Apply aliases
  each(aliases, function(alias, format) {
    formats[alias] = formats[format];
  });

  // Export
  return function format(property, propertyValue, attributeValue, propertyAttributes, callback) {

    /**
     * {
     *   format: {
     *     type: 'string',
     *     pattern: /abc/
     *     ... 
     *   }
     *   ...
     * }
     */
    if (isObject(attributeValue)) {
      return this.validateProperty(property, propertyValue, attributeValue, callback);
    }

    /**
     * {
     *   format: 'lorem ipsum dolor',
     *   ...
     * }
     */
    if (isString(attributeValue) && !hasProperty(formats, attributeValue)) {
      throw new Error('The format ‘' + attributeValue + '’ is not supported.');
    }

    /**
     * {
     *   format: 'phone',
     *   ...
     * }
     */
    if (isString(attributeValue)) {

      var fn = formats[attributeValue];

      if (isFunction(fn)) {
        var noError = fn(propertyValue);
        if (!noError) {
          this.addError();
        }
        return callback();
      }

      if (isObject(fn)) {
        return this.validateProperty(property, propertyValue, fn, callback);
      }

    }

  };

});