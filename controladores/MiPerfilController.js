app.controller('MiPerfilController', ['$scope', '$state', '$cookies', 'UsuarioFactory', function ($scope, $state, $cookies, UsuarioFactory) {
    var id = $cookies.get('UsuarioId');
    $scope.nuevoUsuario = {
        nombre: '',
        apellido: '',
        fechaDeNacimiento: '',
        email: '',
        foto: ''

    }

    UsuarioFactory.get({
        idUsuario: id
    }).$promise.then(
        function success(respuesta) {
            console.log(respuesta);
            $scope.nuevoUsuario = respuesta;
        },
        function error(error) {
            console.log(error);
        }
    );
    /*
        $scope.editarUsuario = function () {
      		UsuarioFactory.actualizar({
      			idUsuario: nuevoUsuario.id
      		}, {
      			nombre: $scope.nuevoUsuario.nombre,
      			apellido: $scope.nuevoUsuario.apellido,
            fechaDeNacimiento: $scope.nuevoUsuario.fechaDeNacimiento
      		  email: $scope.nuevoUsuario.email,
            foto: $scope.nuevoUsuario.foto

      		}).$promise.then(
      			function correctoLlamoUsuarios(respuesta) {
      				console.log(respuesta);
              $scope.nuevoUsuario = respuesta;
      			},
      			function errorNoLlamoUsuarios(error) {
      				console.log(error);
      			});

      	};
    */
    $scope.salir = function () {
        $cookies.remove('UsuarioId');
        $state.go('login');
    }
}]);