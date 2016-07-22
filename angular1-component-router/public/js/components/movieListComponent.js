(function () {
  'use strict';
  /**
   * Get our component module and name it movie
   */

  var movie = angular.module('scotch.components');

  /**
   * Define our movieList component
   * @type {String}
   */
  movie.component('movieList', {
    templateUrl: '/js/components/movieListComponent.html',
    controller: ['$http', MovieListController],

    // TODO: Add subroute RouteConfig
    $routeConfig: [
      { path: '/details/:id', component: 'movieDetails', name: 'Details' }
    ]

  });

  /**
   * This function will fetch movies from movies.json using $http
   */

  function getMovies($http) {
    return $http.get("/api/movies")
      .then(function (response) {
        return response.data;
      });
  }

  /**
   * movieList component controller
   */

  function MovieListController($http) {

    var self = this;

    self.movies = [];

    self.$onInit = function () {
      getMovies($http)
        .then(function (movies) {
          self.movies = movies;
        });
    };
  }

})();
