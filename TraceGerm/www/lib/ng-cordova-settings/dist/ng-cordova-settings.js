/*!
 * ng-cordova-settings
 * Copyright 2015 Peter Bakondy https://github.com/pbakondy
 * See LICENSE in this repository for license information
 */
(function(){
/* global angular, cordova */

// install   :     cordova plugin add org.apache.cordova.file

angular.module('ng-cordova-settings', ['ngCordova.plugins.file'])

  .factory('settings', ['$q', '$window', '$cordovaFile', function ($q, $window, $cordovaFile) {
    'use strict';


    var storageFilename = 'settings.txt';


    function isBrowser() {
      return (!$window.cordova && !$window.PhoneGap && !$window.phonegap);
    }


    function isJSON(value) {
      return (value === null) || (typeof value === 'boolean') || angular.isNumber(value) ||
        angular.isString(value) || angular.isArray(value) || angular.isObject(value);
    }


    // from: https://github.com/angular/angular.js/blob/master/src/Angular.js#L326
    // modified: delete key when value is undefined
    function baseExtend(dst, objs, deep) {
      for (var i = 0, ii = objs.length; i < ii; ++i) {
        var obj = objs[i];
        if (!angular.isObject(obj) && !angular.isFunction(obj)) {
          continue;
        }
        var keys = Object.keys(obj);
        for (var j = 0, jj = keys.length; j < jj; j++) {
          var key = keys[j];
          var src = obj[key];

          if (deep && angular.isObject(src)) {
            if (!angular.isObject(dst[key])) {
              dst[key] = angular.isArray(src) ? [] : {};
            }
            baseExtend(dst[key], [src], true);
          } else {
            if (angular.isDefined(src)) {
              dst[key] = src;
            } else {
              delete(dst[key]);
            }
          }
        }
      }

      return dst;
    }


    function merge(dst) {
      return baseExtend(dst, [].slice.call(arguments, 1), true);
    }


    function read(key) {
      var q = $q.defer();

      if (angular.isUndefined(key)) {
        // return all settings
        readSettings().then(q.resolve, q.reject);
      }
      else if (angular.isString(key)) {
        // return one setting value
        readSettings().then(
          function(result) {
            q.resolve(result[key]);
          },
          q.reject
        );
      }
      else if (angular.isArray(key)) {
        // return more setting values
        readSettings().then(
          function(result) {
            var ret = {};

            for (var i = 0, ii = key.length; i < ii; i++) {
              ret[key[i]] = result[key[i]];
            }

            q.resolve(ret);
          },
          q.reject
        );
      } else {
        throw new TypeError('Invalid input parameter');
      }

      return q.promise;
    }


    function write(key, value) {
      var q = $q.defer();

      var values = {};

      if (angular.isString(key) && angular.isUndefined(value)) {
        values[key] = undefined;
      }
      else if (angular.isString(key) && isJSON(value)) {
        values[key] = value;
      }
      else if (angular.isObject(key) && angular.isUndefined(value)) {
        values = key;
      } else {
        throw new TypeError('Invalid input parameters');
      }

      readSettings().then(
        function(result) {
          writeSettings(result, values).then(q.resolve, q.reject);
        },
        function() {
          writeSettings({}, values).then(q.resolve, q.reject);
        }
      );

      return q.promise;
    }


    function keys() {
      var q = $q.defer();

      readSettings().then(
        function(result) {
          q.resolve(Object.keys(result));
        },
        q.reject
      );

      return q.promise;
    }


    function empty() {
      var q = $q.defer();

      writeSettingsFile('{}').then(q.resolve, q.reject);

      return q.promise;
    }


    function remove() {
      var q = $q.defer();

      deleteSettingsFile().then(q.resolve, q.reject);

      return q.promise;
    }


    function readSettings() {
      var q = $q.defer();

      readSettingsFile().then(
        function(result) {
          if (!result) {
            return q.reject('Empty');
          }

          var obj;

          try {
            obj = JSON.parse(result);
          } catch(e) {
            throw new ReferenceError('Damaged settings data');
          }

          q.resolve(obj);
        },
        q.reject
      );

      return q.promise;
    }


    function writeSettings(existingData, newData) {
      var q = $q.defer();

      var obj = merge({}, existingData, newData);

      writeSettingsFile(JSON.stringify(obj)).then(q.resolve, q.reject);

      return q.promise;
    }


    function readSettingsFile() {
      var q = $q.defer();

      if (isBrowser()) {
        q.resolve($window.localStorage[storageFilename]);
      } else {
        $cordovaFile.readAsText(cordova.file.dataDirectory, storageFilename).then(
          function(result) {
            q.resolve(result);
          },
          function(error) {
            q.reject(error);
          }
        );
      }

      return q.promise;
    }


    function writeSettingsFile(content) {
      var q = $q.defer();

      if (isBrowser()) {
        // running in browser with 'ionic serve'

        $window.localStorage[storageFilename] = content;
        q.resolve();

      } else {

        // writeFile(path, fileName, text, replaceBool)
        $cordovaFile.writeFile(cordova.file.dataDirectory, storageFilename, content, true).then(
          function() {
            q.resolve();
          },
          function(error) {
            q.reject(error);
          }
        );

      }

      return q.promise;
    }


    function deleteSettingsFile() {
      var q = $q.defer();

      if (isBrowser()) {
        $window.localStorage.removeItem(storageFilename);
        q.resolve();
      } else {
        $cordovaFile.removeFile(cordova.file.dataDirectory, storageFilename).then(
          function(result) {
            q.resolve(result);
          },
          function(error) {
            q.reject(error);
          }
        );
      }

      return q.promise;
    }


    function setStorageFilename(filename) {
      if (angular.isString(filename) && filename.length > 0) {
        storageFilename = filename;
        return true;
      } else {
        return false;
      }
    }


    return {
      read: read,
      write: write,
      keys: keys,
      empty: empty,
      remove: remove,
      setStorageFilename: setStorageFilename
    };


  }]);

})();