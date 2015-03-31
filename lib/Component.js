var React = require('react');
var shouldupdate = require('omniscient/shouldupdate');

module.exports = React.createClass({
  contextTypes: {
    theme: React.PropTypes.object,
    animations: React.PropTypes.object,
    router: React.PropTypes.func,
    store: React.PropTypes.func,
    actions: React.PropTypes.func
  },

  componentWillMount: function() {
    this.actions = this.context.actions;
    this.store = this.context.store;
    this.router = this.context.router;
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    let isAnimating = false;

    if (this.context.animations)
      isAnimating = this.context.animations['viewList'].step % 1 !== 0;

    return isAnimating || shouldupdate.call(this, nextProps, nextState);
  },

  render: function() {}
});