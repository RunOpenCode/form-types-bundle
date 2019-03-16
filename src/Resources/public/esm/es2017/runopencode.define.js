
// runopencode: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './runopencode.core.js';
import { COMPONENTS } from './runopencode.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
