// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('tracegerm', ['ionic', 'ngCordova', 'ngMap', 'tracegerm.controllers', 'tracegerm.services'])

  .run(function ($ionicPlatform, $cordovaPreferences, $state, $ionicPopup) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      $cordovaPreferences.fetch('X-Auth-Token')
        .success(function (response) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: JSON.stringify(response)
          });
          if (response == null || !response.length) {
            $state.go('app.login');
          }
        })
        .error(function (error) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: JSON.stringify(response)
          });
          $state.go('app.login');

          console.log(JSON.parse(error))
        });
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'js/menu/menu.html',
        controller: 'MenuController'
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'js/login/login.html',
            controller: 'LoginController'
          }

        }
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'js/home/home.html',
            controller: 'HomeController',
            resolve: {
              message: function (HttpSecure) {
                return HttpSecure.setAuthToken();
              }
            }
          }
        }
      })
      .state('app.profile', {
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'js/profile/profile.html',
            controller: 'ProfileController',
            resolve: {
              message: function (HttpSecure) {
                return HttpSecure.setAuthToken();
              }
            }
          }
        }
      })
      .state('app.alert', {
        url: '/alert',
        views: {
          'menuContent': {
            templateUrl: 'js/alert/alert.html',
            controller: 'AlertController',
            resolve: {
              message: function (HttpSecure) {
                return HttpSecure.setAuthToken();
              }
            }
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  })
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = false;
  })
  .factory('httpRequestInterceptor',['$q', '$location', '$ionicPopup', function ($q, $location, $ionicPopup) {
    return {
      'responseError': function (rejection) {

        var alertPopup = $ionicPopup.alert({
          title: 'Error with status: ' + rejection.status,
          template: JSON.stringify(rejection.data)
        });
      }
    };
  }]);
