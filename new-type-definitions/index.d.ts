import { VNode } from "snabbdom";

declare namespace toHTML {
  interface Module {
    (vnode: VNode, attributes: Map<string, number | string>): void;
  }
}
declare function toHTML(vnode: VNode): string;
export = toHTML
