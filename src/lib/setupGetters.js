import store from './store';
import action from './action';

export default function() {
  this.store = store.cursor();
  this.action = action;
  this.router = (action, ...args) => {
    return action ?
      this.context.router[action].apply(this, args) :
      this.context.router;
  }
}