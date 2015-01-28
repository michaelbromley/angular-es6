"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * In this case, a factory is being used to house an instantiable class which can be injected with Angular's DI system.
 * So in our controller, we can require `Thing` and then manually instantiate it by invoking `new Thing()` in the
 * controller code.
 */
var Thing = (function () {
  function Thing() {
    var time = new Date().getTime();
    console.log("Created a new Thing at " + time + "!");

    this.explode();
  }

  _prototypeProperties(Thing, null, {
    explode: {
      value: function explode() {
        console.log("BOOM!");
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Thing;
})();

register.factory("Thing", Thing);