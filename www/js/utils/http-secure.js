/**
 * Created by anasko on 30/10/16.
 */
/**
 * Created by anasko on 29/10/16.
 */
services.factory('HttpSecure', ['$http', '$ionicPlatform', '$cordovaPreferences',
  function ($http, $ionicPlatform, $cordovaPreferences) {
    // Might use a resource here that returns a JSON array

    authToken = '';

    return {
      get: function (url) {
        return $http({
          method: 'GET',
          url: url,
          headers: {
            'X-Auth-Token': authToken
          }
        });
      },

      post: function (url, data) {
        return $http({
          method: 'POST',
          url: url,
          data: data,
          headers: {
            'X-Auth-Token': authToken
          }
        });
      },
      put: function (url, data) {
        return $http({
          method: 'PUT',
          url: url,
          data: data,
          headers: {
            'X-Auth-Token': authToken
          }
        });
      },
      setAuthToken: function () {
        $ionicPlatform.ready(function () {
          $cordovaPreferences.fetch('X-Auth-Token')
            .success(function (response) {
              authToken = response;
            })
            .error(function (error) {
              console.log(error)
            });
        });
      }
    }
  }]);
