app.controller('RegistroController', ['$scope', '$state', 'UsuarioFactory', function ($scope, $state, UsuarioFactory) {

    $scope.nuevoUsuario = {
        nombre: '',
        apellido: '',
        fechaDeNacimiento: '',
        email: '',
        password: '',
        confirmar: '',
        avatarUrl: '',
        avatarFd: '',
        url: ''

    }

    $scope.agregarNuevoUsuario = function () {

        UsuarioFactory.save({
                nombre: $scope.nuevoUsuario.nombre,
                apellido: $scope.nuevoUsuario.apellido,
                fechaDeNacimiento: $scope.nuevoUsuario.fechaDeNacimiento,
                email: $scope.nuevoUsuario.email,
                password: $scope.nuevoUsuario.password,
                avatarUrl: $scope.nuevoUsuario.avatarUrl,
                avatarFd: $scope.nuevoUsuario.avatarFd,
                url: $scope.nuevoUsuario.url

            })
            .$promise.then(
                function success(respuesta) {
                    console.log(respuesta);
                    return $state.go('home')
                        //$scope.entrenadores.push(respuesta.data);

                },
                function error(error) {
                    console.log(error);
                });


    }


}]);