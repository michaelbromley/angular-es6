/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 */
class Register {

    constructor(appModule) {
        this.app = appModule;
    }


    directive(name, constructorFn) {


        if (!constructorFn.prototype.compile) {
            constructorFn.prototype.compile = () => {};
        }

        var originalCompileFn = this._cloneFunction(constructorFn.prototype.compile);

        // Decorate the compile method to automatically return the link method (if it exists)
        // and bind it to the context of the constructor (so `this` works correctly).
        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
        // returns `this.link` from within the compile function.
        this._override(constructorFn.prototype, 'compile', function () {
            return function () {
                originalCompileFn.apply(this, arguments);

                if (constructorFn.prototype.link) {
                    return constructorFn.prototype.link.bind(this);
                }
            };
        });

        var factoryArray = this._createFactoryArray(constructorFn);

        this.app.directive(name, factoryArray);
    }

    controller(name, contructorFn) {
        this.app.controller(name, contructorFn);
    }

    service(name, contructorFn) {
        this.app.service(name, contructorFn);
    }

    provider(name, constructorFn) {
        this.app.provider(name, constructorFn);
    }

    factory(name, constructorFn) {
        var factoryArray = this._createFactoryArray(constructorFn);
        this.app.factory(name, factoryArray);
    }

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
    _createFactoryArray(constructorFn) {
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        var args = constructorFn.$inject || [];
        var factoryArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push((...args) => {
            return new constructorFn(...args);
        });

        return factoryArray;
    }

    /**
     * Clone a function
     * @param original
     * @returns {Function}
     */
    _cloneFunction(original) {
        return function() {
            return original.apply(this, arguments);
        };
    }

    /**
     * Override an object's method with a new one specified by `callback`.
     * @param object
     * @param methodName
     * @param callback
     */
    _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName])
    }

}