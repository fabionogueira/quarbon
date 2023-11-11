
type TDataSource = Array<Record<string, number | string>>;

export type TDefinition = {
  cols: string[];
  rows: string[];
  measures: string[];
};

export class Cube {
  private _showMeasureHeader = false;
  private _matrix: Array<Array<any>> = [];

  constructor(readonly _dataSource: TDataSource) {}

  transform(definition: TDefinition) {
    const map = this._initialize(definition, this._dataSource);
    const showMeasureHeader = this._showMeasureHeader = definition.measures.length > 1;

    let colsCount = definition.measures.length;
    definition.cols.forEach(dim => colsCount *= map.categories[dim].length);
    let rowsCount = 1;
    definition.rows.forEach(dim => rowsCount *= map.categories[dim].length);

    let rowsLevels = definition.rows.length;
    let colsLevels = definition.cols.length;
    let matrix = this._matrix = Array(colsLevels + rowsCount + 1).fill(null);
    let rowOffset = 0;

    matrix.forEach((u, index) => {
      matrix[index] = Array(rowsLevels + colsCount).fill(null);
    })

    matrix[0][0]  = {
      colsSpan: rowsLevels,
      rowSpan: colsLevels + (definition.measures.length > 1 ? 1 : 0),
      type: "corner"
    };

    if (definition.cols.length == 0 && definition.measures.length < 2) {
      matrix[0].hide = true;
      rowOffset = 1;
    }

    processColsCategories();
    processRowsCategories();

    function processColsCategories() {
      processCategoriesHeaders(0, rowsLevels, 0);

      // return children count
      function processCategoriesHeaders(level: number, colIndex:number, rowIndex:number, parentKey="") {
        const dimension = definition.cols[level];
        const categories = map.categories[dimension];
        let childrenCount = 0;

        if (!categories) {
          // TODO provavelmente é aqui o problema de quebrar quando não tem dimensão nas colunas
          return processMeasuresHeaders(level + 1, colIndex, parentKey);
        }

        categories.forEach((category: string) => {
          let key = parentKey + `.${category}`;

          if (level < colsLevels - 1) {
            childrenCount = processCategoriesHeaders(level + 1, colIndex, rowIndex + 1, key);
          } else { //if (definition.measures.length > 1) {
            childrenCount = processMeasuresHeaders(level + 1, colIndex, key);
          }

          matrix[rowIndex][colIndex]  = {
            key: key,
            dimension: dimension,
            category: category,
            colsSpan: childrenCount,
            type: "col-header",
            level
          };

          colIndex += childrenCount;
        });

        return childrenCount * categories.length;
      }
      function processMeasuresHeaders(rowIndex:number, colIndex:number, parentKey:string) {
        const measures = definition.measures; // [media1, media2]

        matrix[rowIndex].hide = !showMeasureHeader;

        // measure headers (name only)
        measures.forEach((measure: string) => {
          let key = `.${measure}${parentKey}`;
          matrix[rowIndex][colIndex]  = {
            key: key,
            measure,
            type: "measure-header"
          }
          colIndex++;
        });

        return measures.length;
      }
    }

    function processRowsCategories() {
      processCategoriesDo(0, 0, colsLevels + 1);

      function processCategoriesDo(level: number, colIndex:number, rowIndex:number, parentKey="") {
        const dimension = definition.rows[level];
        const categories = map.categories[dimension];
        let childrenCount = 0;

        if (!categories) {
          processMeasures(rowIndex, colIndex);
          return 0;
        }

        categories.forEach((category: string) => {
          let key = parentKey + `.${category}`;
          let obj = matrix[rowIndex][colIndex] = {
            key: key,
            dimension: dimension,
            category: category,
            type: "row-header",
            rowSpan: 1,
            level
          }

          if (level < rowsLevels - 1) {
            childrenCount = processCategoriesDo(level + 1, colIndex + 1, rowIndex, key);
          } else { //if (definition.measures.length > 1) {
            processMeasures(rowIndex, colIndex + 1);
            childrenCount = 1;
          }

          obj.rowSpan = childrenCount;

          rowIndex += childrenCount;
        });


        return childrenCount + categories.length - 1;
      }
      function processMeasures(rowIndex:number, colIndex:number) {
        const activeRowsArr = matrix[rowIndex];

        if (rowOffset > 0) {
          for (let i = colIndex; i < activeRowsArr.length; i++) {
            let r = activeRowsArr[colIndex - 1];
            let k = '.' + definition.measures[0] + (r?.key ?? "");
            let measureValue = map.measure[k];

            activeRowsArr[i] = {
              key: k,
              value: measureValue?.value,
              type: "measure"
            }
          }
          return
        }

        for (let i = colIndex; i < activeRowsArr.length; i++) {
          let c = matrix[colsLevels][i];
          let r = activeRowsArr[colIndex - 1];
          let k = c?.key + (r?.key ?? "");
          let measureValue = map.measure[k];

          if (measureValue?.value == null) {
            //debugger
          }

          activeRowsArr[i] = {
            key: k,
            value: measureValue?.value,
            type: "measure"
          }
        }
      }
    }

    return {
      showMeasureHeader: this._showMeasureHeader,
      matrix: this._matrix
    };
  }

  private _initialize(definition: TDefinition, dataSource:TDataSource) {
    const dimensions = [...definition.cols, ...definition.rows];
    const exists: any = {};
    const map = {
      categories: {} as any,
      measure: {} as any
    };

    dataSource.forEach((row: any) => {
      definition.measures.forEach((measure) => {
        let key = `.${measure}.`;
        let sep = "";

        dimensions.forEach((dimension) => {
          const category: string = row[dimension];
          const value: number = row[measure] || 0;

          if (!exists[category]) {
            map.categories[dimension] = map.categories[dimension] || [];
            map.categories[dimension].push(category);
            exists[category] = true;
          }

          key += sep + category;
          sep = ".";

          let cell: Record<string, number> = map.measure[key];

          if (!cell) {
            map.measure[key] = cell = { value: 0 };
          }

          // deve ser += para fazer as agregações
          cell.value = Number(value.toFixed(2));
        });
      });
    });

    return map;
  }
}
