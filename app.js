var app = angular.module('paintboard', ['ui.router', 'ngAnimate', 'ngResource', 'toastr']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('chat', {
      url: "/chat",
      templateUrl: "rutas/chat.html",
      controller: 'ChatController'
    })
    .state('canvas', {
      url: "/canvas",
      templateUrl: "rutas/canvas.html",
      controller: 'CanvasController'
    });
  $urlRouterProvider.otherwise("/chat");
});
