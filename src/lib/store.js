var Fynx = require('fynx');
var Immutable = require('immutable');

var store;

module.exports = function(obj) {
  if (obj)
    store = Fynx.createCursorStore(Immutable.fromJS(obj));
  else
    return store;
}