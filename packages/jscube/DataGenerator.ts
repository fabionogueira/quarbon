
type TDimensionObject = {
  field: string,
  value: string[]
}

type TGeneratorOptions = {
  dimensions: TDimensionObject[],
  measures: string[]
}

export function DataGenerator(schema: TGeneratorOptions) {
  const data:any[] = [];
  const {dimensions, measures} = schema;

  combineDimensions(0, {});

  function combineDimensions(index:number, rr:any) {
    const r = dimensions[index];

    if (!r) {
      combineMeasures(rr);
      return;
    }

    r.value.forEach(v => {
      rr[r.field] = v;
      combineDimensions(index + 1, rr);
      rr = {...rr};
    })
  }

  function combineMeasures(rr:any) {
    measures.forEach(key => {
      const a = String(Math.random() * 100).split(".");
      const i = a[0];
      const r = (a[1] || "").substring(0, 2).padEnd(2, "0");

      rr[key] = Number(`${i}.${r}`);
    })
    data.push(rr);
  }

  return data;
}
