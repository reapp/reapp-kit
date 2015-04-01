import React from 'react';
import s from './store';
import clone from 'reapp-ui/lib/niceClone';

export default class StoreComponent extends React.Component {
  componentWillMount() {
    this.store = s()();
  }

  render() {
    const children = React.Children.only(this.props.children);
    if (!children) return;

    const { fetch, ...props } = this.props;
    let storeProps = {};

    // support array or object syntax
    if (Array.isArray(fetch))
      fetch.forEach(key => storeProps[key] = this.store.get(key));
    else
      Object.keys(fetch).forEach(prop => {
        const key = fetch[prop] === true ? prop : fetch[prop];
        storeProps[prop] = this.store.get(key)
      });

    // pass through props
    Object.assign(storeProps, props);

    return React.cloneElement(children, storeProps);
  }
}