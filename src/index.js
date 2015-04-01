import UI from 'reapp-ui';
import 'reapp-object-assign';
import 'reapp-ui/lib/desktopTouch';

// fetch
import 'isomorphic-fetch';

// data
import store from './lib/store';
import StoreComponent from './lib/StoreComponent';
import actions from './lib/actions';

// thmee
import theme from './lib/theme';

// ui
import Components from 'reapp-ui/all';

// router
import generator from 'reapp-routes/react-router/generator';
import render from 'reapp-routes/react-router/render';

// reapp
import Theme from 'reapp-ui/helpers/Theme';
import Reapp from './lib/Reapp';

// react patch
import React from 'react';
import Component from './lib/Component';
import Page from './lib/Page';
React.Component = Component;
React.Page = Page;

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
    Store: StoreComponent,

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