app.factory('twitterService', function($q) {
	var authorizationResult = false;
	return {
		initialize: function() {
			OAuth.initialize('beUnw1-x888UQrOidRxNJHurWak', {
				cache: true
			});
			authorizationResult = OAuth.create("twitter")
		},
		isReady: function() {
			return (authorizationResult);
		},
		connectTwitter: function() {
			var deferred = $q.defer();
			OAuth.popup("twitter", {
				cache: true
			}, function(error, result) {
				// cache means to execute the callback if the tokens are already present
				if (!error) {
					authorizationResult = result;
					deferred.resolve();
				} else {
					//do something if there's an error

				}
			});
			return deferred.promise;
		},
		clearCache: function() {
			OAuth.clearCache('twitter');
			authorizationResult = false;
		},
		getLatestTweets: function(maxId) {
			//create a deferred object using Angular's $q service
			var deferred = $q.defer();
			var url = '/1.1/statuses/home_timeline.json';
			if (maxId) {
				url += '?max_id=' + maxId;
			}
			var promise = authorizationResult.get(url).done(function(data) {
				// https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
				// when the data is retrieved resolve the deferred object
				deferred.resolve(data);
			}).fail(function(err) {
				deferred.reject(err);
			});
			//return the promise of the deferred object
			return deferred.promise;
		}
	}
});
