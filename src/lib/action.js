import Fynx from 'fynx';

var action = function(name, cb) {
  if (!action[name])
    action[name] = Fynx.createAsyncAction(name);

  if (typeof cb === 'function') {
    if (name === 'listen' || name === 'unlisten')
      throw new Error("Can't name your action 'listen' or 'unlisten'");

    return action[name].listen(cb);
  }
  else if (action[name])
    return action[name](cb);
}

action.unlisten = function(name, fn) {
  action[name].unlisten(fn);
}

export default action;