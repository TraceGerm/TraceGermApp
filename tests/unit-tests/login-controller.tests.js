describe('LoginController', function() {

  // load the module for our app
  beforeEach(module('tracegerm'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('#doLogin', function() {

    it('checks the encryption', function() {
      var $scope = {};
      var controller = $controller('LoginController', { $scope: $scope });
      $scope.registerInfo.password = 'longerthaneightchars';

      var value = "value";
      var encryptedvalue = $scope.encryptValue(value);
      var text = CryptoJS.AES.decrypt(encryptedvalue.toString(), $scope.registerInfo.password).toString(CryptoJS.enc.Utf8);

      expect(value).toEqual(text);
      expect(value).not.toEqual('random');
    });
  })
});
