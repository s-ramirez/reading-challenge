(function() {
	'use strict';

	angular
		.module('readingChallenge')
		.factory('parseService', parseService);

	function parseService() {
		var service = {
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
		}
	}
})();
