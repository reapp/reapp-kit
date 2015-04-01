export default {
  bind(methods) {
    methods.forEach(method => this[method] = this[method].bind(this));
  },

  autoBind() {
    const classProps = Object.getOwnPropertyNames(this.constructor.prototype);
    const classFuncs = classProps.filter(prop =>
      prop !== 'constructor' && typeof this[prop] === 'function');
    this.bind(classFuncs);
  }
}