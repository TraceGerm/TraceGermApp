/**
 * Created by anasko on 29/10/16.
 */
services.factory('MenuService', ['HttpSecure', function(HttpSecure) {
    // Might use a resource here that returns a JSON array


    return {
      getUserByToken: function() {
        return HttpSecure.get(apiUrl+'/auth');
      }
    }
  }]);
