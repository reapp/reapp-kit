import Fynx from 'fynx';
import Immutable from 'immutable';
import React from 'react';

var cursor;

const store = function(obj) {
  if (obj)
    cursor = Fynx.createCursorStore(Immutable.fromJS(obj));
  else
    return cursor();
}

store.cursor = function(path, Component) {
  if (path) {
    if (!Component)
      return cursor().getIn(path);

    return class CursoredComponent extends React.Component {
      setCursors() {
        let curPath = path;
        this.cursors = {};

        if (typeof path === 'function')
          curPath = path.call(this);

        if (Array.isArray(curPath))
          curPath.forEach(key => {
            this.cursors[key] = cursor().get(key);
          });
        else
          Object.keys(curPath).forEach(key => {
            this.cursors[key] = cursor().getIn([].concat(curPath[key]));
          });
      }

      componentWillMount() {
        this.setCursors.call(this);
        cursor.listen(this.cursorListener, this);
      }

      componentWillUnmount() {
        cursor.unlisten(this.cursorListener, this);
      }

      cursorListener() {
        this.setCursors();
        this.forceUpdate();
      }

      render() {
        return <Component {...this.props} {...this.cursors} />
      }
    };
  }

  return cursor;
}

export default store;