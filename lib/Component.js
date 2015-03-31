var React = require('react');
var ContextTypes = require('./ContextTypes');
var ShouldUpdate = require('./ShouldUpdate');

var Component = function() {}
Component.contextTypes = ContextTypes;
Component.shouldComponentUpdate = ShouldUpdate.shouldComponentUpdate;

module.exports = Component;