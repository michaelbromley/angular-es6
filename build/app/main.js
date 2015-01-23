define(["exports"], function (exports) {
  "use strict";

  require.config({
    paths: {
      angular: "../../bower_components/angular/angular"
    },
    shim: {
      angular: {
        exports: "angular"
      }
    }
  });

  require(["angular", "app", "controllers/appController"], function (angular) {
    console.log("bootstrapping");
    angular.bootstrap(document, ["app"]);
  });
});