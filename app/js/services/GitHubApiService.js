app.service('GitHub', ['$http', function($http){
  var self = this;
  var API_LINK = "app/public/githubstats.json"
  // var API_LINK = "http://api.github.com/users/harrywynnwill"

  var API_LINK_REPOS = "app/public/repos.json"
  // var API_LINK_REPOS = "http://api.github.com/users/harrywynnwill/repos"

  self.getUserInfo = function(){
    return $http.get(API_LINK)
    .then(_handleResponseFromApi);
    }

    self.getRepos = function(){
      return $http.get(API_LINK_REPOS)
      .then(_handleResponseFromApi);
      }
  function _handleResponseFromApi (response) {
    return response.data;
  }

}]);
