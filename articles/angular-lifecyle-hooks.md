# Exploring angular 1.5 lifecycle hooks

The release of Angular 1.5 has introduced some powerful features that have made angular fun and easy  to use. One of this features is the lifecyle hooks. On that note i am going to discuss Angular 1.5 Lifecyle Hooks. Lets get startd right away.

## Lifecyle hooks
Lifecyle hooks were introduced to angular in Angular 2 alpha. They were more or less inspired by the custom elements lifecyle callbacks. This is to mean that they are not actually the same so to speak. Angular 2 components comes with lifecyle hooks like ngonInit(), ngOnDestroy(), ngOnChanges and many more, for detailed information visit the [offfial docs](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html).

Angular 1 is evolving in a way to keep the gap to angular 2 as small as possible, with the introduction of `.component()` some lifecyle callbacks have been backported to the current angular. Lets look at them one by one. Please note thate Angular lifecycle-hooks were introduced in version 1.5.3.


$onInit()
This lifecyle is executed when all controllers on the element have been constructed and after their bindings are initialized. this hook is meant to be used for any kind of initialization work for the controller. Imagine you have a view which when visited should be populated with list of mangoes when loaded. Normally you will write a function that would be called when the controller loaded, example
```javascript
var module = angular.module('app', []);

function MyController() {
  this.init() {
    this.name = "Thomas Mganga"
  }

  this.init();
}

module.controller('MyController', MyController);

```
Using `$onInit` lifecyle hook we can now write is as below.
```javascript
var module = angular.module('app', []);

function MyComponent() {
  
}

module.controller('MyController', MyComponent);
