/**
 * Created by anasko on 31/10/16.
 */
services.factory('PositionService', ['HttpSecure', '$cordovaGeolocation', function (HttpSecure, $cordovaGeolocation) {

  var watchOptions = {timeout: 10000, enableHighAccuracy: true};
  var watch;


  return {
    watchPosition: function () {
      watch = $cordovaGeolocation.watchPosition(watchOptions);
      watch.then(
        null,
        function (err) {
          console.log(JSON.stringify(err));
        },
        function (rawPosition) {
          var position = {
            position: {
              latitude: rawPosition.coords.latitude,
              longitude: rawPosition.coords.longitude
            },
            accuracy: rawPosition.coords.accuracy,
            timestamp: rawPosition.timestamp
          };
          HttpSecure.post(apiUrl + '/places', position).success(function (response) {
            console.log(JSON.stringify(response));
          }).catch(function (response) {
            console.log(JSON.stringify(response));
          });
        });
    },

    stopWatchingPosition: function () {
      if (watch) {
        watch.clearWatch();
      }
    },
    getCurrentPosition: function () {
      return $cordovaGeolocation.getCurrentPosition(watchOptions);
    },
    getLast10Positions: function () {
      return HttpSecure.get(apiUrl + '/places/user/lastPlaces');
    }
  }
}]);
