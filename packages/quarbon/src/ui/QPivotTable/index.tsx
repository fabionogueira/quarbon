import {
  MouseEvent,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import { TBaseProps } from "@quarbon/types";
import { createClassName } from "@quarbon/utils/css";
// import { Cube } from "@cube/Cube.ts";
// import {cubePlugin} from "@quarbon/ui/QPivotTable/cubePlugin.ts";
import "./QPivotTable.scss";

type IDataSet = {
  showMeasureHeader: boolean;
  matrix: Array<Array<Record<string, string | number | null>>>;
};
type IDataSource = Array<Record<string, string | number>>;
type TQPivotTableProps = TBaseProps & {
  cube: Cube;
  config: any;
  enableSorting?: boolean;
  columns?: string[];
  measures?: string[];
  source?: IDataSource | null;
  dataset?: IDataSet | null;
  rows?: any[];
  formatSettings?: any;
  expandAll?: boolean;
  filters?: any[];
  renderMeasure?: (cell: any) => any;
  renderColHeader?: (cell: any) => any;
  renderRowHeader?: (cell: any) => any;
  groupBy?: string;
  striped?: boolean;
};
// type TCell = Record<'sum' | 'avg' | 'max' | 'min' | 'count', number>
const QPivotTableCssMap = {
  disabled: { true: "q-disabled q-pivot-table--disabled" },
  skeleton: { true: "q-skeleton" },
};

export const QPivotTable = forwardRef<HTMLDivElement, TQPivotTableProps>(
  (props, ref) => {
    const {
      config,
      renderMeasure,
      renderRowHeader,
      renderColHeader,
      striped,
      groupBy = ".",
      style,
      source,
      cube
    } = props;
    const css = createClassName(QPivotTableCssMap, props, "q-pivot-table");
    const cssRef = useRef(null);
    const elRef = useRef(null);
    const dataset = cube.transform(config, cubePlugin);
    const matrix = dataset?.matrix;

    let stripedStarted = false;
    let stripedValue = 0;
    let groupStarted = false;

    ref = ref ?? elRef;

    useLayoutEffect(() => {
      const td1: any = (ref as any).current.querySelector(
        ".row-header.level-0"
      );
      const td2: any = (ref as any).current.querySelector(
        ".col-header.level-0"
      );
      const td3: any = (ref as any).current.querySelector(
        ".col-header.level-1"
      );
      const td4: any = (ref as any).current.querySelector(
        ".col-header.level-2"
      );
      const span = cssRef.current as any;

      let css = "";
      let h = 0;

      if (td1) {
        const width = String(Number(td1.offsetWidth));
        css = `.row-header.level-1 { left: ${width}px!important }`;
      }

      if (td2) {
        h = td2.offsetHeight;
        const height = String(h);
        css += `.col-header.level-1 { top: ${height}px!important }`;
        css += `.measure-header { top: 30px!important }`;
      }

      if (td3) {
        css += `.measure-header { top: 60px!important }`;
      } else if (td4) {
        css += `.measure-header { top: 90px!important }`;
      }

      span.innerHTML = `<style>${css}</style>`;
    }, [dataset, source]);

    useEffect(() => {
      // cube.setDataset(Generator('vendas'))
      // setTable(cube.get())
    }, []);

    function onClick(_: MouseEvent<HTMLTableElement>) {
      // if (matrix) {
      //   const target = event.target as HTMLElement;
      //   const td = target?.closest("td");
      //   const x = td?.getAttribute("data-col");
      //   const y = td?.getAttribute("data-row");
      //   const cell = matrix[y as any] ? matrix[y as any][x as any] : null;
      //
      //   // cube.aggr(cell)
      // }
    }

    return (
      <div ref={ref} className={css} style={style}>
        <span ref={cssRef}></span>
        <div className={`q-pivot-table__inner${matrix ? "" : " no-data"}`}>
          {!matrix ? (
            "No Data"
          ) : (
            <table border={1} onClick={onClick}>
              <tbody>
                {matrix.map((cells:any, rowIndex:number) => {
                  let stripedCss = "";
                  let groupCss = "";
                  const cell = cells[0] || {};

                  if (cells.hide) return null;

                  if (groupStarted && cell.dimension == groupBy) {
                    groupCss = "group-end";
                  } else if (cell.dimension == groupBy) {
                    groupStarted = true;
                  }

                  if (striped && stripedStarted) {
                    stripedValue = stripedValue == 0 ? 1 : 0;
                    stripedCss = `striped-${stripedValue}`;
                  }

                  return (
                    <tr className={`${stripedCss} ${groupCss}`} key={rowIndex}>
                      {cells.map((cell: any, colIndex: number) => {
                        if (!cell) return null;

                        const type: string = cell.type;
                        const level: string =
                          cell.level !== undefined
                            ? `level-${cell.level as string}`
                            : "";
                        let cellRenderer = defaultRenderer;

                        if (type == "measure" && renderMeasure) {
                          cellRenderer = renderMeasure;
                        } else if (type == "col-header" && renderColHeader) {
                          cellRenderer = renderColHeader;
                        } else if (type == "row-header") {
                          stripedStarted = true;
                          if (renderRowHeader) {
                            cellRenderer = renderRowHeader;
                          }
                        }

                        return (
                          <td
                            key={colIndex}
                            rowSpan={cell?.rowSpan}
                            colSpan={cell?.colsSpan}
                            className={`q-clickable ${type} ${level}`}
                            data-row={rowIndex}
                            data-col={colIndex}
                            data-category={cell.category}
                            data-dimension={cell.dimension}
                          >
                            <div className="q-pivot-table__cell">
                              {cellRenderer(
                                cell,
                                cell.category || cell.value || cell.measure
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
);

function defaultRenderer(_: any, value: string | number) {
  return value;
}

QPivotTable.displayName = "PivotTable";
