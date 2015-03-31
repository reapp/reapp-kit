var UI = require('reapp-ui');

var theme;

module.exports = function(t) {
  if (t) {
    UI.addConstants.apply(UI, t.constants);
    UI.addStyles.apply(UI, t.styles);
    UI.addAnimations.apply(UI, t.animations);
    theme = UI.getTheme();
  }

  return theme;
}