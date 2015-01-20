(function() {
	'use strict';

	angular
		.module('readingChallenge')
		.controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ["$location", "$window", "$scope", "parseService"];

	function HomeCtrl($location, $window, $scope, parseService) {
		var vm = this;

		vm.friends = [];
		vm.books = [];
		vm.challenges = [];

		activate();

		function activate() {
			vm.user = parseService.getCurrentUser();
			if(!vm.user){
				$location.path("/login");
			} else {
				setContainerHeight();
				getOtherUsers();
				getUserBooks();
			}
		};

		function setContainerHeight() {
			var height = $window.innerHeight;
			var width = $window.innerWidth;

			vm.containerHeight = (width >= 992) ? height - 70 + 'px' : 'auto';
		};

		function getOtherUsers() {
			for (var i = 0; i < 15; i++) {
				vm.friends.push({
					progress: Math.floor(Math.random() * 100) + 1,
					picture: 'http://placehold.it/80x80'
				});
			};
		};

		function getUserBooks() {
			parseService.getUserBooks(vm.user).then(function (results) {
				vm.books = results;
			});
		}

		angular.element($window).bind("resize", function () {
			setContainerHeight();
			$scope.$apply();
		});
	}
})();
