starter.controller('WatchGeoCtrl', function($scope, $cordovaGeolocation, $http, settings) {


  $scope.watchposition = function() {
    var watchOptions = {
      frequency: 300000,
      timeout: 10000,
      enableHighAccuracy: true // may cause errors if true
    };

    var onSuccess = function(position) {

      $http({
        method: 'POST',
        url: 'http://localhost:9090/places/save',
        data: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          accuracy: position.coords.accuracy
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(response, status, headers, config) {
        saveDetails(response);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert("something went wrong:" + status);
      });

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }



    var saveDetails = function(response) {

      settings.read('username').then(function(username) {

          var timestamp = new Date();
          timestamp = timestamp.getTime();
          $http({
            method: 'POST',
            url: 'http://localhost:9090/visitDetails/save/user/' + username + '/place/' +
              response,
            data: {
              timestamp: timestamp
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }).success(function(response, status, headers, config) {

          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("something went wrong:" + status);
          });
        },
        function(error) {
          $location.path('/app/firstUse');
        });
    };


    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, watchOptions);

  };

  $scope.watchGeolocationChange = function() {
    settings.write('watchGeolocation', $scope.geolocation.checked).then(function() {
      if ($scope.geolocation.checked) {
        $scope.watchposition();
      }
    },
      function(error) {
        console.log(error);
        $scope.log += 'error' + '\n';
      });
  };

  $scope.geolocation = {
    checked: false
  };

});
