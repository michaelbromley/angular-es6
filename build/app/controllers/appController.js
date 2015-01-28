"use strict";

/**
 * The one and only controller used in this app.
 */
var AppController = function AppController($scope, itemsService, Thing) {
  var _this = this;
  this.items = [];
  this.selection = [];

  itemsService.getItems().then(function (result) {
    return _this.items = result;
  });

  $scope.$watch("vm.items", function () {
    _this.selection = _this.items.filter(function (item) {
      return item.selected;
    });
  }, true);

  this.makeThing = function () {
    new Thing();
  };
};
AppController.$inject = ["$scope", "itemsService", "Thing"];

register.controller("AppController", AppController);