define(["exports"], function (exports) {
  "use strict";

  /**
   * This is an example of a "component" directive which encapsulates a template.
   */
  var ItemSelectorDirective = function ItemSelectorDirective() {
    this.template = "<div>Select your favourite items: <ul><li ng-repeat=\"item in collection\" selectable=\"item\" >{{ item.name }} <span ng-show=\"item.selected\">Selected</span></span></li></ul></div>";
    this.restrict = "E";
    this.replace = true;
    this.scope = {
      collection: "="
    };
  };

  directive("app", "itemSelector", ItemSelectorDirective);
});