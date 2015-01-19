(function() {
	'use strict';

	angular
		.module('readingChallenge')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ["$location", "$window", "$scope"];

	function HomeCtrl($location, $window, $scope) {
		var vm = this;
		vm.friends = [];

		activate();

		function activate() {
			vm.user = Parse.User.current();
			if(!vm.user){
				$location.path("/login");
			} else {
				setContainerHeight();
				getOtherUsers();
			}
		};

		function setContainerHeight() {
			var height = $window.innerHeight;
			var width = $window.innerWidth;

			vm.containerHeight = (width >= 992) ? height - 70 + 'px' : 'auto';
		};

		function getOtherUsers() {
			for(var i = 0; i < 15; i++) {
					vm.friends.push({
						progress: Math.floor(Math.random() * 100) + 1,
						picture: 'http://placehold.it/80x80'
					});
				};
		}

		angular.element($window).bind("resize", function () {
			setContainerHeight();
			$scope.$apply();
		});
	}
})();
