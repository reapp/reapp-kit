var React = require('react');

module.exports = {
  childContextTypes: {
    theme: React.PropTypes.object,
    animations: React.PropTypes.object,
    store: React.PropTypes.func,
    actions: React.PropTypes.func,
    router: React.PropTypes.func
  }
};