// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'pascalprecht.translate', 'ng-cordova-settings'])

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

.run(function($ionicPlatform, $state, $cordovaFile, $translate, $cordovaGlobalization, settings, $location) {
  $ionicPlatform.ready(function() {

    settings.read('username').then(function(result) {},
      function(error) {
        $location.path('/app/firstUse');
      });

    settings.read('language').then(function(result) {
        console.log(result.choice);
        $translate.use(result.choice);
      },
      function(error) {
        console.log("no languages was chosen");
      });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
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
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html"
      }
    }
  })

  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html"
      }
    }
  })

  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })

  .state('app.firstUse', {
    url: "/firstUse",
    views: {
      'menuContent': {
        templateUrl: "templates/firstUse.html"
      }
    }
  })

  .state('app.alert', {
    url: "/alert",
    views: {
      'menuContent': {
        templateUrl: "templates/alert.html"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback


  $urlRouterProvider.otherwise('/app/home');

  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");

});