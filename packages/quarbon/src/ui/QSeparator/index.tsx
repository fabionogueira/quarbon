/** @format */

import { CSSProperties } from "react";
import "./QSeparator.scss";

type TQSpaceProps = {
  style?: CSSProperties;
  className?: string;
  inset?: boolean;
};

export function QSeparator(props: TQSpaceProps) {
  const { className = "", inset, style } = props;

  return (
    <div data-inset={inset} style={style} className={`q-separator${inset ? " q-separator--inset" : ""} ${className}`} />
  );
}
