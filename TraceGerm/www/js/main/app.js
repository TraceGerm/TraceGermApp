// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'pascalprecht.translate'])

.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}])

.run(function($ionicPlatform, $state, $cordovaFile, $translate, $cordovaGlobalization) {
  $ionicPlatform.ready(function() {

    $cordovaGlobalization.getPreferredLanguage().then(
      function(result) {
        $translate.use((result.value).split("-")[0]).then(function(data) {
          console.log("SUCCESS -> " + data);
        }, function(error) {
          console.log("ERROR -> " + error);
        });
      },
      function(error) {
        alert("error");
      });
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})


.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })

    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html"
        }
      }
    });

  // if none of the above states are matched, use this as the fallback


  $urlRouterProvider.otherwise('/app/home');

  $translateProvider.translations('en', {
    LANGUAGE : "English",
    LANGUAGE_SELLECTION : "Language",
    HOME_TITTLE : "Home"
  })
  .translations('el', {
    LANGUAGE : "Ελληνικά",
    LANGUAGE_SELLECTION : "Γλώσσα",
    HOME_TITTLE : "Aρχική"
  });

  $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");
});
