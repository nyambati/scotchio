# Bower packaged angular-component-router

So you've read all about the new router in AngularJS 1.5 and you would
like to include it in your bower build?

There is no official release for Bower
[angular/angular#7544](https://github.com/angular/angular/issues/7544),
hence this repo.

## Install

You can install the AngularJS 1.5 component router with either `npm`
or with `bower`.

### npm

You are in the wrong place. The module is already officially released
on npmjs.

### bower

```shell
bower install angular-component-router
```

Then add a `<script>` to your `index.html`:

```html
<script src="/bower_components/angular-component-router/angular_1_router.js"></script>
<script src="/bower_components/angular-component-router/ng_route_shim.js"></script>
```

Then add `ngComponentRouter` as a dependency for your app:

```javascript
angular.module('myApp', ['ngComponentRouter']);
```

## Documentation

Documentation is available on the
[AngularJS docs site](https://docs.angularjs.org/guide/component-router).

## License

The MIT License.

## Take over this repo

Please raise an issue to take over this repo and move it to the
angular organization on GitHub.
