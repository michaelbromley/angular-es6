# Angular ES6

An example approach to using ES6 classes in an AngularJS 1.x app.

#### Please see the article [Exploring ES6 Classes In AngularJS 1.x](http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x) for
a full explanation.

## register.js

The style of class definition you see below is enabled by including the file [register.js](src/app/utils/register.js) in the project, which exposes the global function `register`

The API is as follows:

```JavaScript
class MyAngularComponent {
    // ...
}

register(appName)
    .controller('MyController', MyAngularComponent)
    .service('myService', MyAngularComponent)
    .provider('myOtherService', MyAngularComponent)
    .factory('myFactory', MyAngularComponent)
    .directive('myDirective', MyAngularComponent);
```

## Example Component Classes

### Service

```JavaScript
class UserService {
    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }
    getFullName() {
        return this.$http.get('api/user/details');
    }
}

register('app').service('userService', UserService);
```

### Controller

```JavaScript
class MyController {
    /*@ngInject*/
    constructor(userService) {
        userService.getFullName()
            .then(result => this.userName = result.fullName);
    }
}

register('app').controller('MyController', MyController);
```

### Factory

```JavaScript
class ThingFactory {
    /*@ngInject*/
    constructor($timeout) {
        this.$timeout = $timeout;
    }
    newThing() {
        console.log('Getting a new Thing...');
        return this.$timeout(() => new Thing(), 1000);
    }
}

register('app').factory('thingFactory', ThingFactory);
```

### Directive

```JavaScript
class MyDirective {
    /*@ngInject*/
    constructor($interval) {
        this.template = '<div>I\'m a directive!</div>';
        this.restrict = 'E';
        this.scope = {}
        // etc. for the usual config options

        // allows us to use the injected dependencies
        // elsewhere in the directive (e.g. compile or link function)
        this.$interval = $interval;
    }
    // optional compile function
    compile(tElement) {
        tElement.css('position', 'absolute');
    }
    // optional link function
    link(scope, element) {
        this.$interval(() => this.move(element), 1000);
    }
    move(element) {
        element.css('left', (Math.random() * 500) + 'px');
        element.css('top', (Math.random() * 500) + 'px');
    }
}

register('app').directive('myDirective', MyDirective);
```

### Provider

```JavaScript
class ThingServiceProvider {
    constructor() {
        this.apiPath = 'default/api';
    }
    setApiPath(value) {
        this.apiPath = value;
    }
    /*@ngInject*/
    $get($http) {
        return {
            getThings: () => $http.get(this.apiPath)
        };
    }
}

register('app').provider('thingService', ThingServiceProvider);
```

## Build

Clone this repo and then `npm install` and `bower install` to download the required dependencies.

Then `gulp watch` and start hacking!

## License

MIT