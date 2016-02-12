io.sails.url = "http://localhost:1337";

var app = angular.module('paintboard', ['ui.router', 'ngAnimate', 'ngResource', 'toastr', 'ngFacebook']);

app.config(function($stateProvider, $urlRouterProvider, $facebookProvider) {
    console.log('entro config');
    $facebookProvider.setAppId('946903475391684');
    $stateProvider
        .state('chat', {
            url: "/chat",
            templateUrl: "rutas/chat.html",
            controller: 'ChatController'
        })
        .state('home', {
            url: "/",
            templateUrl: "rutas/home.html",
            //  controller: 'ChatController'
        })
        .state('acercade', {
            url: "/acercade",
            templateUrl: "rutas/acercade.html",
            //  controller: 'ChatController'
        })
        .state('login', {
            url: "/login",
            templateUrl: "rutas/login.html",
            controller: 'LoginController'
        })
        .state('registro', {
            url: "/registro",
            templateUrl: "rutas/registro.html",
            controller: 'RegistroController'
        })
        .state('canvas', {
            url: "/canvas",
            templateUrl: "rutas/canvas.html",
            controller: 'CanvasController'
        })
        .state('paintboard', {
            url: "/paintboard",
            templateUrl: "rutas/paintboard.html",
            //controller: 'CanvasController'
        });
    $urlRouterProvider.otherwise("/");
});

app.run(function($rootScope) {
    console.log('entro run');
    // Load the facebook SDK asynchronously
    (function() {
        // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) {
            return;
        }

        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];

        // Create a new script element and set its id
        var facebookJS = document.createElement('script');
        facebookJS.id = 'facebook-jssdk';

        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/en_US/all.js';

        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
    }());
});
