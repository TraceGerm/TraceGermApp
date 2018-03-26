/**
 * Created by anasko on 29/10/16.
 */
controllers.controller('AlertController', function ($scope, $ionicModal, $ionicPopup, $state, $ionicSideMenuDelegate,
                                                    $ionicPlatform, $ionicHistory, $cordovaPreferences, AlertService,
                                                    NotificationService) {


  $scope.isWatchingAlert = false;
  $scope.socket = new SockJS(apiUrl+'/tracegerm-websocket');
  $scope.stompClient = Stomp.over($scope.socket);
  $scope.notifications = [];

  $scope.getWatchingAlertPreference = function () {
    $cordovaPreferences.fetch('isWatchingAlert')
      .success(function (response) {
        if (response == null) {
          $scope.isWatchingAlert = false;
        } else {
          $scope.isWatchingAlert = response;
        }
        $scope.changeWatchingAlert();
      })
      .error(function (error) {
        console.log(error)
      });
  };

  $scope.toggleWatchingAlert = function () {
    $scope.isWatchingAlert = !$scope.isWatchingAlert;
    $scope.setWatchingAlertPreference();
    $scope.changeWatchingAlert();
  };

  $scope.changeWatchingAlert = function () {
    if ($scope.isWatchingAlert) {
      $scope.startWatchingAlert();
    } else {
      $scope.stopWatchingAlert();
    }
  };

  $scope.startWatchingAlert = function () {
    $ionicPlatform.ready(function() {
      $scope.socket = new SockJS(apiUrl+'/tracegerm-websocket');
      $scope.stompClient = Stomp.over($scope.socket);
      $scope.stompClient.connect({}, function (frame) {
        $cordovaPreferences.fetch('User')
          .success(function (response) {
            $scope.stompClient.subscribe('/topic/notifications/'+ response.username, function (notification) {
              cordova.plugins.notification.local.schedule({
                title: "Alert!",
                message: "A new notification has appeared"
              });
              $scope.notifications.push(JSON.parse(notification.body));
              $scope.$apply();
            });
          })
      });
    })
  };

  $scope.stopWatchingAlert = function () {
    $scope.stompClient.disconnect();
  };

  $scope.setWatchingAlertPreference = function () {
    $cordovaPreferences.store('isWatchingAlert', $scope.isWatchingAlert);
  };

  $scope.sendAlert = function () {
    AlertService.createAlert().then(function (response) {
          var alertPopup = $ionicPopup.alert({
            title: 'Your alert was sent',
            template: 'Your alert will be processed shortly'
          });
        });
  }


  $ionicPlatform.ready(function () {
    $scope.getWatchingAlertPreference();
  });

  $scope.acceptNotification = function (id, notification) {
    notification.accepted = true;
    NotificationService.acceptNotification(id, notification).then(function (response) {
      var alertPopup = $ionicPopup.alert({
        title: 'You have accepted the notification',
        // template: JSON.stringify(response)
      });
      getNotAcceptedNotifications();
    }).catch(function (response) {
      var alertPopup = $ionicPopup.alert({
        title: 'Your alert was not sent',
        template: JSON.stringify(response)
      });
    })
  };

  $scope.showNotification = function (notification) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'A new notification has appeared by user: ' + notification.alert.user.username,
      template: 'Do you accept the notification?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        notification.accepted = true
        $scope.acceptNotification(notification.id, notification);
      }
    });
  };

  var getNotAcceptedNotifications = function() {
    NotificationService.getNotifications().then(function (response) {
      $scope.notifications = response.data;
      $scope.$apply();
    });
  };


  $scope.$on('$ionicView.beforeEnter', function () {
    getNotAcceptedNotifications();
  });

});
