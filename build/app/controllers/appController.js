define(["exports", "module", "../utils/annotations", "../services/itemsService"], function (exports, module, _utilsAnnotations, _servicesItemsService) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var register = _utilsAnnotations;
  var itemsService = _interopRequire(_servicesItemsService);

  console.log("appController.js");

  /**
   * The one and only controller used in this app.
   */
  var AppController = function AppController($scope, itemsService) {
    var vm = this;
    vm.items = [];
    vm.selection = [];

    itemsService.getItems().then(function (result) {
      return vm.items = result.data;
    });

    $scope.$watch("vm.items", function () {
      vm.selection = vm.items.filter(function (item) {
        return item.selected;
      });
    }, true);
  };
  AppController.$inject = ["$scope", "itemsService"];

  register.controller("AppController", AppController);

  module.exports = AppController;
});