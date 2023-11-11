/** @format */

import { forwardRef } from "react";
import { createClassName } from "../../utils/css";
import { SvgIcon } from "../../utils/svgicon";
import { Icon } from "../Icon";
import { TBaseProps } from "@quarbon/types";
import "./QField.scss";

//
//  +--------------------------------------------------------------------------------+
//  |             +----------------------------------------------------+             |
//  | +--------+  |  +----------------------------------------------+  |  +-------+  |
//  | | before |  |  |  +---------+  +---------------+  +--------+  |  |  | after |  |
//  | |        |  |  |  | prepend |  | control       |  | append |  |  |  |       |  |
//  | |        |  |  |  +---------+  +---------------+  +--------+  |  |  |       |  |
//  | +--------+  |  +----------------------------------------------+  |  +-------+  |
//  |             |  +----------------------------------------------+  |             |
//  |             |  | +------------------------------------------+ |  |             |
//  |             |  | | error                                    | |  |             |
//  |             |  | +------------------------------------------+ |  |             |
//  |             |  | +------------------------------------------+ |  |             |
//  |             |  | | helper text                              | |  |             |
//  |             |  | +------------------------------------------+ |  |             |
//  |             |  +----------------------------------------------+  |             |
//  |             +----------------------------------------------------+             |
//  +--------------------------------------------------------------------------------+
//

SvgIcon.set("q-field-error", {
  content:
    '<svg><path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>',
  viewBox: "0 0 24 24",
});

type TQFieldProps = TBaseProps & {
  after?: any;
  append?: any;
  before?: any;
  borderless?: boolean;
  bgColor?: string;
  clearable?: boolean;
  error?: string;
  focus?: boolean;
  filled?: boolean;
  helperText?: string;
  label?: any;
  loading?: boolean;
  outlined?: boolean;
  prepend?: any;
  skeleton?: boolean;
};

const cssMap: any = {
  dark: { true: "q-field--dark" },
  borderless: { true: "q-field--borderless" },
  error: (value: any) => (value ? "q-field--error" : ""),
  filled: { true: "q-field--filled" },
  focus: { true: "q-field--focus" },
  outlined: { true: "q-field--outlined" },
  skeleton: { true: "q-skeleton" },
};

export const QField = forwardRef<HTMLLabelElement, TQFieldProps>(
  (props, ref) => {
    const {
      after,
      append,
      before,
      children,
      error,
      helperText,
      label,
      prepend,
      style,
    } = props;
    const cls = createClassName(cssMap, props, "q-field");

    return (
      <label ref={ref} className={cls} style={style}>
        {label && <div className="q-field__label">{label}</div>}

        <div className="q-field__wrapper row">
          {before !== undefined ? (
            <div className="q-field__before">{before}</div>
          ) : null}

          <div className="col">
            <div className="q-field__inner row">
              {prepend && <div className="q-field__prepend">{prepend}</div>}

              <div className="q-field__control row">{children}</div>

              {(append || error) && (
                <div className="q-field__append">
                  {error && (
                    <Icon
                      name="q-field-error"
                      size="18px"
                      className="q-field__icon-error"
                    />
                  )}
                  {append}
                </div>
              )}
            </div>

            {error ? (
              <div className="q-field__helper-text q-field__helper-text--error">
                {error}
              </div>
            ) : (
              helperText && (
                <div className="q-field__helper-text">{helperText}</div>
              )
            )}
          </div>

          {after ? <div className="q-field__after">{after}</div> : null}
        </div>
      </label>
    );
  }
);
QField.displayName = "Field";
