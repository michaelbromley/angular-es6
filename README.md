# Angular ES6

This is a project that I am using to explore some ways of writing AngularJS apps using ES6 features. This is experimental
and not intended for production use, or even as a recommendation of a good way of doing things.

This is also my first foray into writing ES6 code, so forgive any silly mistakes or oversights.

### [View the demo in action](http://www.michaelbromley.co.uk/experiments/angular-es6-demo/build/)

## Motivation

Attempt to approach the style given in previews of Angular 2.0, e.g [this slide from Igor Minar & Tobias Bosch's presentation
at ngEurope 2014](https://docs.google.com/presentation/d/1XQP0_NTzCUcFweauLlkZpbbhNVYbYy156oD--KLmXsk/edit#slide=id.g49458163d_026)

The general idea is to use classes and remove the Angular boilerplate wherever possible.

These patterns could also prove useful in TypeScript projects, which use the same class syntax as ES6.

## Feedback

Is this a sensible way of writing an Angular app? Are there any major problems I have overlooked with this approach?
Could you improve upon it?

Open an issue and let me know! I am keen to hear what other Angular devs think of this stuff.

## Explanation

In this demo, I have made a simple app with a few directives, a controller, and a service.

### Controllers & Services

For controllers and services, the pattern is very simple. Here is the Angular 2.0 example from the ngEurope talk:

```JavaScript
class TodoStore {
  constructor(win:Window) {
    this.win = win;
  }
  add(todo) {
    // access this.win.localStorage ...
  }
  remove(todo) { ... }
  todosOf(filter) {  ... }
}
```

We can do the same with ES6 classes (minus the type annotations), and then register it with our Angular module below:

```JavaScript
class MyClass {
    constructor(myDependency) {
        this.dependency = myDependency;
    }

    myMethod(input) {
        return this.dependency.doStuff(input);
    }
}

angular.module('app')
    .controller('MyController', MyClass); // or .service('myService', MyClass);
```

This works because Angular treats the functions passed to the `module.controller()` and `module.service()` methods as
constructor functions, and instantiates them with `new` (see [the docs on this](https://docs.angularjs.org/api/ng/type/angular.Module))

### Directives

Here is the example of a directive definition in Angular 2.0:

```JavaScript
@ComponentDirective
class SantaTodoApp {
  constructor() {
    this.newTodoTitle = '';
  }
  addTodo: function() { ... }
  removeTodo: function(todo) { ... }
  todosOf: function(filter) { ... }
}
```

In Angular 1.x, defining directives as a class presents
 a problem, since the `module.directive()` method expects a factory function, rather than a constructor.

 To get around this, I have been experimenting with a way to take a class definition for a directive, and then
 dynamically construct a factory function that is of the format the Angular expects.

Consider the following directive class:

```JavaScript
class MyDirective {

    constructor($interval) {
        this.template = '<div class="item"><img ng-src="{{ model.image }}" /></div>';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            model: '='
        };

        this.$interval = $interval;
    }

    compile(tElement) {
        tElement.css('position', 'absolute');
    }

    link(scope, element) {
        this.$interval(() => this.move(element), 1000);
    }

    move(element) {;
        element.css('left', (Math.random() * 500) + 'px');
        element.css('top', (Math.random() * 500) + 'px');
    }
}
```

A few things to note:

* All values of the "directive definition object" config is contained in the constructor as a property of `this`, apart from the `compile` and `link`
functions (if they exist).
* The compile and link functions are just regular class methods. Note that the compile function does not have to return the
link function. The reason for this is that it was introducing scoping problems when using `this`. It also looks cleaner, in my opinion.

To convert this into a factory function that Angular 1.x can use, we need two things:

1. The constructor function needs to have it's dependencies defined via the `$inject` property. This can be added manually, or in the case
of this project, it is added in a build step by the ng-annotate task.
2. A method is needed to read those dependencies, and inject them as arguments into a factory function that we will give to Angular's `module.directive()` method.

Here is my attempt to do this, with comments to explain what is going on:

```JavaScript
if (constructorFn.prototype.compile) {

    var originalCompileFn = this._cloneFunction(constructorFn.prototype.compile);

    // Decorate the compile method to automatically return the link method (if it exists)
    // and bind it to the context of the constructor (so `this` works correctly).
    // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
    // returns `this.link` from within the compile function.
    this._override(constructorFn.prototype, 'compile', function (original) {
        return function () {
            originalCompileFn.apply(this, arguments);

            return constructorFn.prototype.link.bind(this);
        };
    });
}

// get the array of dependencies that are needed by this directive
var args = constructorFn.$inject || [];

var factory = args.slice(); // create a copy of the array

// The `factory` array uses Angular's array notation whereby each element of the array is the name of a
// dependency, and the final item is the factory function itself.
factory.push((...args) => {
    return this._construct(constructorFn, args);
});

angular.module('app').directive(name, factory); // register the directive with the Angular app
```

## The `Register` Utility

This is all wrapped up in a utility class named `Register` - [see the source here](src/app/utils/register.js), which
provides a simplified and consistent API over the top of `angular.module`:

```JavaScript
register.directive('itemSelector', ItemSelectorDirective);
```

## To Do

* I initially attempted to use ES6 modules, but I had trouble getting it to work. Probably due to my own inexperience with requirejs. This is
a major ES6 feature that would need to be incorporated.
* I have not yet attempted to make a wrapper for factories or providers. If a factory is declared as a class, it may be indistinguishable from
a service and therefore it might not make sense to use both. Providers would require a bit more work to integrate.
