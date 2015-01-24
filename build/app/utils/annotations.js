"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 */
var Annotations = (function () {
  function Annotations(appModule) {
    this.app = appModule;
    //this.$injector = $injector;
  }

  _prototypeProperties(Annotations, null, {
    directive: {
      value: function directive(name, constructorFn) {
        /**
         * Clone a function
         * @param original
         * @returns {Function}
         */
        var cloneFunction = function (original) {
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
        var override = function (object, methodName, callback) {
          object[methodName] = callback(object[methodName]);
        };

        /**
         * This function allows us to call a constructor function with arbitrary arguments.
         * From http://stackoverflow.com/a/1608546/772859
         * @param constructor
         * @param args
         * @returns {Annotations._construct.F}
         * @private
         */
        var _construct = function (constructor, args) {
          var F = function () {
            return constructor.apply(this, args);
          };

          F.prototype = constructor.prototype;
          return new F();
        };

        if (constructorFn.prototype.compile) {
          var originalCompileFn = cloneFunction(constructorFn.prototype.compile);

          // Decorate the compile method to automatically return the link method (if it exists)
          // and bind it to the context of the constructor (so `this` works correctly).
          // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
          // returns `this.link` from within the compile function.
          override(constructorFn.prototype, "compile", function (original) {
            return function () {
              originalCompileFn.apply(this, arguments);

              return constructorFn.prototype.link.bind(this);
            };
          });
        }

        var args = constructorFn.$inject || [];
        var factory = args.slice();
        factory.push(function () {
          return _construct(constructorFn, arguments);
        });

        this.app.directive(name, factory);
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
    }
  });

  return Annotations;
})();