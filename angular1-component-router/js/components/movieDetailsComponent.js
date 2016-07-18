(function () {
    'use strict';

    /**
     * Get the component module and name it movieDetails
     */

    var details = angular.module('app.components');

    /**
     * This is the controller for movieDetails component
     */

    function MovieDetailsController($http) {

        var self = this;

        /**
         * Lets get the id params from previous route
         * Get the movie from the server
         */
        self.$routerOnActivate = function (next, previous) {
            self.id = next.params.id;
            return $http.get('api/movies/' + self.id)
                .then(function (response) {
                    self.movie = response.data;
                });
        };
    }


    /**
     * Register movieDetails component
     */

    details.component('movieDetails', {
        templateUrl: '/js/components/movieDetailsComponent.html',
        controller: ['$http', MovieDetailsController]
    });

})();
