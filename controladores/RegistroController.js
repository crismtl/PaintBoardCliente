app.controller('RegistroController', ['$scope', 'UsuarioFactory', function($scope, UsuarioFactory) {

  $scope. nuevoUsuario = {
          nombre:'',
          apellido:'',
          fechaDeNacimiento:'',
          email:'',
          password:'',
          confirmar:''
      }

      $scope.agregarNuevoUsuario = function(){

          UsuarioFactory.save({
              nombre: $scope.nuevoUsuario.nombre,
              apellido: $scope.nuevoUsuario.apellido,
              fechaDeNacimiento: $scope.nuevoUsuario.fechaDeNacimiento,
              email: $scope.nuevoUsuario.email,
              password: $scope.nuevoUsuario.password
          })
          .$promise.then(
          function success(respuesta){
              console.log(respuesta);
              //$scope.entrenadores.push(respuesta.data);

          },
          function error(error){
              console.log(error);
          });


      }


}]);
