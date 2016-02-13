app.controller('LoginController', ['$scope', 'UsuarioFactory', '$facebook', function($scope, UsuarioFactory, $facebook) {
    $scope.isLoggedIn = false;
    $scope.login = function() {
        $facebook.login().then(function() {
            refresh();
        });
    }

    function refresh() {
        $facebook.api("/me").then(
            function(response) {
                console.log(JSON.stringify(response));
                $scope.welcomeMsg = "Welcome " + response.name;
                $scope.isLoggedIn = true;
            },
            function(err) {
                $scope.welcomeMsg = "Please log in";
            });
    }
    refresh();

    $scope.usuario = {
        email: '',
        password: ''
    }

    $scope.loginConModelo = function() {
        UsuarioFactory.login({
            email: $scope.usuario.email,
            password: $scope.usuario.password
        }).$promise.then(
            function success(respuesta) {
                console.log('Logueado con modelo');
                console.log(respuesta);
            },
            function error(error) {
                console.log(error);
            });
    }
}]);
