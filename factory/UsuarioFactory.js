app.factory('UsuarioFactory', ['$resource', function($resource) {
  var factory = $resource('http://localhost:1337/Usuario/:idUsuario', {
    idUsuario: '@idUsuario'
  }, {
    actualizar: {
      method: 'PUT',
      params: {
        idUsuario: '@idUsuario'
      }
    },
    login: {
      url: 'http://localhost:1337/Usuario/login',
      method: 'POST'
    }
  });
  return factory;
}]);
