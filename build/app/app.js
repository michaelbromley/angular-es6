"use strict";

var app = angular.module("app", []);
var register = new Register(app);

app.constant("config", {
  apiUrl: "../api/"
});


app.config(["statesProvider", function (statesProvider) {
  statesProvider.setPrefix("You are feeling");
}]);