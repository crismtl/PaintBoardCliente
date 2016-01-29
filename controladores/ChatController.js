app.controller('ChatController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
  $scope.nuevoMensaje;
  $scope.enviar =  function() {
    console.log($scope.nuevoMensaje);
  }
}]);
