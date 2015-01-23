define(["exports"], function (exports) {
  "use strict";

  var _prototypeProperties = function (child, staticProps, instanceProps) {
    if (staticProps) Object.defineProperties(child, staticProps);
    if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
  };

  /**
   * This is an example of a "behavioural" directive that has no template, but decorates the behaviour of the
   * element which it is attached to.
   *
   * The directive makes an element "selectable", which means when it is clicked, the class `selected` will be added to the element, and if a
   * object is supplied as the value of the "selectable" attribute, the directive will attempt to add a property `selected = true` to that
   * object.
   */
  var Selectable = (function () {
    function Selectable() {
      this.restrict = "A";
    }

    _prototypeProperties(Selectable, null, {
      compile: {
        value: function compile(tElement) {
          tElement.addClass("selectable");

          return this.link;
        },
        writable: true,
        enumerable: true,
        configurable: true
      },
      link: {
        value: function link(scope, element, attrs) {
          var model = scope.$eval(attrs.selectable) || {};

          element.on("click", function () {
            scope.$apply(function () {
              element.toggleClass("selected");
              model.selected = !model.selected;
            });
          });
        },
        writable: true,
        enumerable: true,
        configurable: true
      }
    });

    return Selectable;
  })();

  angular.module("app").directive("selectable", function () {
    return new Selectable();
  });
});