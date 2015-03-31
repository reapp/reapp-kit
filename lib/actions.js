var Fynx = require('fynx');

var actions = function(name, cb) {
  if (!actions[name])
    actions[name] = Fynx.createAsyncAction(name);

  if (typeof cb === 'function')
    actions[name].listen(cb);
  else if (actions[name])
    actions[name](cb);
}

module.exports = actions;