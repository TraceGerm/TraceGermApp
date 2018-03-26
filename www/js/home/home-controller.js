/**
 * Created by anasko on 29/10/16.
 */
controllers.controller('HomeController', function ($scope, $ionicModal, $ionicPopup, $ionicPlatform,
                                                   $cordovaPreferences, $cordovaGeolocation, PositionService, AlertService) {


  $scope.isWatchingPosition = false;

  $scope.getWatchingPositionPreference = function () {
    $cordovaPreferences.fetch('isWatchingPosition')
      .success(function (response) {
        if (response == null) {
          $scope.isWatchingPosition = false;
        } else {
          $scope.isWatchingPosition = response;
        }
        $scope.changeWatchingPosition();
      })
      .error(function (error) {
        console.log(error)
      });
  };

  $scope.toggleWatchingPosition = function () {
    $scope.isWatchingPosition = !$scope.isWatchingPosition;
    $scope.setWatchingPositionPreference();
    $scope.changeWatchingPosition();
  };

  $scope.changeWatchingPosition = function () {
    if ($scope.isWatchingPosition) {
      $scope.startWatchingPosition();
    } else {
      $scope.stopWatchingPosition();
    }
  };

  $scope.startWatchingPosition = function () {
    PositionService.watchPosition();
  };

  $scope.stopWatchingPosition = function () {
    PositionService.stopWatchingPosition();
  };

  $scope.setWatchingPositionPreference = function () {
    $cordovaPreferences.store('isWatchingPosition', $scope.isWatchingPosition);
  };

  $ionicPlatform.ready(function () {
    $scope.getWatchingPositionPreference();
    cordova.plugins.backgroundMode.setDefaults({
      title: 'TraceGerm is running in background',
      text: 'TraceGerm is watching your position and in case of an alert will inform you directly'
    });
    cordova.plugins.backgroundMode.enable();
  });

});
