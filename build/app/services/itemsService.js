"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * Provides access to the JSON endpoint which contains the data about the items.
 */
var ItemsService = (function () {
  function ItemsService($http, config) {
    this.$http = $http;
    this.config = config;
  }

  _prototypeProperties(ItemsService, null, {
    getItems: {
      value: function getItems() {
        var apiUrl = this.config.apiUrl;

        return this.$http.get(apiUrl + "items").then(function (result) {
          // prepend the API url to the images
          return result.data.map(function (item) {
            item.image = apiUrl + item.image;
            item.thumb = apiUrl + item.thumb;
            return item;
          });
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return ItemsService;
})();

register("app").service("itemsService", ItemsService);