import { Module } from '../module';
import * as classModule from './class';
import * as propsModule from './props';
import * as attrModule from './attributes';
import * as styleModule from './style';

export interface ModuleIndex {
  class: typeof classModule;
  props: typeof propsModule;
  attributes: typeof attrModule;
  style: typeof styleModule;
}
