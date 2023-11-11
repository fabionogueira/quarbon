import { ReactNode } from "react";

export type TControl = {
  value?: any;
  type?: "select";
  options?: Array<string | number>;
};
export type TProp = {
  type: "boolean" | "string" | "number" | "event" | "any";
  control?: false | TControl;
  description?: string;
  default?: any;
};
export type TProps = Record<string, TProp>;
export type TStory = {
  id: string;
  label: string;
  header?: Array<string> | ReactNode;
  body: any;
  footer?: any;
};
export type TStories = {
  name: string;
  className?: string;
  component?: any;
  props?: TProps;
  description?: any;
  stories?: TStory | any[];
  custom?: any;
  playground?: any;
};

const allStories: Record<string, boolean> = {};
const levels: any = {};

let activeComponent: any = null

export const Meta = {
  get() {
    function sortLevel(obj: any) {
      return Object.keys(obj).map((k) => {
        const o = obj[k];

        if (o.children) o.children = sortLevel(o.children);

        return o;
      });
    }

    const arr = sortLevel(levels);
    const ar2: any = [];

    arr.forEach((n0) => {
      ar2.push({
        label: n0.label,
        page: n0.page,
      });

      if (n0.children) {
        n0.children.forEach((n1: any) => {
          ar2.push({
            label: n1.label,
            page: n1.page,
          });
        });
      }
    });
    return levels;
    //return ar2;
  },
  set(def: TStories) {
    const arr = def.name.split("/");

    activeComponent = def.component

    if (allStories[def.name]) return;
    allStories[def.name] = true;

    const key0 = arr[0];

    levels[key0] = levels[key0] || {};
    levels[key0].label = levels[key0].label || key0;

    if (arr[1]) {
      const key1 = arr[1];
      levels[key0].children = levels[key0].children || {};
      levels[key0].children[key1] = levels[key0].children[key1] || {};
      levels[key0].children[key1].label =
        levels[key0].children[key1].label || key1;
      levels[key0].children[key1].page = def;
    } else {
      levels[key0].page = def;
    }
  },
  getComponent() {
    return activeComponent
  }
};
