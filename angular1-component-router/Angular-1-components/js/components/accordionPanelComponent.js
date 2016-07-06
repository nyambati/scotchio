
(function () {
  'use strict';
  const app = angular.module('app');

  function AccordionPanelController() {
    var self = this;
    self.$onInit = function () {
      self.parent.addPanel(self);
    };

    self.turnOn = function () {
      self.selected = true;
    };

    self.turnOff = function () {
      self.selected = false;
    };

    self.select = function () {
      self.parent.selectPanel(self);
    };
  }

  app.component('accordionPanel', {
    transclude: true,
    require: {
      'parent' : '^accordion'
    },
    // Here we specify that we are want an string attribute bindings
    // Refer to angular doc
    bindings: {
      heading: '@'
    },
    template: `
    <div class="panel panel-default">
    <div class="panel-heading" ng-click="$ctrl.select()">
      <h3 class="panel-title">{{$ctrl.heading}}</h3>
    </div>
      <div class="panel-body" ng-transclude ng-if="$ctrl.selected">
      </div>
    </div>
  `, controller: AccordionPanelController,
  });
})();