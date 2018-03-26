/**
 * Created by anasko on 29/10/16.
 */
controllers.controller('LoginController', function ($scope, $ionicModal, $ionicPopup, $state, $ionicSideMenuDelegate,
                                                    $ionicPlatform, $ionicHistory, $cordovaPreferences, LoginService) {

  $scope.loginInfo = {};
  $scope.registerInfo = {};
  $scope.isSideMenuOn = false;
  $scope.loginError = false;

  $ionicSideMenuDelegate.canDragContent($scope.isSideMenuOn);


  $ionicModal.fromTemplateUrl('js/login/register-modal.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function () {
    $scope.modal.hide();
  };

  $scope.register = function () {
    $scope.modal.show();
  };

  $scope.doRegister = function () {
    $scope.encryptUserInformation();
    LoginService.register($scope.registerInfo).then(function (response) {
      $scope.closeRegister();
    });

  };

  $scope.doLogin = function () {
    LoginService.login($scope.loginInfo).then(function(response) {
      $ionicPlatform.ready(function() {
        $cordovaPreferences.store('X-Auth-Token', response.data.token)
          .success(function () {
            $scope.showAlert();
          }).error(function(error) {
          console.log(JSON.stringify(error))
        })
      });
      $scope.loginError = false;
      $scope.isSideMenuOn = true;
    }).catch(function(response) {
      console.log(JSON.stringify(response));
        $scope.loginError = true;
      });

  };

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Welcome to TraceGerm',
      template: 'TraceGerm is here!'
    });

    alertPopup.then(function(res) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.home');
    });
  };

  $scope.encryptUserInformation = function () {
    $scope.registerInfo.email = $scope.encryptValue($scope.registerInfo.email);
    $scope.registerInfo.name = $scope.encryptValue($scope.registerInfo.name);
    $scope.registerInfo.surname = $scope.encryptValue($scope.registerInfo.surname);
  }

  $scope.encryptValue = function (value) {
    var text = CryptoJS.AES.encrypt(value, $scope.registerInfo.password);
    return text.toString();
  }

});
