import { Promise } from 'bluebird';
Promise.longStackTraces();
window.Promise = Promise;

// fetch
import 'isomorphic-fetch';

import UI from 'reapp-ui';
import 'reapp-object-assign';

// data
import Immutable from 'immutable';
import store from './lib/store';
import Store from './lib/StoreComponent';
import action from './lib/action';

// theme
import theme from './lib/theme';

// ui
import Components from 'reapp-ui/all';

// router
import Router from 'react-router';
import generator from 'reapp-routes/react-router/generator';
import render from 'reapp-routes/react-router/render';

// reapp
import Theme from 'reapp-ui/helpers/Theme';
import Reapp from './lib/Reapp';

// react patch
import React from 'react';
import Component from './lib/Component';
import Page from './lib/Page';

React._Component = React.Component;
React.Component = Component;
React.Page = Page;

// inappbrowser
if (window.cordova && window.cordova.InAppBrowser)
  window.open = window.cordova.InAppBrowser.open;

module.exports = Object.assign(
  Components,
  {
    // react
    React,

    // reapp component/page export
    Component,
    Page,

    // immutable
    Immutable,

    // promise
    Promise,

    // reapp
    Reapp,

    // data
    action,
    store,
    Store,

    // theme
    theme,
    makeStyles: UI.makeStyles,

    // router
    Router,
    router: function(require, routes) {
      return render.async(generator.routes(require, routes))
    },
    route: generator.route
  }
);