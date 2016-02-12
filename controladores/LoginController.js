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

    $scope.loginNormal = function() {
        UsuarioFactory.login({
                usuario: $scope.usuario.email,
                password: $scope.usuario.password
            })
            .$promise.then(
                function success(respuesta) {
                    console.log(respuesta);
                    //$scope.entrenadores.push(respuesta.data);

                },
                function error(error) {
                    console.log(error);
                });
    }
}]);
