import React from 'react';

export default class StoreComponent extends React.Component {
  render() {
    const children = React.Children.only(this.props.children);
    if (!children) return;

    const store = this.context.store();
    const { fetch, ...props } = this.props;
    let storeProps = {};

    // support array or object syntax
    if (Array.isArray(fetch))
      fetch.forEach(key => {
        storeProps[key] = store.get(key)
      });
    else
      Object.keys(fetch).forEach(prop => {
        const key = fetch[prop] === true ? prop : fetch[prop];
        storeProps[prop] = store.getIn(key)
      });

    // pass through props
    Object.assign(storeProps, props);

    return React.cloneElement(children, storeProps);
  }
}