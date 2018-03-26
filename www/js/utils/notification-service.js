/**
 * Created by anasko on 31/10/16.
 */
services.factory('NotificationService', ['HttpSecure', function (HttpSecure) {

  return {
    getNotifications: function () {
      return HttpSecure.get(apiUrl + '/notifications/user/notAcceptedNotifications');
    },
    acceptNotification: function (id, notification) {
      return HttpSecure.put(apiUrl + '/notifications/' + id, notification);
    }
  }
}]);
