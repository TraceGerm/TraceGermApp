angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('GeoCtrl', function($scope, $cordovaGeolocation) {

$scope.gg = function() {
  var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

  navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
  };

})

.controller('WatchGeoCtrl', function($scope, $cordovaGeolocation, $http) {

  $scope.watchposition = function() {
    var watchOptions = {
      frequency : 300000,
      timeout : 10000,
      enableHighAccuracy: true // may cause errors if true
    };

    var onSuccess = function(position) {
      alert('Latitude: '    + position.coords.latitude          + '\n' +
      'Longitude: '         + position.coords.longitude         + '\n' +
      'Altitude: '          + position.coords.altitude          + '\n' +
      'Accuracy: '          + position.coords.accuracy          + '\n' +
      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
      'Heading: '           + position.coords.heading           + '\n' +
      'Speed: '             + position.coords.speed             + '\n' +
      'Timestamp: '         + position.timestamp                + '\n');

      $http({
        method: 'POST',
        url: 'http://localhost:9090/places/save',
        data: { longitude: position.coords.longitude, latitude: position.coords.latitude,
        accuracy : position.coords.accuracy },
        headers: {'Content-Type': 'application/json'}
      });

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
    }

    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, watchOptions);

  };

})

.controller('FileCtrl', function($scope, $cordovaFile) {

  $scope.SaveFile = function() {
  document.addEventListener('deviceready', function () {

      $cordovaFile.createFile("User.json", false)
      .then(function (success) {
        alert("File Created");
      }, function (error) {
        alert("Error: "+ error.code);
      });
    });
};
})

.controller('EncryptionCtrl', function($scope) {

  $scope.encryptMessage = function(messageField, passphraseField) {

    $scope.encryptedMessage = CryptoJS.AES.encrypt(messageField, passphraseField);
    return $scope.encryptedMessage;
  };

  $scope.decryptMessage = function(encryptedMessage, passphraseField) {

    $scope.decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, passphraseField).toString(CryptoJS.enc.Utf8);
    return $scope.decryptedMessage;
  };

})

.controller('UserCtrl', function($rootScope, $scope, $http, $ionicPopup) {

  $scope.userSave = function() {

    $scope.usename = 'gg';
    $http({
      method: 'POST',
      url: 'http://localhost:9090/users/save',
      data: { username: 'gg'},
      headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){
    $http({
      method: 'POST',
      url: 'http://localhost:9090/visitDetails/save?username='+$rootScope.username,
      data:{ timeStamp: '56215'},
      headers: {'Content-Type': 'application/json'}
    });
    }).error(function(data, status, headers, config){
    /*handle non 200 statuses*/
  });

    $http({
      method: 'POST',
      url: 'http://localhost:9090/places/save',
      data: { longitude: '56.215'},
      headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){
      //handles succesfull method
    }).error(function(data, status, headers, config){
      /*handle non 200 statuses*/
    });

    $http({
      method: 'POST',
      url: 'http://localhost:9090/visitDetails/save?username=gg',
      data:{ timeStamp: '56215'},
      headers: {'Content-Type': 'application/json'}
    });
  };
});