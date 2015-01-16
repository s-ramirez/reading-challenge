(function() {
	'use strict';

	angular
		.module('readingChallenge')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ["$location"];

	function HomeCtrl($location) {
		var vm = this;

		activate();

		function activate() {
			vm.user = Parse.User.current();
			if(!vm.user){
				$location.search
			};
		}
	}
})();
