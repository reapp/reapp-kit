var React = require('react');
var RoutedViewListMixin = require('reapp-routes/react-router/RoutedViewListMixin');
var Components = require('reapp-ui/all');
var store = require('./store');
var theme = require('./theme');
var actions = require('./actions');

module.exports = function(Component) {
  return React.createClass({
    mixins: [
      RoutedViewListMixin
    ],

    childContextTypes: {
      theme: React.PropTypes.object,
      animations: React.PropTypes.object,
      store: React.PropTypes.func,
      actions: React.PropTypes.func,
      router: React.PropTypes.func
    },

    getChildContext() {
      return {
        theme: theme(),
        store: store(),
        actions: actions
      };
    },

    // store refresh
    componentWillMount: function() {
      this.forceUpdater = function() {
        this.forceUpdate();
      }.bind(this);

      if (store())
        store().listen(this.forceUpdater);
    },
    componentWillUnmount: function() {
      if (store())
        store().unlisten(this.forceUpdater);
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
}