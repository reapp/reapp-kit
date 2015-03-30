require('reapp-ui');
require('reapp-object-assign')

var React = require('react');
var Components = require('reapp-ui/all');
var shouldupdate = require('omniscient/shouldupdate');

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

// desktop touch demo
if (window.location.hash && window.location.hash.match(/_desktopTouch/))
  require('reapp-ui/lib/desktopTouch');

// inappbrowser
if (window.cordova && window.cordova.InAppBrowser)
  window.open = window.cordova.InAppBrowser.open;

var Theme = 'reapp-ui/helpers/Theme';

var statics = Object.assign(
  Components,
  {
    // react
    React: React,

    // component
    Component: Component,

    Reapp: React.createClass({
      mixins: [
        RoutedViewListMixin
      ],

      // store refresh
      componentWillMount() {
        this.forceUpdater = function() {
          this.forceUpdate();
        }.bind(this);
        this.props.store.listen(this.forceUpdater);
      },
      componentWillUnmount() {
        this.props.store.unlisten(this.forceUpdater);
      },

      render() {
        return  React.createFactory(
          Theme(this.props.theme, this.props.children)
        );
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