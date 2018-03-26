/**
 * Created by anasko on 29/10/16.
 */
services.factory('LoginService', ['$http', 'HttpSecure', function($http, HttpSecure) {
    // Might use a resource here that returns a JSON array


    return {
      login: function(loginInfo) {
        return $http.post(apiUrl+'/auth', loginInfo);
      },
      register: function(registerInfo) {
        return $http.post(apiUrl+'/users', registerInfo);
      },
      getUserByToken: function() {
        return HttpSecure.get(apiUrl+'auth');
      }
    }
  }]);
