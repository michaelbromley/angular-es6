"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * This is an example of a "component" directive which encapsulates a template.
 */
var ItemDisplayDirective = (function () {
  function ItemDisplayDirective() {
    this.template = "<div class=\"item-display-container\"><item ng-repeat=\"item in items\" model=\"item\"></item></div>";
    this.restrict = "E";
    this.replace = true;
    this.scope = {
      collection: "=",
      start: "="
    };
  }

  _prototypeProperties(ItemDisplayDirective, null, {
    link: {
      value: function link(scope) {
        scope.$watch("start", function (value) {
          if (value) {
            scope.items = scope.collection;
          }
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return ItemDisplayDirective;
})();

register.directive("itemDisplay", ItemDisplayDirective);