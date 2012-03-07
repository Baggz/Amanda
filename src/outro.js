  /**
   * Export
   * --------------------
   */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Amanda;
  } else if (typeof define !== 'undefined') {
    define(function() {
      return Amanda;
    });
  } else {
    this.amanda = this.Amanda = Amanda;
  }

}());