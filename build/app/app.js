"use strict";

var app = angular.module("app", []);
var register = new Annotations(app);

app.constant("config", {
  apiUrl: "../api/"
});
/*
app.config(($injector) => {
    register = new Annotations(app, $injector);
});*/

/*app.run(($injector) => {
    register = new Annotations(app, $injector);
});*/


angular.element(document).ready(function () {
  angular.bootstrap(document, ["app"]);
});