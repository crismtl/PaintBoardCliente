app.controller('ChatController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
  $scope.nuevoMensaje;
  //Nos suscribimos gracias al 'Blueprint' de Sailsjs con el modelo Chat
  //Ademas de esto Sails nos trae todos los datos del servidor
  //Aqui populamos la variable 'chatsWs'
  io.socket.get('http://localhost:1337/Mensaje',
    function(resData, jwres) {
      console.log('Se suscribio con blueprint de Sailsjs')
      console.log(resData);
      $scope.mensajes = resData;
      //$digest() es necesario para que se actualice en la vista
      $scope.$digest();
    });

  //Nos suscribimos con el metodo suscribirseOPublicar dentro del controlador de Chat en Sailsjs que nosotros creamos
  io.socket.get('http://localhost:1337/Mensaje/suscribirseOPublicar',
    function(resData, jwres) {
      console.log('Se suscribio con nuestro metodo suscribirseOPublicar...');
      console.log(jwres);
      console.log('No hay datos porq es nuestro metodo...');
      console.log(resData);
    });

  //Creamos un nuevo chat mediante WebSockets
  $scope.enviar = function() {
    console.log('Entro a llamada con WebSocket');
    io.socket.post(
      'http://localhost:1337/Mensaje/suscribirseOPublicar', {
        texto: $scope.nuevoMensaje
      });
    $scope.nuevoMensaje = "";
  }

  //Escuchamos que el servidor nos responda 'Chat' (nombre de modelo en sails)
  //para saber si se actualizo, borro, creo o modifico un registro
  io.socket.on('mensaje', function(objQueLLegaCuandoCreaUnChat) {
    console.log('Respondio del Servidor');
    console.log(objQueLLegaCuandoCreaUnChat);
    console.log('Verbo');
    console.log(objQueLLegaCuandoCreaUnChat.verb);

    //Aqui esta implementado solamente cuando el servidor nos responde que creamos un registro
    if (objQueLLegaCuandoCreaUnChat.verb === 'created') {
      //Agregamos tanto al arreglo 'chatsHttp' como al arreglo 'chatsWs'
      $scope.mensajes.push(objQueLLegaCuandoCreaUnChat.data);
      $scope.$digest();
    }
    if (objQueLLegaCuandoCreaUnChat.verb === 'destroyed') {
      //Escribir el codigo para cuando se borre un registro, buscarlo en nuestro arreglo local
      //y eliminarlo del arreglo
      $scope.$digest();
    }
    if (objQueLLegaCuandoCreaUnChat.verb === 'updated') {
      //Escribir el codigo para cuando se actualice un registro, buscarlo en nuestro arreglo local
      //y actualizarlo
      $scope.$digest();
    }
  });
}]);
