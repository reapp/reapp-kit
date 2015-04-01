import React from 'react';
import ContextTypes from './ContextTypes';
import ShouldUpdate from './ShouldUpdate';
import AutoBind from './AutoBind';

const Base = React.Component;
Base.shouldComponentUpdate = ShouldUpdate.shouldComponentUpdate;
Base.contextTypes = ContextTypes;
Object.assign(Base.prototype, AutoBind);

class Component extends Base {
  constructor(props, shouldAutoBind = true) {
    super(props);
    if (shouldAutoBind) this.autoBind();
  }
}

module.exports = Component;