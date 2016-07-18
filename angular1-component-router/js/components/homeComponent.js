(function () {
    'use strict';
    /**
     * Get our component module and name it home
     */

    var home = angular.module('app.components');

    /**
     * Home component controller
     */

    function HomeController() {
        var self = this;


        self.head = 'Awesome Movie App';

        self.message = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Numquam voluptates quas optio reiciendis ratione officia impedit quam odio
        itaque accusantium similique architecto culpa, sed! Cum consectetur harum
        est earum dolor.`;

        self.button = 'see movies';

        self.goTo = function () {
            self.$router.navigate(['Movies', 'Details', { id: 1 }]);
        };

    }


    /**
     * Define our Home component
     * @type {String}
     */

    home.component('jumboTron', {
        bindings: {
            $router: '<'
        },
        templateUrl: '/js/components/HomeComponent.html',
        controller: [HomeController]
    });


})();
