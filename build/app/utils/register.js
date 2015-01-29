"use strict";

var _applyConstructor = function (Constructor, args) {
  var instance = Object.create(Constructor.prototype);

  var result = Constructor.apply(instance, args);

  return result != null && (typeof result == "object" || typeof result == "function") ? result : instance;
};

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 */
var Register = (function () {
  function Register(appModule) {
    this.app = appModule;
  }

  _prototypeProperties(Register, null, {
    directive: {
      value: function directive(name, constructorFn) {


        if (!constructorFn.prototype.compile) {
          constructorFn.prototype.compile = function () {};
        }

        var originalCompileFn = this._cloneFunction(constructorFn.prototype.compile);

        // Decorate the compile method to automatically return the link method (if it exists)
        // and bind it to the context of the constructor (so `this` works correctly).
        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
        // returns `this.link` from within the compile function.
        this._override(constructorFn.prototype, "compile", function () {
          return function () {
            originalCompileFn.apply(this, arguments);

            if (constructorFn.prototype.link) {
              return constructorFn.prototype.link.bind(this);
            }
          };
        });

        var factoryArray = this._createFactoryArray(constructorFn);

        this.app.directive(name, factoryArray);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    controller: {
      value: function controller(name, contructorFn) {
        this.app.controller(name, contructorFn);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    service: {
      value: function service(name, contructorFn) {
        this.app.service(name, contructorFn);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    provider: {
      value: function provider(name, constructorFn) {
        this.app.provider(name, constructorFn);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    factory: {
      value: function factory(name, constructorFn) {
        var factoryArray = this._createFactoryArray(constructorFn);
        this.app.factory(name, factoryArray);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _createFactoryArray: {

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
      value: function CreateFactoryArray(constructorFn) {
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
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _cloneFunction: {

      /**
       * Clone a function
       * @param original
       * @returns {Function}
       */
      value: function CloneFunction(original) {
        return function () {
          return original.apply(this, arguments);
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _override: {

      /**
       * Override an object's method with a new one specified by `callback`.
       * @param object
       * @param methodName
       * @param callback
       */
      value: function Override(object, methodName, callback) {
        object[methodName] = callback(object[methodName]);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Register;
})();