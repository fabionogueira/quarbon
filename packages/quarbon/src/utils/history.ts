/** @format */
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

type THistoryItem = {
  fn: Function;
  action: string;
};

let _history: Array<THistoryItem> = [];
let history = window.history;

stateNormalize(() => {
  window.addEventListener("popstate", () => {
    let state = history.state || {};
    let item = _history[_history.length - 1];

    if (state._dispatch_) {
      if (_history.length == 0) {
        cancel();
      }
      return;
    }

    if (_history.length > 0) {
      if (state._index_ > _history.length) {
        if (item.action != "forward") {
          cancel();
        }
        item.action = "push";
      } else {
        dispatch();
      }

      return;
    }

    if (state._index_) {
      cancel();
    }
  });
});

function stateNormalize(fn: Function) {
  if (history.state?._index_) {
    history.back();
    setTimeout(() => stateNormalize(fn), 1);
  } else {
    fn();
  }
}

function dispatch() {
  let item, res;

  if (_history.length > 0) {
    item = _history[_history.length - 1];

    if (item) {
      res = item.fn();
      if (res === false) {
        item.action = "forward";
        return history.forward();
      }
    }

    _history.pop();

    if (_history.length > 0) {
      history.replaceState({ _dispatch_: true }, "", "");
    }
  }
}

function cancel() {
  history.back();
}

export const History = {
  /**
   * @description call fn with back event occurred, cancel back event with fn returned false
   */
  onBack(fn: Function) {
    _history.push({
      fn,
      action: "push",
    });

    history.pushState({ _index_: _history.length }, "", "");

    return () => History.offBack(fn);
  },
  offBack(fn: Function) {
    let index = _history.findIndex((item) => item.fn == fn);

    if (index >= 0) {
      _history.splice(index, 1);

      if (_history.length == 0) {
        history.replaceState({ _dispatch_: true }, "", "");
        history.back();
      }
    }
  },
  goBack() {
    history.back();
  },
};
