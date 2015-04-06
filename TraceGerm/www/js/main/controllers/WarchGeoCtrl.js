starter.controller('WatchGeoCtrl', function($scope, $cordovaGeolocation, $http) {

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
      }).success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        alert("data was send successfully");
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

    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, watchOptions);

  };

})