io.sails.url = "http://localhost:1337";

var app = angular.module('paintboard', ['ui.router', 'ngAnimate', 'ngResource', 'toastr', 'ngFacebook', 'ngCookies']);

app.config(function ($stateProvider, $urlRouterProvider, $facebookProvider, toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });

    $facebookProvider.setAppId('946903475391684');
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "rutas/home.html",
            data: {
                loginRequerido: false
            }
        })
        .state('acercade', {
            url: "/acercade",
            templateUrl: "rutas/acercade.html",
            data: {
                loginRequerido: false
            }
        })
        .state('registro', {
            url: "/registro",
            templateUrl: "rutas/registro.html",
            controller: 'RegistroController',
            data: {
                loginRequerido: false
            }
        })
        .state('login', {
            url: "/login",
            templateUrl: "rutas/login.html",
            controller: 'LoginController',
            data: {
                loginRequerido: false
            }
        })
        .state('miperfil', {
            url: "/miperfil",
            templateUrl: "rutas/miperfil.html",
            controller: 'MiPerfilController',
            data: {
                loginRequerido: true
            }
        })
        .state('canvas', {
            url: "/canvas",
            templateUrl: "rutas/canvas.html",
            controller: 'CanvasController',
            data: {
                loginRequerido: false
            }
        })
        .state('chat', {
            url: "/chat",
            templateUrl: "rutas/chat.html",
            controller: 'ChatController',
            data: {
                loginRequerido: true
            }
        });
    $urlRouterProvider.otherwise("/");
});

app.run(function ($rootScope, $cookies, $state, toastr) {
    /*// Load the facebook SDK asynchronously
    (function () {
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
    }());*/

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requiereLogin = toState.data.loginRequerido;

        if (requiereLogin) {
            if ($cookies.get('UsuarioId')) {
                toastr.success('Felicidades se encuentra logueado', 'Éxito');
            } else {
                toastr.info('Necesita estar logueado para poder acceder a esta vista', 'Información');
                event.preventDefault();
                return $state.go('login')
            }
        }
    });
});
