starter.controller('TranslateCtrl', function($translate, $scope, $cordovaGlobalization) {
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
});