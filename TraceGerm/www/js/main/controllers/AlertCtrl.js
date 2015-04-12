starter.controller('AlertCtrl', function($scope, $http, settings) {
  $scope.createAlert = function() {

    settings.read('username').then(function(username) {

        var timestamp = new Date();
        timestamp = timestamp.getTime();
        $http({
          method: 'POST',
          url: 'http://localhost:9090/alerts/save/user/' + username + '/place/1',
          data: {
            timestamp: timestamp
          },
          headers: {
            'Content-Type': 'application/json',
          }
        }).success(function(data, status, headers, config) {
          //handles succesfull method
        }).error(function(data, status, headers, config) {

        });
      },
      function(error) {
        $location.path('/app/firstUse');
      });

  };
});