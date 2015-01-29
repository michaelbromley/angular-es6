
var app = angular.module('app', []);

app.constant('config', {
    apiUrl: '../api/'
});


app.config((statesProvider) => {
    statesProvider.setPrefix('You are feeling');
});
