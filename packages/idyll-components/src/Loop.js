const React = require('react');
const { mapChildren } = require('idyll-component-children');

class Loop extends React.Component {
  render() {
    const { children, value } = this.props;

    if (children) {
      return mapChildren(children, child => {
        return value.map(val => {
          let newProps = Object.assign({}, child.props);
          newProps = Object.keys(child.props).reduce((props, elm) => {
            if (props[elm] === '_iterator') {
              props[elm] = val;
              return props;
            }
            return props;
          }, newProps);
          return React.cloneElement(child, { ...newProps });
        });
      });
    }
    return null;
  }
}

Loop._idyll = {
  name: 'Loop',
  tagType: 'open',
  children: ['Some text'],
  props: [
    {
      name: 'value',
      type: 'array',
      example: "['one', 'two', 'three']",
      description: 'Array of values to map.'
    },
    {
      name: 'currentValue',
      type: 'string',
      example: 'iterator',
      description:
        'Value of the current element being processed from the array.'
    }
  ]
};
module.exports = Loop;
