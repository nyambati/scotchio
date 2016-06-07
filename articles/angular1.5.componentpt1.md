## Introduction

Web Components are a set of features that allow the creation of reusable widgets in web documents and web applications. The components model in Angular 1.5.x allows for encapsulation and interoperability of individual HTML elements. Previously in angular 1.4.x you could build components  using `.directive()` method helper, with this method you could build custom HTML elements and attributes giving your application the modularity and encapsulation of DOM elements. If that got the job done why should I use the new `.component()` approach?  Good question buddy, let's answer that shall we?

## Prerequisites

This article doesn't cover angular basics, therefore requires basic understanding of [Angular 1](https://angularjs.org/). You should have prior knowledge of how to build applications with Angular 1, and you should be familiar with building custom directives with `.directive() ` helper. If this is your first time using Angular, I would recommend you read this [article](https://thinkster.io/a-better-way-to-learn-angularjs) before your proceed.

## Angular's 1.5.x .component upclose

The `.component()` method helper is just syntactic sugar of the good old `.directive()` method we all hate and love. There is practically nothing you can do with ` .component()` that you can't do with `.directive()`. However, `.component()` simplifies the way we create "components" - which roughly means UI directives. The Components approach pushes the community to use defaults that have become best practices. Here are some defaults that components are shipped with:

*  Components have isolated scopes by default.
*  They automatically use `controllerAs` syntax therefore we can use `$ctrl` to access component data.
*  They use controllers instead of `link` functions.
*  The `bindToController` option is on by default.


## Angular components :before and after
Below is an example of how we used to write components using the directive approach:
#### syntax:
```javascript
// before
 app.directive(name, fn)
 // after
 app.component(name, options)
```

#### Sample code:

```javascript
app.directive('listDirective', function () {
    return {
        // Isolated scope binding
        scope: {
            message: '='
        },
        // Inline template which is binded to message variable in the component controller
        template: '<div>Hello {{$ctrl.message}}</div>',
        // The controller that handles our component logic
        controller: function () {
                this.message = "Thomas directive"
        },
        //defaults, automatically set when using .component()
        controllerAs: '$ctrl',
        bindToController: true
    };
});
```
It's a simple component directive, with isolated scope, binding and controller. Now let's look at the component approach

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

Elegant right? You can see not much has changed,  It is simpler and straightforward. Also, we get to enjoy some default settings.  `bindToController`  is set to true  and `controllerAs` set to `$ctrl` all of this is done by the component itself.

## Passing external data to components

When building an angular application, data is always loaded by services and passed to controllers then to template. We could inject the service as depedency and get the data we need, but if another component or controller has loaded this data already we would be repeating ourselves. So what do we do ? This is where bindings comes in, we can achieve this by adding a parameter to pass data to our component, which would be used as follows:
```javascript
<our-component data="'this is the data we need'"></our-component>

```
In our component definition, we basically define the name of the attribute that will be added to our component along with the type binding we want to use. There are four different type of bindings:

