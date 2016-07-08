(function () {
  'use strict';

  var module = angular.module('app.lifeCycleHooks');

  function PostLinkController($element) {
    var self = this;

    self.$postLink = function () {
      var button = $element.find('button');
      button.text('click me');
    };

  }

  module.component('postLink', {
    templateUrl: 'js/components/postLinkComponent.html',
    controller: ['$element', PostLinkController]
  });

})();
