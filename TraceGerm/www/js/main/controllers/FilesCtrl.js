starter.controller('FilesCtrl', function($scope, $cordovaFile) {

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
});