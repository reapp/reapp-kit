require('reapp-ui');
require('reapp-object-assign');

// promises
var bluebird = require('bluebird');
Promise = bluebird.Promise;

// fetch
require('isomorphic-fetch');

// components
var React = require('react');
var Components = require('reapp-ui/all');
var shouldupdate = require('omniscient/shouldupdate');
var Animated = require('reapp-ui/mixins/Animated');

var Component = React.createClass({
  contextTypes: {
    theme: React.PropTypes.object,
    animations: React.PropTypes.object,
    router: React.PropTypes.func,
    store: React.PropTypes.func,
    actions: React.PropTypes.object
  },

  componentWillMount: function() {
    this.actions = this.context.actions;
    this.store = this.context.store;
    this.router = this.context.router;
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    let isAnimating = false;

    if (this.context.animations)
      isAnimating = this.context.animations['viewList'].step % 1 !== 0;

    return isAnimating || shouldupdate.call(this, nextProps, nextState);
  },

  render: function() {}
});

// router
var generator = require('reapp-routes/react-router/generator');
var render = require('reapp-routes/react-router/render');
var RoutedViewListMixin = require('reapp-routes/react-router/RoutedViewListMixin');
var ParentRouteMixin = require('reapp-routes/react-router/ParentRouteMixin');

// desktop touch demo
if (window.location.hash && window.location.hash.match(/_desktopTouch/))
  require('reapp-ui/lib/desktopTouch');

// inappbrowser
if (window.cordova && window.cordova.InAppBrowser)
  window.open = window.cordova.InAppBrowser.open;

var Theme = require('reapp-ui/helpers/Theme');

var statics = Object.assign(
  Components,
  {
    // react
    React: React,

    // component
    Component: Component,

    Reapp: function(opts, Component) {
      return React.createClass({
        mixins: [
          RoutedViewListMixin
        ],

        childContextTypes: {
          theme: React.PropTypes.object,
          animations: React.PropTypes.object,
          store: React.PropTypes.func,
          actions: React.PropTypes.object
        },

        getChildContext() {
          return opts;
        },

        // store refresh
        componentWillMount: function() {
          this.forceUpdater = function() {
            this.forceUpdate();
          }.bind(this);

          if (opts.store)
            opts.store.listen(this.forceUpdater);
        },
        componentWillUnmount: function() {
          if (opts.store)
            opts.store.unlisten(this.forceUpdater);
        },

        render: function() {
          var children = this.props.children;
          var theme = this.props.theme;

          var viewList =
            React.createFactory(Components.ViewList, this.props.viewListProps, children);

          var themedChildren = theme ?
            React.createFactory(theme, viewList) : viewList;

          return React.createElement(Component, {
            child: this.hasChildRoute() && this.createChildRouteHandler,
            viewListProps: this.routedViewListProps()
          });
        }
      })
    },

    // router
    router: function(require, routes) {
      return render.async(generator.routes(require, routes), {})
    },
    route: generator.route
  }
);

module.exports = statics;