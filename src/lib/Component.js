var React = require('react');
var ContextTypes = require('./ContextTypes');
var ShouldUpdate = require('./ShouldUpdate');

var Base = React.Component;
Base.contextTypes = ContextTypes;
Base.shouldComponentUpdate = ShouldUpdate.shouldComponentUpdate;

class Component extends Base {
  constructor(props, shouldAutoBind = true) {
    super(props);
    if (shouldAutoBind)
      this.autoBind();
  }

  bind(methods) {
    methods.forEach(method => this[method] = this[method].bind(this));
  }

  autoBind() {
    const classProps = Object.getOwnPropertyNames(this.constructor.prototype);
    const classFuncs = classProps.filter(prop => typeof this[prop] === 'function');
    this.bind(classFuncs);
  }
}

module.exports = Component;