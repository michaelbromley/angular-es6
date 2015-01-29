/**
 * A thing is an object which will be instantiated and returned by the ThingFactory
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

/**
 * The ThingFactory class creates new things
 */
class ThingFactory {

    /*@ngInject*/
    constructor($timeout) {
        this.$timeout = $timeout;
    }

    newThing() {
        console.log('Getting a new Thing...');
        return this.$timeout(() => new Thing(), 100);
    }
}

register('app').factory('thingFactory', ThingFactory);