app.controller('LoginController', ['$scope', 'UsuarioFactory', '$state', '$cookies', '$facebook', 'toastr',

    function ($scope, UsuarioFactory, $state, $cookies, $facebook, toastr) {
        /*$scope.isLoggedIn = false;
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
        refresh();*/

        $scope.usuario = {
            email: '',
            password: ''
        }

        $scope.login = function () {
            UsuarioFactory.login({
                email: $scope.usuario.email,
                password: $scope.usuario.password
            }).$promise.then(
                function success(respuesta) {
                    toastr.success('Bienvenido a Paint Board', 'Éxito');
                    $cookies.put('UsuarioId', respuesta.id);
                    $state.go('paintboard');
                },
                function error(error) {
                    console.log(error);
                    toastr.error('Algo salió mal con su ingreso', 'Error');
                });
        }
    }
]);