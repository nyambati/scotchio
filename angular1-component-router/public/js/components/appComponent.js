/**
 * js/components/appComponent.js
 */

(function () {
  'use strict';
  var router = angular.module('scotch.router');

  router.component('appRouter', {
    templateUrl: '/js/components/appComponent.html',
    // templateUrl: '/js/components/appComponent.html',
    $routeConfig: [
      { path: '/', component: 'jumboTron', name: 'Home', useAsDefault: true },
      { path: '/movies/...', component: 'movieList', name: 'Movies' },
      { path: '/**', redirectTo: ['Home'] }
    ]
  });

})();
