starter.controller('EncryptionCtrl', function($scope) {

  $scope.encryptMessage = function(messageField, passphraseField) {

    $scope.encryptedMessage = CryptoJS.AES.encrypt(messageField, passphraseField);
    return $scope.encryptedMessage;
  };

  $scope.decryptMessage = function(encryptedMessage, passphraseField) {

    $scope.decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, passphraseField).toString(CryptoJS.enc.Utf8);
    return $scope.decryptedMessage;
  };

});