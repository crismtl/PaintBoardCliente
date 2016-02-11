app.factory('UsuarioFactory', ['$resource', function($resource) {
  var factory = $resource('http://localhost:1337/Usuario/:idUsuario', {
    idUsuario: '@idUsuario'
  }, {
    update: {
      method: 'PUT',
      params: {
        idUsuario: '@idUsuario'
      }
    }
  });
  return factory;
}]);
