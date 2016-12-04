import * as forOwn from 'lodash.forown';
import * as escape from 'lodash.escape';

const attrsModule = (vnode, attributes) => {
  var attrs = vnode.data.attrs || {}

  forOwn(attrs, function (value, key) {
    attributes.set(key, escape(value))
  });
};

export default attrsModule;
