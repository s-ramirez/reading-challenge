'use strict';

angular.module('readingChallenge')
  .controller('MainCtrl', function ($scope) {
    var vm = this;

    vm.loginWithParse = function (username, password) {
      Parse.User.logIn(username, password, {}).then(function(res){
        console.log(res);
      }, function(reason) {
        console.log('Failed because: '+reason);
      });

    }
  });
