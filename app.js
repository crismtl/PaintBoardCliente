var app = angular.module('paintboard', ['ui.router', 'ngAnimate', 'ngResource', 'toastr']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('chat', {
      url: "/chat",
      templateUrl: "rutas/chat.html",
      controller: 'ChatController'
    })
    .state('home', {
      url: "/home",
      templateUrl: "rutas/home.html",
    //  controller: 'ChatController'
    })
    .state('acerca', {
      url: "/acerca",
      templateUrl: "rutas/acerca.html",
    //  controller: 'ChatController'
    })
    .state('login', {
      url: "/login",
      templateUrl: "rutas/login.html",
    //  controller: 'ChatController'
    })
    .state('registro', {
      url: "/registro",
      templateUrl: "rutas/registro.html",
    //  controller: 'ChatController'
    })
    .state('canvas', {
      url: "/canvas",
      templateUrl: "rutas/canvas.html",
      controller: 'CanvasController'
    });
  $urlRouterProvider.otherwise("/home");
});
