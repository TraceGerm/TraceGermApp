// Karma configuration
// Generated on Sat Feb 28 2015 18:40:35 GMT+0200 (EET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

<<<<<<< HEAD
      'www/lib/angular/angular.js',
      'www/lib/angular-animate/angular-animate.js',
      'www/lib/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-mocks/angular-mocks.js',

      'node_modules/angular-resource/angular-resource.js',
      'www/lib/angular-ui-router/release/angular-ui-router.js',
      'www/lib/ionic/js/ionic.js',
      'www/lib/ionic/js/ionic-angular.js',
      'www/lib/ngCordova/dist/ng-cordova.js',
      'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js',
      'www/lib/angular-translate/angular-translate.min.js',
      'www/lib/angular-translate/angular-translate-loader-static-files.min.js',
      'www/lib/ng-cordova-settings/dist/ng-cordova-settings.min.js',

      'www/js/main/*.js',
      'www/js/test/*.js',
=======
<<<<<<< HEAD:TraceGerm/www/TraceGerm.conf.js
   	'lib/ionic/js/angular/angular.js',
	'lib/ionic/js/angular/angular-animate.js',
	'lib/ionic/js/angular/angular-sanitize.js',
	'lib/ng-cordova/dist/ng-cordova.js',

	'lib/ionic/js/angular/angular-resource.js',
	'lib/ionic/js/angular-ui/angular-ui-router.js',
	'lib/ionic/js/ionic.js',
	'www/lib/ionic/js/ionic-angular.js',
	'lib/ng-cordova/dist/ng-cordova.js',
	'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js',

	'js/main/*.js',
	'js/test/*.js',
=======
    'www/lib/ionic/js/angular/angular.js',
    'www/lib/ionic/js/angular/angular-animate.js',
    'www/lib/ionic/js/angular/angular-sanitize.js',
    'node_modules/angular-mocks/angular-mocks.js',

    'www/lib/ionic/js/angular/angular-resource.js',
    'www/lib/ionic/js/angular-ui/angular-ui-router.js',
    'www/lib/ionic/js/ionic.js',
    'www/lib/ionic/js/ionic-angular.js',
    'www/lib/ng-cordova/dist/ng-cordova.js',
    'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js',
    'www/lib/angular-translate/angular-translate.min.js',

    'www/js/main/*.js',
    'www/js/test/*.js',
>>>>>>> dev:TraceGerm/TraceGerm.conf.js
>>>>>>> master
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
