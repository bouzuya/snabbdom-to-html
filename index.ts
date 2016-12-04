import { VNode } from 'snabbdom';
import init from './init';
import modules from './modules';

const toHTML: (vnode: VNode) => string = init([
  modules.attributes,
  modules.props,
  modules.class,
  modules.style
]);

export default toHTML;
