import angular from 'angular';

export function directive(name, constructorFn, moduleName = 'app') {
    angular.module(moduleName).directive(name, () =>  new constructorFn() );
}

export function controller(name, contructorFn, moduleName = 'app') {
    angular.module(moduleName).controller(name, contructorFn);
}

export function service(name, contructorFn, moduleName = 'app') {
    angular.module(moduleName).service(name, contructorFn);
}