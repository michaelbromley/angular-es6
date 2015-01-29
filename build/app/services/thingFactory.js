"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * A thing is an object which will be instantiated and returned by the ThingFactory
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

/**
 * The ThingFactory class creates new things
 */
var ThingFactory = (function () {
  function ThingFactory($timeout) {
    this.$timeout = $timeout;
  }

  _prototypeProperties(ThingFactory, null, {
    newThing: {
      value: function newThing() {
        console.log("Getting a new Thing...");
        return this.$timeout(function () {
          return new Thing();
        }, 100);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return ThingFactory;
})();

register("app").factory("thingFactory", ThingFactory);