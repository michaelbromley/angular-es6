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
    this.states = ["okay", "not too bad", "contented", "quite satisfied", "moderately gratified", "well chuffed", "highly pleased", "highly pleased indeed"];
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
       * @returns {{getNextState: Function, getPrefix: Function}}
       */
      /*@ngInject*/
      value: ["$timeout", function $get($timeout) {
        var _this = this;
        var index = 0;
        $timeout(function () {
          return console.log("This is the statesProvider $get method being invoked.");
        }, 100);

        return {
          getNextState: function () {
            var currentState;

            if (index < _this.states.length) {
              currentState = _this.states[index];
            } else {
              currentState = _this.states[_this.states.length - 1];
            }

            index++;
            return currentState;
          },
          getPrefix: function () {
            return _this.prefix;
          }
        };
      }],
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return StatesProvider;
})();

register("app").provider("states", StatesProvider);