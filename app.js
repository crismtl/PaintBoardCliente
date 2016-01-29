var app = angular.module('paintboard', ['ui.router', 'ngAnimate', 'ngResource', 'toastr']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('chat', {
      url: "/chat",
      templateUrl: "rutas/chat.html",
      controller: 'ChatController'
    });
  $urlRouterProvider.otherwise("/chat");
});
