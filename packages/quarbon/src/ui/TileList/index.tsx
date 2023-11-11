/** @format */

import { createClassName } from "../../utils/css";
import "./TileList.scss";

type TTileListProps = {
  children: any;
  className?: string;
  disable?: boolean;
  bordered?: boolean;
  gap?: number; // 10px;
  columns?: number; // 8; /* This gets overridden by an inline style. */
  tileMinWidth?: number; // 200px; /* This gets overridden by an inline style. */

  onClick?: Function;
};

const cssMap: any = {
  bordered: { true: "c-tile-list--bordered" },
};
const defaults = {};

export function TileList({ children, ...props }: TTileListProps) {
  const css = createClassName(cssMap, props, "c-tile-list", defaults);

  return <div className={css}>{children}</div>;
}

type TTileProps = {
  children?: any;
  title?: any;
  footer?: any;
  clickable?: boolean;
  active?: boolean;
  disabled?: boolean;

  onClick?: Function;
};

const tileCssMap: any = {
  clickable: { true: "q-clickable" },
  active: {
    true: "c-tile--active"
  },
  disabled: { true: "q-disabled c-tile--disabled" },
};
const tileDefaults = {};

export function Tile(props: TTileProps) {
  const css = createClassName(tileCssMap, props, "c-tile", tileDefaults);
  const { children, title, footer, disabled=false, onClick } = props;

  function onClickLocal(event:any) {
    if (onClick && !disabled)
      onClick(event)
  }

  return (
    <div className={css} onClick={onClickLocal}>
      <div className="c-tile__title">{title}</div>
      <div className="c-tile__body">{children}</div>
      <div className="c-tile__footer">{footer}</div>
    </div>
  );
}
