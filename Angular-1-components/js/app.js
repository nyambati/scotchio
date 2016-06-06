(() => {
  'use strict';
  const app = angular.module('app', []);

  app.controller('HomeCtrl', function () {
    this.message = " Hello world";
  });
})();
