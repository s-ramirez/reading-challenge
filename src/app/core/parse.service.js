(function() {
	'use strict';

	angular
		.module('readingChallenge')
		.factory('parseService', parseService);

	parseService.$inject = ["$q"];

	function parseService($q) {
		var service = {
			getUserChallenges: getUserChallenges,
			getCurrentUser: getCurrentUser,
			getUserBooks: getUserBooks
		};

		return service;

		function getCurrentUser() {
			return Parse.User.current();
		}

		function getUserBooks(user) {
			var query = new Parse.Query("Book");
			query.equalTo("FK_User", user);

			return query.find().then(function (results) {
				var books = {read: [], reading: [] };
				angular.forEach(results, function (value) {
					var attrs = value.attributes;
					var info = {
						author: attrs.author,
						title: attrs.title
					};
					(attrs.read) ? books.read.push(info) : books.reading.push(info);
				});
				return books;
			});
		};

		function getUserChallenges(user) {
			return $q.all([getAllChallenges(), getAllUserChallenges(user)]).then(function (results) {
				return mergeArrays(results[0], results[1]);
			});
		};

		function getAllChallenges() {
			var query = new Parse.Query("Challenge");

			return query.find().then(function (results) {
				var challenges = [];
				angular.forEach(results, function (value) {
					challenges.push({
						challengeID: value.id,
						description: value.attributes.description
					});
				});
				return challenges;
			});
		};

		function getAllUserChallenges(user) {
			var query = new Parse.Query("UserChallenges");
			query.equalTo("FK_User", user);

			return query.find().then(function (results) {
				var user_challenges = [];
				angular.forEach(results, function (values) {
					var attr = values.attributes;
					user_challenges.push({
						challengeID: attr.FK_Challenge.id,
						completed: attr.completed
					});
				});
				return user_challenges;
			});
		};

		function mergeArrays(arr1, arr2) {
			var result = [];
			angular.forEach(arr1, function (value) {
				for(var i = 0; i < arr2.length; i++){
					if(value.challengeID == arr2[i].challengeID) {
						result.push({
							id: value.challengeID,
							completed: arr2[i].completed,
							description: value.description
						});
						arr2.splice(i, 1);
						break;
					}
				}
			});

			return result;
		}
	}
})();
