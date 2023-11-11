import { TDefinition } from "@cube/Cube";

export default function highCharPluginColumn(
  definition: TDefinition,
  map: any,
  options: any
) {
  let colDim = definition.cols[0];
  let rowDim = definition.rows[0];
// console.log(definition)
  if (!colDim) {
    colDim = rowDim;
    rowDim = definition.cols[0];
  }

  const rowCategories = map.categories[rowDim];
  const colCategories = map.categories[colDim];
  const measure = definition.measures[0];
  const xAxis = {
    tickWidth: 1,
    categories: map.categories[colDim],
  };
  const measures = map.measure;
  const series = rowCategories
    ? rowCategories.map((name: string) => {
      const data: number[] = [];

      xAxis.categories.forEach((xCat: string) => {
        const k = `.${measure}.${xCat}.${name}`;
        const v = measures[k];
        data.push(v.value);
      });

      return {
        name,
        data,
      };
    })
    : [
      {
        name: "Serie 1",
        data: colCategories.map((yCat: string) => {
          const k = `.${measure}.${yCat}`;
          const v = measures[k];
          return v.value;
        }),
      },
    ];

  return {
    chart: {
      type: 'column'
    },
    ...options,
    xAxis,
    series,
  };
}
