import { VNode } from "snabbdom";
import { Module } from './module';

declare namespace init { }
declare function init (modules: Module[]): (vnode: VNode) => string;
export = init
