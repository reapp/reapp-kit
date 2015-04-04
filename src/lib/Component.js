import React from 'react';
import ContextTypes from './ContextTypes';
import ShouldUpdate from './ShouldUpdate';
import AutoBind from './AutoBind';
import setupGetters from './setupGetters';

const Base = React.Component;
Base.shouldComponentUpdate = ShouldUpdate.shouldComponentUpdate;
Base.contextTypes = ContextTypes;
Object.assign(Base.prototype, AutoBind);

class Component extends Base {
  constructor(props, shouldAutoBind = true) {
    super(props);
    setupGetters.call(this);
    if (shouldAutoBind) this.autoBind();
  }
}

module.exports = Component;