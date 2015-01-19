(function() {
	'use strict';

	angular
		.module('readingChallenge')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ["$location", "$window", "$scope"];

	function HomeCtrl($location, $window, $scope) {
		var vm = this;

		activate();

		function activate() {
			vm.user = Parse.User.current();
			if(!vm.user){
				$location.path("/login");
			} else {
				setContainerHeight();
			}
		};

		function setContainerHeight() {
			var height = $window.innerHeight;
			var width = $window.innerWidth;

			vm.containerHeight = (width >= 992) ? height - 70 + 'px' : 'auto';
		};

		angular.element($window).bind("resize", function () {
			setContainerHeight();
			$scope.$apply();
		});
	}
})();
