/**
 * Example of a provider which can be configured at runtime in a `config()` block with the `setPrefix()` method.
 */
class StatesProvider {

    constructor() {
        this.prefix = "You are";
        this.states = ['okay', 'chuffed', 'highly pleased'];
    }

    /**
     * This method allows the prefix value to be configured at runtime.
     * @param value
     */
    setPrefix(value) {
        this.prefix = value;
    }

    /**
     * The `$get` method is a requirement of the Angular provider registration API, and is a factory function that
     * returns our service object.
     *
     * @param $q
     * @param $timeout
     * @returns {{getStates: Function, getPrefix: Function}}
     */
    $get($q, $timeout) {
        this.$q = $q;

        return {
            getStates: () => {
                // completely needless use of a promise, just to show that the $q & $timeout dependencies are working correctly
                var deferred = this.$q.defer();
                $timeout(() => deferred.resolve(this.states), 100);
                return deferred.promise;
            },
            getPrefix: () => this.prefix
        };
    }
}

register.provider('states', StatesProvider);