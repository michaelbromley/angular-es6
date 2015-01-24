"use strict";

/**
 * The one and only controller used in this app.
 */
var AppController = function AppController($scope, itemsService) {
  var vm = this;
  vm.items = [];
  vm.selection = [];

  itemsService.getItems().then(function (result) {
    return vm.items = result;
  });

  $scope.$watch("vm.items", function () {
    vm.selection = vm.items.filter(function (item) {
      return item.selected;
    });
  }, true);
};
AppController.$inject = ["$scope", "itemsService"];

register.controller("AppController", AppController);