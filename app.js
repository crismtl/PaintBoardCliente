io.sails.url = "http://localhost:1337";

var app = angular.module('paintboard', ['ui.router', 'ngAnimate', 'ngResource', 'toastr', 'ngFacebook', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider, $facebookProvider) {
    $facebookProvider.setAppId('946903475391684');
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "rutas/home.html",
            //  controller: 'ChatController',
            data: {
                nivelDeAcceso: 0,
                loginRequerido: false
            }
        })
        .state('acercade', {
            url: "/acercade",
            templateUrl: "rutas/acercade.html",
            //  controller: 'ChatController',
            data: {
                nivelDeAcceso: 0,
                loginRequerido: false
            }
        })
        .state('registro', {
            url: "/registro",
            templateUrl: "rutas/registro.html",
            controller: 'RegistroController',
            data: {
                nivelDeAcceso: 0,
                loginRequerido: false
            }
        })
        .state('login', {
            url: "/login",
            templateUrl: "rutas/login.html",
            controller: 'LoginController',
            data: {
                nivelDeAcceso: 0,
                loginRequerido: false
            }
        })
        .state('paintboard', {
            url: "/paintboard",
            templateUrl: "rutas/paintboard.html",
            //controller: 'CanvasController',
            data: {
                nivelDeAcceso: 1,
                loginRequerido: false
            }
        })
        .state('miperfil', {
            url: "/miperfil",
            templateUrl: "rutas/miperfil.html",
            //controller: 'CanvasController',
            data: {
                nivelDeAcceso: 1,
                loginRequerido: false
            }
        })
        .state('canvas', {
            url: "/canvas",
            templateUrl: "rutas/canvas.html",
            controller: 'CanvasController',
            data: {
                nivelDeAcceso: 1,
                loginRequerido: true
            }
        })
        .state('chat', {
            url: "/chat",
            templateUrl: "rutas/chat.html",
            controller: 'ChatController',
            data: {
                nivelDeAcceso: 1,
                loginRequerido: true
            }
        });
    $urlRouterProvider.otherwise("/");
});

app.run(function($rootScope, $cookies, $state) {
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

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        var requiereLogin = toState.data.loginRequerido;
        var nivelAcceso = toState.data.nivelDeAcceso;

        if (requiereLogin) {
            console.log('Si require Login');
            if ($cookies.get('UsuarioId')) {
                console.log('hizo Login');
                console.log(nivelAcceso);
            } else {
                console.log('No ha hecho Login');
                event.preventDefault();
                return $state.go('login')
            }
        } else {
            console.log('No requiere login');
        }
    });
});
