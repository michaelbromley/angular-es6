/**
 * Example of a provider which can be configured at runtime in a `config()` block with the `setPrefix()` method.
 */
class StatesProvider {

    constructor() {
        this.prefix = "You are";
        this.states = [
            'okay',
            'not too bad',
            'contented',
            'quite satisfied',
            'moderately gratified',
            'well chuffed',
            'highly pleased',
            'highly pleased indeed'
        ];
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
     * @returns {{getNextState: Function, getPrefix: Function}}
     */
    /*@ngInject*/
    $get($timeout) {
        var index = 0;
        $timeout(() => console.log('This is the statesProvider $get method being invoked.'), 100);

        return {
            getNextState: () => {
                var currentState;

                if (index < this.states.length) {
                    currentState = this.states[index];
                } else {
                    currentState = this.states[this.states.length - 1];
                }

                index ++;
                return currentState;
            },
            getPrefix: () => this.prefix
        };
    }
}

register('app').provider('states', StatesProvider);