require('reapp-ui');
require('reapp-object-assign')

var React = require('react');
var Components = require('reapp-ui/all');
var router = require('reapp-routes/react-router');

// desktop touch demo
if (window.location.hash && window.location.hash.match(/_desktopTouch/))
  require('reapp-ui/lib/desktopTouch');

// inappbrowser
if (window.cordova && window.cordova.InAppBrowser)
  window.open = window.cordova.InAppBrowser.open;

module.exports = Object.assign(
  Components,
  {
    React: React,
    router: router
  }
);