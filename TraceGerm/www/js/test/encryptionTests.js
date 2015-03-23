describe('Unit: EncryptionCtrl', function() {
  // Load the module with ContainerContactCtrl, add your module name in here!
  beforeEach(module('starter'));

  var $controller;

  // inject the $controller and $rootScope services
  // in the beforeEach block

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.encryptMessage', function() {
    it('encrypts a message:', function() {
      var $scope = {};
      var controller = $controller('EncryptionCtrl', {
        $scope: $scope
      });
      var message = "This is a message";
      var secretPass = "This is the passphrase";
      var encryptedMessage = String($scope.encryptMessage(message, secretPass));
      var decryptedMessage = $scope.decryptMessage(encryptedMessage, secretPass);
      expect(decryptedMessage).toEqual("This is a message");
    });
  });

});