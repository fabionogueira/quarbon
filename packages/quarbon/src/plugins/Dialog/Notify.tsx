import { createRef, StrictMode, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createRoot } from "react-dom/client";

import { QBadge, QInlineNotify } from "@quarbon/ui";
import { DOM } from "@quarbon/utils/dom";

import "./Notify.scss";

const NotifyListTransitions = {
  enter: `slide_top-enter`,
  enterActive: `slide_top-enter-active`,
  exit: `fade-all-exit`,
  exitActive: `fade-all-exit-active`,
};

type TNotifyItem = {
  key: string;
  subtitle: string;
  title?: string;
  caption: string;
  kind: "error" | "info" | "success" | "warning";
  timeout: number;
  close: Function;
  nodeRef?: any;
  count: number;
};

const containers: any = {};
const notifications: Array<TNotifyItem> = [];
const notify = {
  add(item: TNotifyItem) {}, // defined in NotifyList
  remove(index: number) {},  // defined in NotifyList
};

let notificationKey = 1000;

function NotifyList({ onCreated }: any) {
  const [value, setValue] = useState(0);

  function add(item: TNotifyItem) {
    let exists = notifications.find(
      (n) =>
        (n.title == item.title &&
          n.subtitle == item.subtitle &&
          n.caption == item.caption) ||
        n.key == item.key
    );

    if (exists) {
      if (exists.key == item.key) return;
      exists.count++;
    } else {
      notifications.push(item);
    }

    setValue(value + 1);
  }

  function remove(index: number) {
    notifications.splice(index, 1);
    setValue(value + 1);
  }

  notify.add = add;
  notify.remove = remove;

  useEffect(() => {
    onCreated && onCreated();
  }, []);

  return (
    <TransitionGroup>
      {notifications.map((item) => {
        item.nodeRef = item.nodeRef || createRef();

        return (
          <CSSTransition
            key={item.key}
            nodeRef={item.nodeRef}
            timeout={400}
            classNames={NotifyListTransitions}
          >
            <div ref={item.nodeRef} className="notification-wraper">
              <QInlineNotify 
                title={item.title as any}
                subtitle={item.subtitle}
                caption={item.caption}
                kind={item.kind}
                onCloseClick={() => item.close(item.key)}
              >
                {item.count > 1 && (
                  <QBadge
                    floating
                    color="warning"
                    buzz={Date.now()}
                    label={item.count}
                  />
                )}
              </QInlineNotify>
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

function create(container: any, onCreated: Function) {
  if (container.root) return onCreated();

  container.root = createRoot(container.wrapper);
  container.root.render(
    <StrictMode>
      <NotifyList onCreated={onCreated} />
    </StrictMode>
  );
}

function getContainer(position: string, align: string) {
  let wrapper: any;
  let rootEl: any;
  let key = `${position}-${align}`;
  let container = containers[key];

  if (!container) {
    rootEl = document.body.appendChild(document.createElement("div"));
    rootEl.setAttribute(
      "class",
      `notifications notifications--${position} notifications--${align}`
    );

    wrapper = rootEl.appendChild(document.createElement("div"));
    wrapper.setAttribute("class", "notifications__content");

    container = containers[key] = {
      rootEl,
      init: false,
      children: [],
      wrapper,
    };
  }

  container.rootEl.style.zIndex = DOM.zIndex();

  return container;
}

export const Notify = {
  error: (subtitle: string, title?: string, timeout?: number) =>
      Notify.create(subtitle, title, "error", timeout),

  info: (subtitle: string, title?: string, timeout?: number) =>
      Notify.create(subtitle, title, "info", timeout),

  success: (subtitle: string, title?: string, timeout?: number) =>
      Notify.create(subtitle, title, "success", timeout),

  warning: (subtitle: string, title?: string, timeout?: number) =>
      Notify.create(subtitle, title, "warning", timeout),

  create: (
      subtitle: string,
      title?: string,
      kind: string = "info",
      timeout: number = 5000
  ) => {
    let key = `k-${notificationKey++}`;
    let container: any = getContainer("top", "center");
    let tm = setTimeout(()=>close(key), timeout);

    create(container, () => {
      notify.add({
        key,
        title: title || "",
        subtitle: subtitle || "",
        caption: "",
        kind: (kind as any),
        timeout,
        count: 1,
        close,
      });
    });

    function close(k: string) {
      let index = notifications.findIndex((item: any) => item.key == k);

      clearTimeout(tm);
      if (index >= 0) notify.remove(index);
    }
  },
};
