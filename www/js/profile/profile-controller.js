/**
 * Created by anasko on 29/10/16.
 */
controllers.controller('ProfileController', function ($scope, PositionService, NgMap) {

  $scope.currentPostion = {};
  $scope.lastPostitions = [];
  var posOptions = {timeout: 10000, enableHighAccuracy: true};

  var getLast10Positions = function () {
    NgMap.getMap().then(function (map) {
      PositionService.getCurrentPosition().then(function (position) {
        $scope.currentPostion = {
          latitude:  position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
      PositionService.getLast10Positions().then(function (response) {
        console.log(JSON.stringify(response));
        for (var i = 0; i < response.data.length; i++) {
          position = {
            latitude: response.data[i].position.latitude,
            longitude: response.data[i].position.longitude
          };
          $scope.lastPostitions.push(position);
        }
      }).catch(function (response) {

        console.log(JSON.stringify(response));
      })
    });
  };

  $scope.$on('$ionicView.beforeEnter', function () {
    getLast10Positions();
  });

});
