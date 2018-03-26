/**
 * Created by anasko on 31/10/16.
 */
services.factory('AlertService', ['HttpSecure', function (HttpSecure) {

  return {
    createAlert: function () {
      return HttpSecure.post(apiUrl + '/alerts', {});
    }
  }
}]);
