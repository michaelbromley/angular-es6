"use strict";

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
        var _this = this;



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

        // get the array of dependencies that are needed by this directive
        var args = constructorFn.$inject || [];
        var factoryArray = args.slice(); // create a copy of the array
        // The `factory` array uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push(function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _this._construct(constructorFn, args);
        });

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
        this.app.provider(name, function () {
          return new constructorFn();
        });
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
    },
    _construct: {

      /**
       * This function allows us to instantiate constructor function with arbitrary arguments.
       * From http://stackoverflow.com/a/1608546/772859
       * @param constructor
       * @param args
       * @returns {Annotations._construct.F}
       * @private
       */
      value: function Construct(constructor, args) {
        var F = function () {
          return constructor.apply(this, args);
        };

        F.prototype = constructor.prototype;
        return new F();
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Register;
})();