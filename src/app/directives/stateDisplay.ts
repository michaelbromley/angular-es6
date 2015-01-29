/**
 * A directive class written in TypeScript.
 */
class StateDisplayDirective {

    private template;
    private restrict;
    private replace;
    private scope;
    private $interval;
    private states;

    /*@ngInject*/
    constructor($interval, states) {
        this.template = '<div class="state-label">{{ prefix }} {{ currentState }}</div>';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            start: '='
        };

        this.$interval = $interval;
        this.states = states;
    }

    link(scope) {

        scope.prefix = this.states.getPrefix();
        scope.currentState = this.states.getNextState();

        scope.$watch('start', (val) => {
            if (val) {
                this.$interval(() => scope.currentState = this.states.getNextState(), 3500);
            }
        });

    }
}


// Declare the register function in order to avoid TypeScript compiler errors.
declare var register : any;

register('app').directive('stateDisplay', StateDisplayDirective);