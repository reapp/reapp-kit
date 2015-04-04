var Fynx = require('fynx');
var Immutable = require('immutable');

var cursor;

const store = function(obj) {
  if (obj)
    cursor = Fynx.createCursorStore(Immutable.fromJS(obj));
  else
    return cursor();
}

store.cursor = function() {
  return cursor;
}

export default store;