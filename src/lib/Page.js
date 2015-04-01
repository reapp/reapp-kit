import React from 'react';
import ContextTypes from './ContextTypes';
import ShouldUpdate from './ShouldUpdate';
import RoutedViewListMixin from 'reapp-routes/react-router/RoutedViewListMixin';
import AutoBind from './AutoBind';

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
    if (shouldAutoBind) this.autoBind();
  }
}

export default Page;