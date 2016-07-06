(function () {
    'use strict';
    var router = angular.module('app.router');


    router.component('appRouter', {
        templateUrl: '/js/components/appComponent.html',
        $routeConfig: [
            { path: '/', component: 'jumboTron', name: 'Home', useAsDefault: true },
            { path: '/movies', component: 'movieList', name: 'MovieList' },
            { path: '/about', component: 'about', name: 'About' }
        ]
    });

    var about = angular.module('app.components');

    about.component('about', {
        template: `
        <div class="well">
            About the movie app
        </div>
        `
    });


})();
