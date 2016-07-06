(function () {
    'use strict';

    /**
     * Get the component module and name it movieDetails
     */

    var details = angular.module('app.components');

    /**
     * This is the controller for movieDetails component
     */

    function MovieDetailsController() {

        var self = this;

        /**
         * Lets get the id params from previous route
         */
        self.$routerOnActivate = function (next, previous) {
            self.id = next.params.id;
        };



    }


    /**
     * Register movieDetails component
     */

    details.component('movieDetails', {
        templateUrl: '/js/components/movieDetailsComponent.html',
        controller: [MovieDetailsController]
    });

})();
