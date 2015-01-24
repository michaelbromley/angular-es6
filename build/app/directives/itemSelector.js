"use strict";

/**
 * This is an example of a "component" directive which encapsulates a template.
 */
var ItemSelectorDirective = function ItemSelectorDirective($timeout) {
  this.template = "<div class=\"items-selector\">Select your favourite items: <ul>" + "<li ng-repeat=\"item in collection\" selectable=\"item\">" + "<img ng-src=\"{{ item.thumb }}\" class=\"item-thumb\" />" + "<span class=\"item-name\">{{ item.name }}</span>" + "</li></ul></div>";
  this.restrict = "E";
  this.replace = true;
  this.scope = {
    collection: "="
  };
  this.$timeout = $timeout;
};
ItemSelectorDirective.$inject = ["$timeout"];

register.directive("itemSelector", ItemSelectorDirective);