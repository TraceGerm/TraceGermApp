starter.controller('SettingsCtrl', function($scope, settings) {

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
});