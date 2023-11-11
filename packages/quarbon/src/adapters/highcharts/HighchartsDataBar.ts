import { TDefinition } from "@cube/Cube";

export default function highCharPluginBars(
  definition: TDefinition,
  map: any,
  options: any
) {
  let colDim = definition.cols[0];
  let rowDim = definition.rows[0];

  if (!colDim) {
    colDim = rowDim;
    rowDim = definition.cols[0];
  }

  const rowCategories = map.categories[rowDim];
  const colCategories = map.categories[colDim];
  const measure = definition.measures[0];
  const xAxis = {
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
      type: 'bar'
    },
    title:
      typeof options.title == "string"
        ? {
          text: options.title,
          align: "left",
        }
        : options.title,
    subtitle:
      typeof options.subtitle == "string"
        ? {
          text: options.subtitle,
          align: "left",
        }
        : options.title,
    caption:
      typeof options.caption == "string"
        ? {
          text: options.caption,
          align: "left",
        }
        : options.title,
    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },
    // legend: {
    //   layout: "vertical",
    //   align: "right",
    //   verticalAlign: "middle",
    // },
    // responsive: {
    //   rules: [
    //     {
    //       condition: {
    //         maxWidth: 500,
    //       },
    //       chartOptions: {
    //         legend: {
    //           layout: "horizontal",
    //           align: "center",
    //           verticalAlign: "bottom",
    //         },
    //       },
    //     },
    //   ],
    // },
    xAxis,
    series,
  };
}
