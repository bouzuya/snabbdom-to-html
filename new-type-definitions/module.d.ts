import { VNode } from "snabbdom";

export interface Module {
  (vnode: VNode, attributes: Map<string, number | string>): void;
}
