"use strict";

var _applyConstructor = function (Constructor, args) {
  var instance = Object.create(Constructor.prototype);

  var result = Constructor.apply(instance, args);

  return result != null && (typeof result == "object" || typeof result == "function") ? result : instance;
};

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 */
function register(appName) {
  var directive = function (name, constructorFn) {


    if (!constructorFn.prototype.compile) {
      constructorFn.prototype.compile = function () {};
    }

    var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

    // Decorate the compile method to automatically return the link method (if it exists)
    // and bind it to the context of the constructor (so `this` works correctly).
    // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
    // returns `this.link` from within the compile function.
    _override(constructorFn.prototype, "compile", function () {
      return function () {
        originalCompileFn.apply(this, arguments);

        if (constructorFn.prototype.link) {
          return constructorFn.prototype.link.bind(this);
        }
      };
    });

    var factoryArray = _createFactoryArray(constructorFn);

    app.directive(name, factoryArray);
  };

  var controller = function (name, contructorFn) {
    app.controller(name, contructorFn);
  };

  var service = function (name, contructorFn) {
    app.service(name, contructorFn);
  };

  var provider = function (name, constructorFn) {
    app.provider(name, constructorFn);
  };

  var factory = function (name, constructorFn) {
    var factoryArray = _createFactoryArray(constructorFn);
    app.factory(name, factoryArray);
  };

  /**
   * Convert a constructor function into a factory function which returns a new instance of that
   * constructor, with the correct dependencies automatically injected as arguments.
   *
   * In order to inject the dependencies, they must be attached to the constructor function with the
   * `$inject` property annotation.
   *
   * @param constructorFn
   * @returns {Array.<T>}
   * @private
   */
  var _createFactoryArray = function (constructorFn) {
    // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
    var args = constructorFn.$inject || [];
    var factoryArray = args.slice(); // create a copy of the array
    // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
    // dependency, and the final item is the factory function itself.
    factoryArray.push(function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _applyConstructor(constructorFn, _toArray(args));
    });

    return factoryArray;
  };

  /**
   * Clone a function
   * @param original
   * @returns {Function}
   */
  var _cloneFunction = function (original) {
    return function () {
      return original.apply(this, arguments);
    };
  };

  /**
   * Override an object's method with a new one specified by `callback`.
   * @param object
   * @param methodName
   * @param callback
   */
  var _override = function (object, methodName, callback) {
    object[methodName] = callback(object[methodName]);
  };

  var app = angular.module(appName);

  return {
    directive: directive,
    controller: controller,
    service: service,
    provider: provider,
    factory: factory
  };
}