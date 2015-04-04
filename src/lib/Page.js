import React from 'react';
import ContextTypes from './ContextTypes';
import ShouldUpdate from './ShouldUpdate';
import RoutedViewListMixin from 'reapp-routes/react-router/RoutedViewListMixin';
import AutoBind from './AutoBind';
import store from './store';
import actions from './actions';

const Base = React.createClass(Object.assign(
  {},
  AutoBind,
  ShouldUpdate,
  {
    contextTypes: ContextTypes,
    mixins: [RoutedViewListMixin],
    render: function() {}
  }
));

class Page extends Base {
  constructor(props, shouldAutoBind = true) {
    super(props);

    this.store = store.cursor();
    this.actions = actions;
    this.router = () => this.context.router;

    if (shouldAutoBind) this.autoBind();
  }
}

export default Page;