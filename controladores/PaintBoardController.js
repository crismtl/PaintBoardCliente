app.controller('PaintBoardController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {
    toastr.info('Info', 'Bienvenido a PaintBoard');

    $scope.nuevoMensaje = {
        texto: '',
        idUsuario: ''
    }

    io.socket.get('http://localhost:1337/Mensaje',
        function (resData, jwres) {
            console.log('Se suscribio con blueprint de Sailsjs')
            console.log(resData);
            $scope.mensajes = resData;
            $scope.$digest();
        });

    io.socket.get('http://localhost:1337/Mensaje/suscribirseOPublicar',
        function (resData, jwres) {
            console.log('Se suscribio con nuestro metodo suscribirseOPublicar...');
            console.log(jwres);
            console.log('No hay datos porq es nuestro metodo...');
            console.log(resData);
        });

    $scope.enviar = function () {
        io.socket.post(
            'http://localhost:1337/Mensaje/suscribirseOPublicar', {
                texto: $scope.nuevoMensaje.texto,
                idUsuario: $scope.idUsuario
            });
        $scope.nuevoMensaje = "";
    }

    io.socket.on('mensaje', function (obj) {
        console.log('Respondio del Servidor');
        console.log(obj);
        console.log('Verbo');
        console.log(obj.verb);

        if (obj.verb === 'created') {
            $scope.mensajes.push(obj.data);
            $scope.$digest();
        }
        /*if (obj.verb === 'destroyed') {
            //Escribir el codigo para cuando se borre un registro, buscarlo en nuestro arreglo local
            //y eliminarlo del arreglo
            $scope.$digest();
        }
        if (objQueLLegaCuandoCreaUnChat.verb === 'updated') {
            //Escribir el codigo para cuando se actualice un registro, buscarlo en nuestro arreglo local
            //y actualizarlo
            $scope.$digest();
        }*/
    });
}]);