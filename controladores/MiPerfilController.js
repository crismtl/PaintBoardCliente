app.controller('MiPerfilController', ['$scope', '$state', '$cookies', 'UsuarioFactory', function ($scope, $state, $cookies, UsuarioFactory) {
    var id = $cookies.get('UsuarioId');

    UsuarioFactory.get({
        idUsuario: id
    }).$promise.then(
        function success(respuesta) {
            console.log(respuesta);
            $scope.usuario = respuesta;
        },
        function error(error) {
            console.log(error);
        }
    );

    $scope.salir = function () {
        $cookies.remove('UsuarioId');
        $state.go('login');
    }
}]);