starter.controller('TranslateCtrl', function($translate, $scope, $cordovaGlobalization, settings) {
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

    $scope.setLanguage = function(id) {
      settings.write('language', id).then(function() {
          console.log(id);
        },
        function(error) {
          console.log(error);
          $scope.log += 'error' + '\n';
        });
    };
    $scope.setLanguage(id);
    $translate.use(id.choice);

  };
});