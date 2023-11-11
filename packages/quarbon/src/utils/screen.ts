/** @format */

import { vars } from "../css/vars";

let running = false;
let active = "";
let cls = "";
let listenersResize: Array<Function> = [];
let listenersChange: Array<Function> = [];

window.addEventListener("resize", () => {
  if (!running) {
    running = true;
    window.requestAnimationFrame(setAttribute);
  }
});

function setAttribute() {
  let sz: string;
  let lt = "";
  let gt = "";
  let w = window.innerWidth;

  running = false;

  if (w < vars.xs_max) {
    // extra small windows
    sz = "xs";
    lt = " size-lt-sm size-lt-md size-lt-lg size-lt-xl";
  } else if (w < vars.sm_max) {
    // small windows
    sz = "sm";
    lt = " size-lt-md size-lt-lg size-lt-xl";
    gt = " size-gt-xs";
  } else if (w < vars.md_max) {
    // medium-sized windows
    sz = "md";
    lt = " size-lt-lg size-lt-xl";
    gt = " size-gt-xs size-gt-sm";
  } else if (w < vars.lg_max) {
    // large windows
    sz = "lg";
    lt = " size-lt-xl";
    gt = " size-gt-xs size-gt-sm size-gt-md";
  } else {
    // extra large windows
    sz = "xl";
    gt = " size-gt-xs size-gt-sm size-gt-md size-gt-lg";
  }

  if (sz != active) {
    cls = "size-" + sz + lt + gt;
    document.body.setAttribute("class", cls);
    listenersChange.forEach((fn) => fn(sz, w));
  }

  active = sz;
  listenersResize.forEach((fn) => fn(w));
}

function addEventListener(listeners:Array<Function>, fn: Function, key: string | null = null) {
  if (key) {
    let index = listeners.findIndex((item:any) => item._key_ == key); 
    
    if (index >= 0) {
      listeners.splice(index, 1);
    }

    (fn as any)._key_ = key
  }

  listeners.push(fn);
}

function removeEventListener(listeners:Array<Function>, fn: Function | string) {
  let index: number;

  if (typeof (fn) == "string")
    index = listeners.findIndex((item:any) => item._key_ == fn);
  else
    index = listeners.findIndex((item) => item == fn);

  if (index >= 0) {
    listeners.splice(index, 1);
  }
}

setAttribute();

export const Screen = {
  onResize(fn: Function, key: string | null = null) {
    addEventListener(listenersResize, fn, key)
  },
  offResize(fn: Function | string) {
    removeEventListener(listenersResize, fn)
  },
  onChange(fn: Function, key: string | null = null) {
    addEventListener(listenersChange, fn, key)
  },
  offChange(fn: Function | string) {
    removeEventListener(listenersChange, fn)
  },
  size() {
    return active;
  },
  width() {
    return window.innerWidth;
  },
  sizes() {
    return cls;
  },
};
