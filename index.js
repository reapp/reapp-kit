require('reapp-ui');
require('reapp-object-assign')

var React = require('react');
var Components = require('reapp-ui/all');
var shouldupdate = require('omniscient/shouldupdate');
var clone = require('reapp-ui/lib/niceClone');

// component
class Component extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shouldupdate.call(this, nextProps, nextState);
  }
}

Component.contextTypes = {
  theme: React.PropTypes.object,
  animations: React.PropTypes.object,
  router: React.PropTypes.func,
  store: React.PropTypes.func
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

    Routed: function(Component) {
      return React.createClass({
        mixins: [
          RoutedViewListMixin
        ],

        render: function() {
          return <Component
            child={this.hasChildRoute() && this.createChildRouteHandler}
            viewListProps={this.routedViewListProps()}
          />
        }
      })
    },

    Reapp: React.createClass({
      propTypes: {
        context: React.PropTypes.object.isRequired
      },

      childContextTypes: {
        theme: React.PropTypes.object,
        animations: React.PropTypes.object,
        store: React.PropTypes.func,
        actions: React.PropTypes.object
      },

      getChildContext() {
        return this.props.context;
      },

      // store refresh
      componentWillMount: function() {
        this.forceUpdater = function() {
          this.forceUpdate();
        }.bind(this);

        if (this.props.context.store)
          this.props.context.store.listen(this.forceUpdater);
      },
      componentWillUnmount: function() {
        if (this.props.context.store)
          this.props.context.store.unlisten(this.forceUpdater);
      },

      render: function() {
        const { children, theme, ...props } = this.props;

        const viewList =
          <Components.ViewList {...this.props.viewListProps}>
            {children}
          </Components.ViewList>

        return theme ?
          <Theme {...theme}>{viewList}</Theme> : viewList;
      }
    }),

    // router
    router: function(require, routes) {
      return render.async(generator.routes(require, routes), {})
    },
    route: generator.route
  }
);

module.exports = statics;