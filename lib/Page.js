var React = require('react');
var ContextTypes = require('./ContextTypes');
var ShouldUpdate = require('./ShouldUpdate');
var RoutedViewListMixin = require('reapp-routes/react-router/RoutedViewListMixin');

module.exports = React.createClass(
  Object.assign({}, ContextTypes, ShouldUpdate,
    {
      mixins: [RoutedViewListMixin],
      render: function() {}
    }
  )
);