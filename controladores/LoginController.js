app.controller('LoginController', ['$scope', '$facebook', function($scope, $facebook) {
    console.log('entrando login');
    $scope.isLoggedIn = false;
    $scope.login = function() {
        $facebook.login().then(function() {
            refresh();
        });
    }

    function refresh() {
        $facebook.api("/me").then(
            function(response) {
            	console.log(JSON.stringify(response));
                $scope.welcomeMsg = "Welcome " + response.name;
                $scope.isLoggedIn = true;
            },
            function(err) {
                $scope.welcomeMsg = "Please log in";
            });
    }
    refresh();
}]);
