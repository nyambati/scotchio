# Getting Started with Angular 1.5.x Components

## Introduction

Web Components are a set of features that allow for the creation of reusable widgets or components in web documents and web applications. The components model allows for encapsulation and interoperability of individual HTML elements. Previously in angular  you could build a components by using `.directive()` method helper, with this method you could build custom HTML elements and attribute giving your application the modularity and encapsulation of DOM elements. If that got the job done why should I use the new `.component()` approach?  Good question buddy, let's answer that shall we?

## Angular's .component upclose

First things first, this method helper is just syntactic sugar of the good old `.directive()` method we all hate and love. There is practically nothing you can do with` .component()` that you can't do with `.directive()`.  If that's the case what is it good for? It simplifies the way we create "components" - which roughly means UI directives and also pushes the community to use defaults that have become best practices. Here are some defaults that components are shipped with:
*  Components have isolated scopes by default.
*  They automatically use `controllerAs` syntax therefore we can use `$ctrl` to access component data.
*  They use controllers instead of `link` functions.
*  The `bindToController` option is on by default.


## Angular components :before and after
Below is an example of we used to write components using the directive approach:
#### syntax:
```javascript
// before
 module.directive(name, fn)
 // after
 module.component(name, options)
```

#### Sample code:

```javascript
app.directive('listDirective', function () {
    return {
        // Isolated scope binding
        scope: {
            message: '='
        },
        // Inline template which is binded to message variable
       // in the component controller
        template: '<div>Hello {{$ctrl.message}}</div>',
        // The controller that handles our component logic
        controller: function () {
                this.message = "Thomas directive"
        },
        //defaults, autmatically set when using .component()
        controllerAs: '$ctrl',
        bindToController: true
    };
});
```
It's a simple component directive, with isolated scope, binding and controller. Ok, I know that, how does the new guy do it?

Here is how you will write it with `.component()`

```javascript
app.component('listComponent', {
   // isolated scope binding
    bindings: {
        message: '='
    },
    // Inline template which is binded to message variable
    // in the component controller
    template:'<div>Hello {{$ctrl.message}}</div>',
    // The controller that handles our component logic
    controller: function () {
        this.message = "Thomas component"
    }
});
```

Elegant right? As you can see not much has changed, but is simpler, straightforward. Also, we get to enjoy some default settings.  `bindToController`  is set to true  and `controllerAs` set to `$ctrl` all of this is done by the component itself.


-----


## Implementation

#### Environment setup

Now that we have established what components are, the structure and how to build them, it will make sense if we did a small exercise to drill in this concept. Below are the tools we need to complete this exercise:

* Node.js
* Angular 1.5.x
* Bower
* http-server

Create a folder called `scotch-angular-components`  and in it, create the folders and files as follows.
```txt
├── bower.json
├── index.html
├── js
│   ├── app.js
│   └── components/
├── lib/
└── package.json
```

Create a new file in the root directory `.bowerrc`  and add the following lines of code. This file will instruct bower to install all the libraries to the `lib` folder.

**.bowerrc**
```json
{
    "directory":"lib"
}
```

Ensure that `bower.json` look similar to this.

**bower.json**
```json
{
  "name": "getting-started",
  "description": "Getting started with angular components",
  "main": "",
  "license": "MIT",
  "homepage": "",
  "dependencies": {
    "angular": "^1.5.6",
    "bootstrap": "^3.3.6"
  }
}
```

To get our setup ready:
1. Install http-server  `npm install http-server -g`
2. Install Angular and Bootstrap `bower install `

If you do not have bower installed on your machine,  run `npm install bower -g`. Now that we are done with the environment setup, let the fun begin.

#### Create an Angular app
In `index.html` write the code below.

**Index.html**
```html
<!DOCTYPE html>
<html en="us" ng-app="app">

<head>
  <title>Getting started with Angular 1.5.x components</title>
  <!-- bootsrap css-->
  <link rel="stylesheet" type="text/css" href="lib/bootstrap/dist/css/bootstrap.min.css">
  <!-- angularjs-->
  <script src="lib/angular/angular.min.js"></script>
  <!-- The main app script-->
  <script src="js/app.js"></script>
  <!-- components -->
</head>

<body>
    <div class="container" ng-controller="HomeCtrl as $ctrl">
        <h1>{{$ctrl.message}} </h1>
    </div>
</body>

</html>
```
 and in `js/app.js`.

 **js/app.js**
