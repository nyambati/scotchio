(function () {
    'use strict';
    angular.module('app.router', []);
    angular.module('app.components', []);

    var requires = [
        'ngComponentRouter',
        'app.router',
        'app.components'
    ];

    var app = angular.module('app', requires);

    app.value('$routerRootComponent', 'appRouter');


    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });

})();
