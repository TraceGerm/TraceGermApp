starter.controller('UserCtrl', function($rootScope, $scope, $http, $ionicPopup) {

  $scope.save = function() {

    $http({
      method: 'POST',
      url: 'http://localhost:9090/places/save',
      data: {
        longitude: '56.215'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).success(function(data, status, headers, config) {
      //handles succesfull method
    }).error(function(data, status, headers, config) {
      /*handle non 200 statuses*/
    });

    $http({
      method: 'POST',
      url: 'http://localhost:9090/visitDetails/save?username=gg',
      data: {
        timeStamp: '56215'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
});