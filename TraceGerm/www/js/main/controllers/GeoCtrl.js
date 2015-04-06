starter.controller('GeoCtrl', function($scope, $cordovaGeolocation) {

  $scope.getCurrentPosition = function() {
    var onSuccess = function(position) {
      alert('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Timestamp: ' + position.timestamp + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      maximumAge: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    });
  };

});