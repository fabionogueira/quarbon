import {forwardRef, useEffect, useRef, useState} from "react";
import { TBaseProps } from "@quarbon/types";
import { createClassName } from "@quarbon/utils/css";
import { Adapter, TConfig } from "@quarbon/adapters/highcharts";
import { Theme } from "@quarbon/utils/theme";
// import { Cube } from "@cube/Cube.ts";
import "./QChart.scss";

type TColorSchema =
  | "categorical"
  | "trendBlue"
  | "trendPurple"
  | "trendCyan"
  | "trendTeal"
  | "temperature"
  | "sales"
  | "alert";

type TQChartProps = TBaseProps & {
  colors?: TColorSchema;
  title?: string;
  subtitle?: string;
  caption?: string;
  // cube: Cube;
  config?: TConfig;
  options?: any;
  definition?: any;
};

const QChartCssMap = {
  disabled: { true: "q-disabled" },
};
const colorPalettes = {
  categorical: [
    "#6929c4",
    "#1192e8",
    "#005d5d",
    "#9f1853",
    "#fa4d56",
    "#570408",
    "#198038",
    "#002d9c",
    "#ee538b",
    "#b28600",
    "#009d9a",
    "#012749",
    "#8a3800",
    "#a56eff",
  ],
  categorical_dark: [
    "#8a3ffc",
    "#33b1ff",
    "#007d79",
    "#ff7eb6",
    "#fa4d56",
    "#fff1f1",
    "#6fdc8c",
    "#4589ff",
    "#d12771",
    "#d2a106",
    "#08bdba",
    "#bae6ff",
    "#ba4e00",
    "#d4bbff",
  ],

  trendBlue: [
    "#edf5ff",
    "#d0e2ff",
    "#a6c8ff",
    "#78a9ff",
    "#4589ff",
    "#0f62fe",
    "#0043ce",
    "#002d9c",
    "#001d6c",
    "#001141",
  ],
  trendPurple: [
    "#f6f2ff",
    "#e8daff",
    "#d4bbff",
    "#be95ff",
    "#a56eff",
    "#8a3ffc",
    "#6929c4",
    "#491d8b",
    "#31135e",
    "#1c0f30",
  ],
  trendCyan: [
    "#e5f6ff",
    "#bae6ff",
    "#82cfff",
    "#33b1ff",
    "#1192e8",
    "#0072c3",
    "#00539a",
    "#003a6d",
    "#012749",
    "#1c0f30",
  ],
  trendTeal: [
    "#d9fbfb",
    "#9ef0f0",
    "#3ddbd9",
    "#08bdba",
    "#009d9a",
    "#007d79",
    "#005d5d",
    "#004144",
    "#022b30",
    "#081a1c",
  ],

  temperature: [
    "#750e13",
    "#a2191f",
    "#da1e28",
    "#fa4d56",
    "#ff8389",
    "#ffb3b8",
    "#ffd7d9",
    "#fff1f1",
    "#e5f6ff",
    "#bae6ff",
    "#82cfff",
    "#33b1ff",
    "#1192e8",
    "#0072c3",
    "#00539a",
    "#003a6d",
  ],
  sales: [
    "#491d8b",
    "#6929c4",
    "#8a3ffc",
    "#a56eff",
    "#be95ff",
    "#d4bbff",
    "#e8daff",
    "#f6f2ff",
    "#d9fbfb",
    "#9ef0f0",
    "#3ddbd9",
    "#08bdba",
    "#009d9a",
    "#007d79",
    "#005d5d",
    "#004144",
  ],

  alert: ["#da1e28", "#ff832b", "#f1c21b", "#198038"],
  alert_dark: ["#fa4d56", "#ff832b", "#f1c21b", "#24a148"],
};

Adapter.initialize();
Adapter.setDefaultColors(colorPalettes.categorical);
Theme.addEventListener(() => {
  Adapter.setDark(Theme.isDark());
});

export const QChart = forwardRef<HTMLDivElement, TQChartProps>((props, ref) => {
  const { style, definition, config, options = {} } = props;
  const css = createClassName(QChartCssMap, props, "q-chart");
  const elRef = useRef(null);
  const [configStr, setConfigStr] = useState(JSON.stringify(config));
  const [optionsStr, setOptionsStr] = useState(JSON.stringify(options));

  ref = ref ?? elRef;

  useEffect(() => {
    setConfigStr(JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    setOptionsStr(JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    const element = (ref as any).current;
    Adapter.render(element, definition);
  }, [configStr, optionsStr, ref, definition]);

  return <div className={css} style={style} ref={ref} />;
});

QChart.displayName = "QChart";
