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
      pattern: /asd/
    },

    /**
     * date
     *
     * This should be a date in the format of YYYY-MM-DD.  It is recommended that you
     * use the "date-time" format instead of "date" unless you need to transfer only the date part.
     */
    'date': {
      type: 'string',
      pattern: /a/
    },

    /**
     * time
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'time': {
      type: 'string',
      pattern: /a/
    },

    /**
     * utc-milisec
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'utc-milisec': {
      type: 'string',
      pattern: /a/
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
     * This should be a time in the format of hh:mm:ss.
     */
    'color': {
      type: 'string',
      pattern: /a/
    },

    /**
     * style
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'style': {
      type: 'string',
      pattern: /a/
    },

    /**
     * phone
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'phone': {
      type: 'string',
      pattern: /a/
    },

    /**
     * uri
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'uri': {
      type: 'string',
      pattern: /a/
    },

    /**
     * email
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'email': {
      type: 'string',
      pattern: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
    },

    /**
     * ip-address
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'ip-address': {
      type: 'string',
      pattern: /a/
    },

    /**
     * ipv6
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'ipv6': {
      type: 'string',
      pattern: /(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(?:(?:[a-f\d]{1,4}:)*[a-f\d]{1,4})?::(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))?)/
    },

    /**
     * host-name
     *
     * This should be a time in the format of hh:mm:ss.
     */
    'host-name': {
      type: 'string',
      pattern: /a/
    }

  };

  /**
   * CustomFormats
   */
  var customFormats = {

    'alpha': {
      type: 'string',
      pattern: /^[a-zA-Z]+$/
    },

    'alphanumeric': {
      type: ['string', 'number'],
      pattern: /^[a-zA-Z0-9]+$/
    },

    'decimal': {
      type: 'string',
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/
    },

    'percentage': {
      type: ['string', 'number'],
      pattern: /^-?[0-9]{0,2}(\.[0-9]{1,2})?$|^-?(100)(\.[0]{1,2})?$/,
      minimum: -100,
      maximum: 100
    },

    'port': {
      type: ['string', 'number'],
      pattern: /\:\d+/
    }

  };

    /*
    var aliases = {
      'ip': formats.ip,
      
      'hostName': formats['host-name'],
      'host': formats['host-name'],

    };
    */

    /*  
    'ipv4': function(input) {
      return typeof input === 'string' && input.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    },
    'ip': function(input) {
      return formats.ipv4(input) || formats.ipv6;
    },
    'url': function(input) {
      return typeof input === 'string' && input.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|cat|coop|int|pro|tel|xxx|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2})?)|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/);
    },
    */

  return function format(property, propertyValue, attributeValue, propertyAttributes, callback) {

    if (!hasProperty(formats, attributeValue)) {
      throw new Error('The format ‘' + attributeValue + '’ is not supported.');
    }

    var format = formats[attributeValue];

    if (isFunction(format)) {
      var noError = format(propertyValue);
      if (!noError) {
        this.addError();
      }
      return callback();
    }

    if (isObject(format)) {
      return this.validateProperty(property, propertyValue, format, callback);
    }

  };

});