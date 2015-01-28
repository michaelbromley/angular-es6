/**
 * In this case, a factory is being used to house an instantiable class which can be injected with Angular's DI system.
 * So in our controller, we can require `Thing` and then manually instantiate it by invoking `new Thing()` in the
 * controller code.
 */
class Thing {

    constructor() {
        var time = new Date().getTime();
        console.log(`Created a new Thing at ${time}!`);

        this.explode();
    }

    explode() {
        console.log('BOOM!');
    }

}

register.factory('Thing', Thing);