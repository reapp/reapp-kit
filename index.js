require('reapp-ui');
require('reapp-object-assign')

var React = require('react');
var Components = require('reapp-ui/all');
var shouldupdate = require('omniscient/shouldupdate');

// component
class Component extends React.Component {
  componentWillMount() {
    this.actions = this.context.actions;
    this.store = this.context.store;
    this.router = this.context.router;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldupdate.call(this, nextProps, nextState);
  }
}

Component.contextTypes = {
  theme: React.PropTypes.object,
  animations: React.PropTypes.object,
  router: React.PropTypes.func,
  store: React.PropTypes.func,
  actions: React.PropTypes.object
}

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
          const { children, theme, ...props } = this.props;

          const viewList =
            <Components.ViewList {...this.props.viewListProps}>
              {children}
            </Components.ViewList>

          const themedChildren = theme ?
            <Theme {...theme}>{viewList}</Theme> : viewList;

          return (
            <Component
              child={this.hasChildRoute() && this.createChildRouteHandler}
              viewListProps={this.routedViewListProps()}
            />
          )
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