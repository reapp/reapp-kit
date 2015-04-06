var UI = require('reapp-ui');

var theme;

module.exports = function(t) {
  if (t) {
    t = convertRawTheme(t);

    UI.addConstants.apply(UI, t.constants);
    UI.addStyles.apply(UI, t.styles);
    UI.addAnimations.apply(UI, t.animations);
    theme = UI.getTheme();
  }

  return theme;
}

// user may not want to configure a whole theme and just pass
// in the theme we give them wholesale, lets convert it
function convertRawTheme(theme) {
  if (!Array.isArray(theme.constants)) {
    return {
      constants: Object.keys(theme.constants).map(key => theme.constants[key]),
      styles: [].concat(theme.styles),
      animations: [].concat(theme.animations)
    }
  }
  else
    return theme;
}