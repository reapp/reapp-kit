var UI = require('reapp-ui');
require('reapp-object-assign');

// fetch
require('isomorphic-fetch');

// data
var store = require('./lib/store');
var actions = require('./lib/actions');

// theme
var theme = require('./lib/theme');

// react patch
var React = require('react');
React.Component = require('./lib/Component');
React.Page = require('./lib/Page');

// ui
var Components = require('reapp-ui/all');

// router
var generator = require('reapp-routes/react-router/generator');
var render = require('reapp-routes/react-router/render');

// reapp
var Theme = require('reapp-ui/helpers/Theme');
var Reapp = require('./lib/Reapp');

// desktop touch demo
if (window.location.hash && window.location.hash.match(/_desktopTouch/))
  require('reapp-ui/lib/desktopTouch');

// inappbrowser
if (window.cordova && window.cordova.InAppBrowser)
  window.open = window.cordova.InAppBrowser.open;

module.exports = Object.assign(
  Components,
  {
    // react
    React: React,

    // promise
    Promise: Promise,

    // reapp
    Reapp: Reapp,

    // data
    actions: actions,
    store: store,

    // theme
    theme: theme,
    makeStyles: UI.makeStyles,

    // router
    router: function(require, routes) {
      return render.async(generator.routes(require, routes))
    },
    route: generator.route
  }
);