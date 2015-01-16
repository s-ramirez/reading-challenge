(function() {
	'use strict';

	angular
		.module('readingChallenge')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ["$location"];

	function LoginCtrl($location) {
		var vm = this;

		vm.loginWithParse = function (username, password) {
			Parse.User.logIn(username, password, {}).then(function(res){
				$location.url('/');
			}, function(reason) {
				console.log('Failed because: ' + reason);
			});
		}
	}
})();
