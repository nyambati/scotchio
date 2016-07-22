(function () {
  'use strict';
  /**
   * [requires This is an array of all the depencies the app needs]
   * @type {Array}
   */

  var requires = [
    'ngComponentRouter',
    'scotch.router',
    'scotch.components'
  ];

  /**
   * This is the component modules, which we will use to created all our components.
   */
  angular.module('scotch.components', []);
  angular.module('scotch.router', []);

  /**
   * This is the main module for our appliation
   */
  angular.module('scotch', requires)
    .value('$routerRootComponent', 'appRouter')
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(true);
    });

})();
