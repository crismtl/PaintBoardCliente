app.controller('RegistroController', ['$scope', '$state', '$cookies', 'toastr', 'UsuarioFactory', function ($scope, $state, $cookies, toastr, UsuarioFactory) {

    $scope.nuevoUsuario = {
        nombre: '',
        apellido: '',
        fechaDeNacimiento: '',
        email: '',
        password: '',
        confirmar: ''
    };

    $scope.agregarNuevoUsuario = function () {
        UsuarioFactory.save({
            nombre: $scope.nuevoUsuario.nombre,
            apellido: $scope.nuevoUsuario.apellido,
            fechaDeNacimiento: $scope.nuevoUsuario.fechaDeNacimiento,
            email: $scope.nuevoUsuario.email,
            password: $scope.nuevoUsuario.password
        }).$promise.then(
            function success(respuesta) {
                toastr.success('Éxito!', 'Se ingresó el Nuevo Usuario');
                $cookies.put('UsuarioId', respuesta.id);
                $state.go('miperfil');
            },
            function error(error) {
                toastr.error('Error!', 'No se ingresó el Nuevo Usuario');
                console.log(error);
            });
    }


}]);