(function () {
  'use strict';

  var module = angular.module('app.lifeCycleHooks');

  function OnDestroyController($element) {
    var self = this;

    self.message = 'Remove the click event when you destroy me';

    /**
     * eventHandler: custom event handler to be attached to button]
     */
    var evenHandler = function () {
      window.alert('onChangesComponent');
    };

    /**
     * [$onInit: Attach our eventHandler when the element is clicked]
     */

    self.$onInit = function () {
      var button = $element.find('button');
      button.on('click', evenHandler);
    };

    /**
     * [$onDestroy: Destroy the eventHandler once the component is destroyed]
     */

    self.$onDestroy = function () {
      $element.off('click', eventHandler);
      window.alert('component destroyed');
    };

  }

  module.component('onDestroy', {
    templateUrl: 'js/components/onDestroyComponent.html',
    controller: ['$element', OnDestroyController]
  });

})();
