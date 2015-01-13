'use strict';

angular.module('readingChallenge', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap', 'parse-angular', 'parse-angular.enhance'])
  .config(function ($routeProvider) {

    Parse.initialize("ECIChYKBajetbfFAF5jRIJ4UoVW3J2O2fNHRq9bG", "ROsFdhLn3fViZvOV3ZSgdrHTqInPrGJDSsmMX9z3");

    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
