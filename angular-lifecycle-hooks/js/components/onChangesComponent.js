(function () {
  'use strict';

  var module = angular.module('app.lifeCycleHooks');

  function OnChangesController() {
    this.$onChanges = function (obj) {
      var prefix;
      /**
       * [if: checks when the name has changed and greet the persons appropriately]
       */

      if (obj.name && this.name) {
        (obj.name.currentValue.toLowerCase() === 'thomas') ? prefix = 'Howdy ': prefix = 'Hello ';
        this.greeting = prefix + this.name;
      }

      /**
       * If: checks if the name is not defined set greeting to empty string
       */

      if (!this.name) {
        this.greeting = '';
      }
    };
  }

  module.component('onChanges', {
    bindings: {
      name: '<'
    },
    templateUrl: 'js/components/onChangesComponent.html',
    controller: [OnChangesController]
  });

})();
