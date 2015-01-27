"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * Example of a provider which can be configured at runtime in a `config()` block with the `setPrefix()` method.
 */
var StatesProvider = (function () {
  function StatesProvider() {
    this.prefix = "You are";
    this.states = ["okay", "chuffed", "highly pleased"];
  }

  _prototypeProperties(StatesProvider, null, {
    setPrefix: {

      /**
       * This method allows the prefix value to be configured at runtime.
       * @param value
       */
      value: function setPrefix(value) {
        this.prefix = value;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    $get: {

      /**
       * The `$get` method is a requirement of the Angular provider registration API, and is a factory function that
       * returns our service object.
       *
       * @param $q
       * @param $timeout
       * @returns {{getStates: Function, getPrefix: Function}}
       */
      value: function $get($q, $timeout) {
        var _this = this;
        this.$q = $q;

        return {
          getStates: function () {
            // completely needless use of a promise, just to show that the $q & $timeout dependencies are working correctly
            var deferred = _this.$q.defer();
            $timeout(function () {
              return deferred.resolve(_this.states);
            }, 100);
            return deferred.promise;
          },
          getPrefix: function () {
            return _this.prefix;
          }
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return StatesProvider;
})();

register.provider("states", StatesProvider);