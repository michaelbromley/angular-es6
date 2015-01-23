define(["exports", "angular"], function (exports, _angular) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  exports.directive = directive;
  exports.controller = controller;
  exports.service = service;
  var angular = _interopRequire(_angular);

  function directive(name, constructorFn) {
    var moduleName = arguments[2] === undefined ? "app" : arguments[2];
    angular.module(moduleName).directive(name, function () {
      return new constructorFn();
    });
  }

  function controller(name, contructorFn) {
    var moduleName = arguments[2] === undefined ? "app" : arguments[2];
    angular.module(moduleName).controller(name, contructorFn);
  }

  function service(name, contructorFn) {
    var moduleName = arguments[2] === undefined ? "app" : arguments[2];
    angular.module(moduleName).service(name, contructorFn);
  }
});