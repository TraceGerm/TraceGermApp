/**
 * Created by anasko on 29/10/16.
 */
controllers.controller('MenuController', function ($scope, $ionicModal, $ionicPopup, $state, $ionicSideMenuDelegate,
                                                   $ionicPlatform, $ionicHistory, $cordovaPreferences, MenuService) {

  $scope.user = {};

  $scope.menuObjects = [
    {title: 'Home', href: '#/app/home'},
    {title: 'Profile', href: '#/app/profile'},
    {title: 'Alert', href: '#/app/alert'},
  ]

  $ionicPlatform.ready(function () {
    $cordovaPreferences.fetch('User')
      .success(function (response) {
        if (response == null) {
          $scope.getUserByAuthToken();
        } else {
          $scope.user = response;
          console.log($scope.user);
        }
      })
      .error(function (error) {
        console.log(error)
      });
  })

  $scope.getUserByAuthToken = function () {
    MenuService.getUserByToken().then(function (response) {
      $cordovaPreferences.store('User', response.data);
    });
  }


});
