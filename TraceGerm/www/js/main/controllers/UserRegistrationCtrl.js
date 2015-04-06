starter.controller('UserRegistrationCtrl', function($scope, $ionicPopup, $http, $cordovaFile, settings, $location) {

  $scope.registerUser = function(username, passphrase) {

    var encryptedUsername = CryptoJS.AES.encrypt(username, passphrase).toString();
    $http({
      method: 'POST',
      url: 'http://localhost:9090/users/save',
      data: {
        username: encryptedUsername
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).success(function(data, status, headers, config) {

      var alertPopup = $ionicPopup.alert({
        title: 'Welcome to TraceGerm!',
        template: 'Now you are able to use tha app!',
      });
      alertPopup.then(function(res) {
        console.log('You can now use the app');
      });

      settings.write({
        username: encryptedUsername,
        passphrase: passphrase
      }).then(function(result) {},
        function(error) {

        });

      $location.path('/app/home');

    }).error(function(data, status, headers, config) {
      /*handle non 200 statuses*/
      var alertPopup = $ionicPopup.alert({
        title: 'Alert!',
        template: 'Please check your internet connection!',
      });
      alertPopup.then(function(res) {
        console.log('Better try again');
      });

    });
  };

});