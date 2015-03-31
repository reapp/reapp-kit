var React = require('react');
var RoutedViewListMixin = require('reapp-routes/react-router/RoutedViewListMixin');
var Components = require('reapp-ui/all');
var store = require('./store');
var theme = require('./theme');
var actions = require('./actions');
var ContextTypes = require('./ContextTypes');

module.exports = function(opts, Component) {
  if (!Component) {
    Component = opts;
    opts = null;
  }

  opts = opts || {
    routed: true
  };

  return React.createClass(Object.assign({},
    { childContextTypes: ContextTypes },
    {
      mixins: [].concat(opts.routed ? RoutedViewListMixin : []),

      getChildContext: function() {
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

        return React.createElement(Component, opts.routed ? {
          child: this.hasChildRoute() && this.createChildRouteHandler,
          viewListProps: this.routedViewListProps()
        } : {});
      }
    }
  ))
}