1.  `= `  Two-way data binding. This means that if you update that variable in your component scope, the change will be reflected on the parent scope;
2.   `< `  One-way bindings when we just want to read a value from a parent scope and not update it;
3.   `@` This is for string parameters;
4.    `&`  This is for callbacks in case your component needs to output something to its parent scope.

 For more details read this [docs](https://docs.angularjs.org/api/ng/service/$compile#-scope-)

In our own case we need to pass a string, so our component will look like this:

```javascript
var app = angular.module('app',[]);

app.component('ourComponent', {
  // Binds the attibute data to the component controller.
  bindings: {
    data: '@'
  },
  template:'<p> {{$ctrl.data}}</p>'
});

```
Note that bindings are added to the local scope of your component, which is bound to a controller called `$ctrl` by default.

-----


## Implementation
Now that we have established what components are, the structure and how to build them. Let's actually make a component.
http://codepen.io/thomasnyambati/pen/gMaReM?editors=1010

#### Environment setup
Below are the tools we need to complete this exercise:

* [Node.js](http://https://nodejs.org/en/)
* [Angular 1.5.x](http://https://docs.angularjs.org/api)
* [Bower ](http://http://bower.io/)
* [ http-server](http://https://www.npmjs.com/package/http-server)

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

Create a new file in the root directory `.bowerrc`  and add the following lines of code.

**.bowerrc**
```json
{
    "directory":"lib"
}
```

The above file specifies the directory where our front-end libraries will be installed. To understand how `.bowerrc` works in detail visit [bower.io](http://bower.io/docs/config/).

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

Bower depends on `bower.json`  to keep track of all the front-end packages your application needs. Looking at it closely you will notice that `bootstrap` and `angular` are listed as dependecies. This are the libraries we need in this exercise. Visit [bower/spec](https://github.com/bower/spec/blob/master/json.md) to get more information regarding this file.

To get our setup ready:
1. Install http-server, `npm install http-server -g`
2. Install Angular and Bootstrap,  `bower install `

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

(function() {
 var app =  angular.module('app', []);
  app.controller('HomeCtrl', function() {
     this.message = "Hello, world";
  });
})();
```
So far we have created an angular application called `app`; we have also included bootstrap CSS for styling and our main application file `app.js`. In the `HomeCtrl` we have initialised message to `hello, world`.  In `index.html` we have required our controller with `ng-controller` directive and a div that is going to display our message. Run `http-server ` and visit `http://localhost:8080`. There we go, we got hello world printed out. This is a sign that angular is well set and working.
![](https://cdn.scotch.io/896/oPekjx97Rp2UhDEUnEyA_Screen%20Shot%202016-06-04%20at%2016.57.48.png)

## Adding Components

For this demo, we are going to create two components, one that create a navigation bar and another one that displays a list of users with names , country and city the reside in. We will start with the navigation bar.

In `js/components` create  two files  `appComponent.js` and `appComponent.hmtl` respectively.

**js/components/appComponent.js**
```javascript
(function(){
  'use strict';
  var app = angular.module('app');

  app.component('menuBar', {
    // defines a two way binding in and out of the component
    bindings: {
      brand:'<'
     },
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
      <a class="navbar-brand" href="#">{{$ctrl.brand}}</a>
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

In this template you can see we are using `ng-repeat` directive to dynamically generate the navigation bar. We can access data from the component controller by using `$ctrl`, in this case `$ctrl.menu` will contain the array of menus and `$ctrl.brand` will contain the data passed by the `brand` attribute.

If you visit the browser and refresh, you will still see `Hello, world` on the screen. This is because we have not added the component to our app. Let’s do that.  Include the component in the head tag and replace the `div` element  in `index.html` with the following code.

**index.html**
```html
<!--index.html-->

<head>
    <!--Components-->
     <script src="js/components/appComponent.js"></script>
 </head>

<body>
    <menu-bar brand="Brand"></menu-bar>
</body>

 ```

 Refresh the page again and  poof! We have our menu bar laid out beautifully.
 ![](https://cdn.scotch.io/896/HZP76SmwT8maZJqACE3F_Screen%20Shot%202016-06-04%20at%2016.51.43.png)


When angular bootstraps the app, it will read the Dom element `<menu-bar>` and maps it to our component `menuBar`. Therefore, whenever angular encounters this element it will render out component  for us.

Okay! Now that we have created our navigation component, let's add one more. We need a table that has names of users, the country of origin and the city they reside in. We could use a controller and populate the data in our view, but if we ever require this data in a different view we would have to repeat the same code again. To fix this we create another component.

 In `js/components` create new files `userComponent.js` and `userComponent.html`. In `userComponent.js` write the following code.

 **js/components/userComponent.js**
 ```javascript
(function(){
  'use strict';

  var app = angular.module('app');

  app.component('userInfo', {
    // load template
    bindings: {
      caption:'<'
    },
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
    <!-- table caption will be displayed here-->
    <tr>
      <td id="caption" colspan="4">{{$ctrl.name}}</td>
    </tr>
    <th>
      <td>Name</td>
      <td>City</td>
      <td>Country</td>
    </th>
    <!-- users will be displayed here-->
    <tr ng-repeat="user in $ctrl.records">
      <td></td>
      <td>{{user.name}}</td>
      <td>{{user.city}}</td>
      <td>{{user.country}}</td>
    </tr>
  </table>
</div>
<!-- component styling-->
<style type="text/css">
#caption {
  text-align: center;
}
</style>

```

In this template, we have created a table which accesses the component data through the use of `$ctrl`, loops through it and displays it to us. That's it? Hold on we are not done yet, right now we have just defined the component but our app has no way of locating this component, to register this component we need link our component script to the app and add  `user-info` tag to `index.html`. This way when angular sees this `user-info` tag it will render our component. Let’s do that.

**index.html**
```html

<!--index.html-->
<!--in the head tag-->
<script src="js/components/userComponent.js"></script>

<!--below <menu-bar> tag-->
  <user-info name="'Users Table'"></user-info>

```

When you refresh your browser, you should see the users displayed in table as below.
![](https://cdn.scotch.io/896/q7tUM0m1R3KC6Lluzxkn_Screen%20Shot%202016-06-07%20at%2012.44.54.png)


There you have it! We have built an angular application using components - simple and easy.

-----


## Conclusion
Building an angular application using `.controller()` and `.directive()` can become tedious and dirty. When your application scales your codebase can get messier. With the component approach, you can build your application in small feature specific blocks that are highly scalable,  maintainable and elegant.


