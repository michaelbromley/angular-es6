"use strict";

/**
 * The one and only controller used in this app.
 */
var AppController = function AppController($scope, itemsService, thingFactory) {
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
    thingFactory.newThing();
  };


  this.$inject = ["$scope", "itemService", "Thing"];
};

register("app").controller("AppController", AppController);