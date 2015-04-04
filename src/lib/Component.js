import React from 'react';
import ContextTypes from './ContextTypes';
import ShouldUpdate from './ShouldUpdate';
import AutoBind from './AutoBind';
import store from './store';
import actions from './actions';

const Base = React.Component;
Base.shouldComponentUpdate = ShouldUpdate.shouldComponentUpdate;
Base.contextTypes = ContextTypes;
Object.assign(Base.prototype, AutoBind);

class Component extends Base {
  constructor(props, shouldAutoBind = true) {
    super(props);

    this.store = store.cursor();
    this.actions = actions;
    this.router = () => this.context.router;

    if (shouldAutoBind) this.autoBind();
  }
}

module.exports = Component;