```javascript

(() => {
 const app =  angular.module('app', []);
  app.controller('HomeCtrl', function() {
     this.message = "Hello, world";
  });
})();
```
So far we have created an angular application called `app`; we have also included bootstrap CSS for styling and our main application file `app.js`. In the `HomeCtrl` we have initialised message to `hello, world`.  In `index.html` we have required our controller with `ng-controller` directive and a div that is going to display our message. Run `http-server ` and visit `http://localhost:8080`. There we go, we got hello world printed out. This is a sign that angular is well and working.
![](https://cdn.scotch.io/896/oPekjx97Rp2UhDEUnEyA_Screen%20Shot%202016-06-04%20at%2016.57.48.png)

## Adding Components

For this demo, we are going to create two components, one that create a navigation bar and another one that displays a list of users with names , country and city the reside in. We will start with the navigation bar.

In `js/components` create  two files  `appComponent.js` and `appComponent.hmtl` respectively.

**js/components/appComponent.js**
```javascript
(() => {
  'use strict';
  const app = angular.module('app');

  app.component('menuBar', {
    // defines a two way binding in and out of the component
    bindings: { },
    // Pulls in out template
    templateUrl: '/js/components/appComponent.html',
    controller: function () {
      this.menu = [{
        name: "Home",
        component: "home"
      }, {
        name: "About",
        component: "about"
      }, {
        name: "Contact",
        component: "contact"
      }];
    }
  });
})();
```

In the above file we are telling angular to create a component called menuBar, use template `appComponent.html` to render a list of menus `this.menu`.

**js/components/appComponent.html**
```html
<nav class="navbar navbar-default">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Brand</a>
    </div>
    <!-- Generated navbar -->
    <div>
      <ul class="nav navbar-nav">
        <li ng-repeat="menu in $ctrl.menu">
        <a href="{{menu.component}}">{{menu.name}}
            <span class="sr-only">(current)</span>
        </a>
    </li>
      </ul>
    </div>
    <!-- generated navbar -->
  </div>
  <!-- /.container-fluid -->
</nav>
```

In this template you can see we have are using `ng-repeat` directive to dynamically generate the navigation bar. We can access data from the component controller by using `$ctrl`, in this case `$ctrl.menu` will contain the array of menus.

If you visit the browser and refresh, you will still see `Hello, world` on the screen. This is because we have not added the component to our app. Let’s do that.  Include the component in the head tag and replace the `div` element  in `index.html` with the following code.

**index.html**
```html
<!--index.html-->

<!--Components-->
<head>
     <script src="js/components/appComponent.js"></script>
 </head>

<body>
    <menu-bar></menu-bar>
</body>

 ```

 Refresh the page again and  poof! we have our menu bar laid out beautifully.
 ![](https://cdn.scotch.io/896/HZP76SmwT8maZJqACE3F_Screen%20Shot%202016-06-04%20at%2016.51.43.png)

 Wow! How did that happen? Let me explain, when angular bootstraps the app, it will read the Dom element `<menu-bar> and maps it to our component `menuBar``. Therefore, whenever angular encounters this element it will render out component  for us. That's smart bro!  I know right?

Okay! Now that we have created our navigation component, let's add one more. We need a table that has names of users, the country of origin and the city they reside in. We could use a controller and populate the data in our view, but if we ever require this data in a different view we would have to repeat the same code again. To fix this we create another component.

 In `js/components` create new files `userComponent.js` and `userComponent.html`. In `userComponent.js` write the following code.

 **js/components/userComponent.js**
 ```javascript
(() => {
  'use strict';

  const app = angular.module('app');

  app.component('userInfo', {
    // load template
    bindings: {},
    templateUrl: '/js/components/userComponent.html',
    controller: function () {
      this.records = [{
        name: "Alfreds Futterkiste",
        city: "Berlin",
        Country: "Germany"
      }, {
        name: "Ana Trujillo Emparedados y helados",
        city: "México D.F.",
        country: "Mexico"
      }, {
        name: "Blondel père et fils",
        city: "Strasbourg",
        country: "France"
      }, {
        name: "Bólido Comidas preparadas",
        city: "Madrid",
        country: "Spain"
      }];
    }
  });
})();

```

In this file, we have created a component `userInfo` which contains an array of users in the records variable. To render this data we need a template that will iterate through the records array and display it to the browser.  In `js/components/userComponent.html` write the following code.

**js/components/userComponent.html**
```html
<div class="container">
  <table class="table table-bordered">
    <th>
      <td>Name</td>
      <td>City</td>
      <td>Country</td>
    </th>
    <tr ng-repeat="user in $ctrl.records">
      <td></td>
      <td>{{user.name}}</td>
      <td>{{user.city}}</td>
      <td>{{user.country}}</td>
    </tr>
  </table>
</div>

```

In this template, we have created a table which accesses the component data through the use of `$ctrl`, loops through it and displays it to us. That's it? Hold on we are not done yet, right now we have just defined the component but our app has no way of locating this component, to register this component we need link our component script to the app and add  `user-info` tag to `index.html`. This way when angular sees this `user-info` tag it will render our component. Let’s do that shall we?

**index.html**
```html

<!--index.html-->
<!--in the head tag-->
<script src="js/components/userComponent.js"></script>

<!--below <menu-bar> tag-->
<user-info></user-info>

```

When you refresh your browser, you should see the users displayed in a very beautiful table as below.

![](https://cdn.scotch.io/896/VwssqFaRdir8og7tcsvk_Screen%20Shot%202016-06-06%20at%2010.40.49.png)

There you have it! We have built an angular application using components - simple and easy.

-----


## Conclusion
Building an angular application using `.controller()` and `.directive()` can become tedious and dirty. When your application scales your codebase can get messier. With the component approach, you can build your application in small feature specific blocks that are highly scalable,  maintainable and elegant.
