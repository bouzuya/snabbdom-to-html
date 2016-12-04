import { VNode } from 'snabbdom';
import * as parseSelector from 'parse-sel';
import {
  CONTAINER as CONTAINER_ELEMENTS,
  VOID as VOID_ELEMENTS
} from './elements';

type Module = (vnode: VNode, attributes: Map<string, string>) => void;
type Modules = Module[];
type Node = any;

const parse = (modules: Modules, vnode: VNode, node: Node): string => {
  const attributes = new Map([
    ['id', node.id],
    ['class', node.className]
  ]);
  modules.forEach((fn) => fn(vnode, attributes));
  return Array
    .from(attributes)
    .filter(([_key, value]) => value && value !== '')
    .map(([key, value]) => key + '="' + value + '"')
    .join(' ');
};

const init = (modules: Modules): (vnode: VNode) => string => {
  return function renderToString(vnode: VNode): string {
    if (!vnode.sel && vnode.text) {
      return vnode.text;
    }

    vnode.data = vnode.data || {};

    // Support thunks
    if (vnode.data.hook &&
      typeof vnode.data.hook.init === 'function' &&
      typeof vnode.data.fn === 'function') {
      vnode.data.hook.init(vnode);
    }

    const node = parseSelector(vnode.sel);
    const tagName = node.tagName;
    const attributes = parse(modules, vnode, node);
    const svg = vnode.data.ns === 'http://www.w3.org/2000/svg';
    const tag: string[] = [];

    // Open tag
    tag.push('<' + tagName);
    if (attributes.length) {
      tag.push(' ' + attributes);
    }
    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
      tag.push(' /');
    }
    tag.push('>');

    // Close tag, if needed
    if ((VOID_ELEMENTS[tagName] !== true && !svg) ||
      (svg && CONTAINER_ELEMENTS[tagName] === true)) {
      if (vnode.data.props && vnode.data.props.innerHTML) {
        tag.push(vnode.data.props.innerHTML);
      } else if (vnode.text) {
        tag.push(vnode.text);
      } else if (vnode.children) {
        vnode.children.forEach(function (child: any) {
          tag.push(renderToString(child));
        });
      }
      tag.push('</' + tagName + '>');
    }

    return tag.join('');
  };
};

export default init;

