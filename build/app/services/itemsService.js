define(["exports", "module", "../utils/annotations"], function (exports, module, _utilsAnnotations) {
  "use strict";

  var _prototypeProperties = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  var register = _utilsAnnotations;


  /**
   * Provides access to the JSON endpoint which contains the data about the items.
   */
  var ItemsService = (function () {
    function ItemsService($http) {
      this.$http = $http;
    }
    ItemsService.$inject = ["$http"];

    _prototypeProperties(ItemsService, null, {
      getItems: {
        value: function getItems() {
          return this.$http.get("../api/items");
        },
        writable: true,
        enumerable: true,
        configurable: true
      }
    });

    return ItemsService;
  })();

  register.service("itemsService", ItemsService);

  module.exports = ItemsService;
});