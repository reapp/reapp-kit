var React = require('react');
var RoutedViewListMixin = require('reapp-routes/react-router/RoutedViewListMixin');
var Components = require('reapp-ui/all');
var store = require('./store');
var theme = require('./theme');
var action = require('./action');
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
          store: store.cursor(),
          action: action
        };
      },

      componentWillMount() {
        this.forceUpdater = () => this.forceUpdate();
        store.cursor() && store.cursor().listen(this.forceUpdater);
      },

      componentWillUnmount() {
        store.cursor() && store.cursor().unlisten(this.forceUpdater);
      },

      render: function() {
        const children = this.props.children;
        const Theme = this.props.theme;
        const viewList =
          <Components.ViewList {...this.props.viewListProps}>
            {children}
          </Components.ViewList>

        const themedChildren = Theme ? <Theme>{viewList}</Theme> : viewList;
        const props = opts.routed ? {
          child: this.hasChildRoute() && this.createChildRouteHandler,
          viewListProps: this.routedViewListProps()
        } : {};

        return <Component {...props} />;
      }
    }
  ))
}