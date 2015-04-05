angular.module('starter.controllers', ['ngCordova', 'ng-cordova-settings'])

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


.controller('GeoCtrl', function($scope, $cordovaGeolocation) {

  $scope.getCurrentPosition = function() {
    var onSuccess = function(position) {
      alert('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Timestamp: ' + position.timestamp + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      maximumAge: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    });
  };

})

.controller('UserRegistrationCtrl', function($scope, $ionicPopup, $http, $cordovaFile, settings, $location) {

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

})

.controller('WatchGeoCtrl', function($scope, $cordovaGeolocation, $http) {

  $scope.watchposition = function() {
    var watchOptions = {
      frequency: 300000,
      timeout: 10000,
      enableHighAccuracy: true // may cause errors if true
    };

    var onSuccess = function(position) {

      $http({
        method: 'POST',
        url: 'http://localhost:9090/places/save',
        data: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          accuracy: position.coords.accuracy
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        alert("data was send successfully");
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert("something went wrong:" + status);
      });

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, watchOptions);

  };

})

.controller('FilesCtrl', function($scope, $cordovaFile) {

  $scope.SaveFile = function() {
    document.addEventListener('deviceready', function() {

      $cordovaFile.createFile(cordova.file.dataDirectory, "UserSettings.json", false)
        .then(function(success) {
          alert("File Created");
          alert(cordova.file.dataDirectory);
        }, function(error) {
          alert("Error: " + error.code);
        });
    });
  };
})


.controller('SettingsCtrl', function($scope, settings) {

  $scope.setUsername = function(username) {
    settings.write('username', username).then(function() {
        console.log(username);
      },
      function(error) {
        console.log(error);
        $scope.log += 'error' + '\n';
      });
  };

  $scope.getUsername = function() {
    settings.read('username').then(function(result) {
      $scope.result = result;
      alert(result);
      return result;
    });
  };

  $scope.deleteSettings = function() {
    settings.remove().then(function() {
        alert("successfully deleted");
      },
      function(error) {
        alert(error.code);
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

.controller('TranslateCtrl', function($translate, $scope, $cordovaGlobalization) {
  $scope.countList = [{
    id: 1,
    choice: 'en',
    name: 'English'
  }, {
    id: 2,
    choice: 'el',
    name: 'Greek'
  }];

  $scope.countSelected = $scope.countList[0].id;

  $scope.onchange = function(id) {

    $translate.use(id.choice);

  };
})

.controller('UserCtrl', function($rootScope, $scope, $http, $ionicPopup) {

  $scope.save = function() {

    $http({
      method: 'POST',
      url: 'http://localhost:9090/places/save',
      data: {
        longitude: '56.215'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).success(function(data, status, headers, config) {
      //handles succesfull method
    }).error(function(data, status, headers, config) {
      /*handle non 200 statuses*/
    });

    $http({
      method: 'POST',
      url: 'http://localhost:9090/visitDetails/save?username=gg',
      data: {
        timeStamp: '56215'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
});