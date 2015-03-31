var shouldupdate = require('omniscient/shouldupdate');

module.exports = {
  shouldComponentUpdate: function(nextProps, nextState) {
    var isAnimating = false;

    if (this.context.animations)
      isAnimating = this.context.animations['viewList'].step % 1 !== 0;

    return isAnimating || shouldupdate.call(this, nextProps, nextState);
  }
};