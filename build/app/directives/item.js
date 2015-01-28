"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var ItemDirective = (function () {
  function ItemDirective($interval) {
    this.template = "<div class=\"item\"><img ng-src=\"{{ model.image }}\" /></div>";
    this.restrict = "E";
    this.replace = true;
    this.scope = {
      model: "="
    };

    this.$interval = $interval;
  }
  ItemDirective.$inject = ["$interval"];

  _prototypeProperties(ItemDirective, null, {
    compile: {
      value: function compile(tElement) {
        tElement.css("position", "absolute");
        tElement.css("left", window.innerWidth / 2 - 150 + "px");
        tElement.css("top", window.innerHeight / 2 - 150 + "px");
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    link: {
      value: function link(scope, element) {
        var _this = this;


        var interval = Math.random() * 500 + 800;
        this.$interval(function () {
          return _this.move(element);
        }, interval);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    move: {
      value: function move(element) {
        var newPos = this.getNewPosition();
        element.css("left", newPos.x - 150 + "px");
        element.css("top", newPos.y - 150 + "px");
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getNewPosition: {
      value: function getNewPosition() {
        var width = window.innerWidth,
            height = window.innerHeight;

        return {
          x: Math.random() * width,
          y: Math.random() * height
        };
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return ItemDirective;
})();

register.directive("item", ItemDirective);