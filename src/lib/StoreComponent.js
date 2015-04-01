import React from 'react';

/*

  Pass Store properties to children declatatively.
  fetch : (array|object)

    <Store fetch={['prop', 'otherProp']}>
      <Child />
    </Store>

    <Store fetch={{ prop: ['item', 'id'] }} />

 Uses the store in this.context.store

 Given a fetch property
   1. grabs fetch values from store
   2. passes values as props to its children

*/

export default class StoreComponent extends React.Component {
  render() {
    const children = React.Children.only(this.props.children);

    if (!children)
      return;

    if (!this.context.store)
      return children;

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