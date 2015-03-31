var React = require('react');
var ContextTypes = require('./ContextTypes');
var ShouldUpdate = require('./ShouldUpdate');

class Component extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ShouldUpdate.shouldComponentUpdate(nextProps, nextState);
  };
}

Component.contextTypes = ContextTypes;

module.exports = Component;