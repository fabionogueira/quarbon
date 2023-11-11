import { Meta, TProps, Page, Story, Header } from '@docs/components'
import { Playground } from '@docs/components/Playground'
import {QBadge, QPivotTable, QSelect, QToggle} from '@quarbon/ui'
import { Cube, DataGenerator } from '../../../../jscube'
import { useState } from 'react'

const propsDef: TProps = {}
const dataSets = [
  {
    name: 'AirPassengers:Monthly Airline Passenger Numbers 2000-2005',
    value: datasetGenerator(
      {
        dimensions: [{ field: 'AirPassengers', value: ['2000', '2001', '2002', '2003', '2004', '2005'] }],
        measures: ['time'],
      },
      {
        cols: ['AirPassengers'],
        rows: [],
        measures: ['time'],
      },
    ),
  },
  {
    name: 'AirPassengers:Monthly Airline Passenger Numbers 2000-2005 (ROWS)',
    value: datasetGenerator(
      {
        dimensions: [{ field: 'AirPassengers', value: ['2000', '2001', '2002', '2003', '2004', '2005'] }],
        measures: ['time'],
      },
      {
        cols: [],
        rows: ['AirPassengers'],
        measures: ['time'],
      },
    ),
  },
  {
    name: 'HairEyeColor:Hair and Eye Color of Statistics Students',
    value: datasetGenerator(
      {
        dimensions: [
          { field: 'Hair', value: ['Black', 'Blond', 'Brown', 'Red'] },
          { field: 'Eye', value: ['Blue', 'Brown', 'Green', 'Hazel'] },
          { field: 'Sex', value: ['Female', 'Male'] },
        ],
        measures: ['Freq'],
      },
      {
        cols: ['Hair'],
        rows: ['Eye', 'Sex'],
        measures: ['Freq'],
      },
    ),
  },
  {
    name: 'OrchardSprays:Potency of Orchard Sprays',
    value: datasetGenerator(
      {
        dimensions: [
          { field: 'rowpos', value: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'] },
          { field: 'colpos', value: ['1', '2', '3', '4', '5', '6', '7', '8'] },
          {
            field: 'treatment',
            value: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
          },
          { field: 'decrease', value: ['2', '3', '4', '5', '12'] },
        ],
        measures: ['count'],
      },
      {
        cols: ['rowpos', 'colpos'],
        rows: ['treatment', 'decrease'],
        measures: ['count'],
      },
    ),
  },
  {
    name: 'Submercados / SIN',
    value: datasetGenerator(
      {
        dimensions: [
          { field: 'data', value: ['27/jul/2022', '28/jul/2022', '29/jul/2022', '30/jul/2022', '31/jul/2022'] },
          { field: 'modelo', value: ['base', 'LI', 'LE'] },
          { field: 'submercado', value: ['SE/CO', 'S', 'NE', 'N', 'SIN'] },
        ],
        measures: ['MWMed', '%MLT'], //, "Análise", "M1"]
      },
      {
        cols: ['data', 'modelo'],
        rows: ['submercado'],
        measures: ['MWMed', '%MLT'],
      },
    ),
  },
  {
    name: 'REE',
    value: datasetGenerator(
      {
        dimensions: [
          { field: 'data', value: ['27/jul/2022', '28/jul/2022', '29/jul/2022', '30/jul/2022', '31/jul/2022'] },
          { field: 'modelo', value: ['base', 'LI', 'LE'] },
          {
            field: 'submercado',
            value: [
              'Sudeste',
              'Paraná',
              'Paranapanema',
              'Itaipú',
              'Madeira',
              'Tales Pires',
              'Sul',
              'Iguaçu',
              'Nordeste',
              'Norte',
              'Belo Monte',
            ],
          },
        ],
        measures: ['MWMed', '%MLT', 'MLT', 'M-1', 'M-3'], //, "Análise", "M1"]
      },
      {
        cols: ['data', 'modelo'],
        rows: ['submercado'],
        measures: ['MWMed', '%MLT', 'MLT', 'M-1', 'M-3'],
      },
    ),
  },
  {
    name: 'Cenários de ENA semanal',
    group: 'grupo',
    value: datasetGenerator(
      {
        dimensions: [
          { field: 'data', value: ['27/jul/2022', '28/jul/2022', '29/jul/2022', '30/jul/2022', '31/jul/2022'] },
          { field: 'grupo', value: ['Rev0 Jul', 'Rev1 Jul', 'Rev2 Jul', 'Rev3 Jul', 'Rev4 Jul'] },
          { field: 'subsistema', value: ['SE/CO', 'S', 'NE', 'N' ] },
        ],
        measures: ['MWMed', '%MLT', 'MLT', 'M-1', 'M-3'],
      },
      {
        cols: ['data'],
        rows: ['grupo', 'subsistema'],
        measures: ['MWMed', '%MLT', 'MLT', 'M-1', 'M-3'],
      },
    ),
  },
  {
    name: 'Cenários de ENA semanal (período)',
    group: 'grupo',
    value: datasetGenerator(
      {
        dimensions: [
          { field: 'data', value: ['27/Jul-03/Jul', '04/jul-10/Jul', '11/Jul-17/Jul', '18/Jul-24/Jul', 'Julho'] },
          { field: 'grupo', value: ['Rev0 Jul', 'Rev1 Jul', 'Rev2 Jul', 'Rev3 Jul', 'Rev4 Jul'] },
          { field: 'subsistema', value: ['SE/CO', 'S', 'NE', 'N' ] },
        ],
        measures: ['(MWMed)', '%MLT', 'MLT', 'M-1', 'M-3'],
      },
      {
        cols: ['data'],
        rows: ['grupo', 'subsistema'],
        measures: ['(MWMed)', '%MLT', 'MLT', 'M-1', 'M-3'],
      },
    ),
  },
];

Meta.set({
  name: 'Components/PivotTable',
  custom: PivotTableDocs,
})

function PivotTableDocs() {
  return (
    <Page className="docs-toggle">
      <Header component={QPivotTable} description="" />
      <Playground attributes={propsDef} component={QPivotTable} custom={CustomPlayGround} />

      {/* <Story */}
      {/*  id="Pivot.Basic" */}
      {/*  label="Basic" */}
      {/*  source={Basic} */}
      {/* /> */}

      {/* <Story */}
      {/*  id="Pivot.Striped" */}
      {/*  label="Striped" */}
      {/*  source={Striped} */}
      {/* /> */}
    </Page>
  )
}

function CustomPlayGround(options: any) {
  const [dataset, setDataset] = useState(dataSets[0].value)
  const [striped, setStriped] = useState(false);
  const [groupBy, setGroupBy] = useState(null);

  function onChange(item: any) {
    setGroupBy(item.group)
    setDataset(item.value)
  }

  return (
    <>
      <div className="row">
        <QSelect
          options={dataSets}
          optionLabel="name"
          optionValue="value"
          style={{ marginBottom: 20 }}
          onChange={onChange}
        />
        <QToggle
          checked={striped}
          style={{marginTop:10, marginLeft:10}}
          onChange={() => {
            setStriped(!striped);
          }}
        />
      </div>

      <QPivotTable
        style={{ maxHeight: 446 }}
        {...options.props}
        dataset={dataset}
        groupBy={groupBy}
        striped={striped}
        renderColHeader={(cell:any, value:string)=> {
          if (cell.key == ".27/Jul-03/Jul") {
            return <>
              <div className="row">
                <div className="col">
                  {value}
                </div>
                <QBadge buzz={false} floating={false}>9.1/10</QBadge>
              </div>
            </>
          }

          return value;
        }}
      />
    </>
  )
}

function Basic() {
  // @code=Pivot.Basic
  // const cube = new CubeJS({
  //   cols: ['loja', 'tipo'],
  //   rows: ['ano', 'mes'],
  //   measures: ['media1', 'media2'],
  // });
  // const data = DataGenerator({
  //   dimensions: [
  //     {field: "loja", value: ["matriz", "filial"]},
  //     {field: "tipo", value: ["venda", "aluguel"]},
  //     {field: "ano", value: ["2000","2001","2002","2003"]},
  //     {field: "mes", value: ["jan", "fev", "mar"]}
  //   ],
  //   measures: ["media1", "media2"]
  // });
  // const dataset = cube.setDataset(data).getData()

  return <QPivotTable />
  // @code
}

function Striped() {
  // @code=Pivot.Striped
  // const cube = new CubeJS({
  //   cols: ['loja', 'tipo'],
  //   rows: ['ano', 'mes'],
  //   measures: ['media1', 'media2'],
  // })
  // const data = DataGenerator({
  //   dimensions: [
  //     {field: "loja", value: ["matriz", "filial"]},
  //     {field: "tipo", value: ["venda", "aluguel"]},
  //     {field: "ano", value: ["2000","2001","2002","2003"]},
  //     {field: "mes", value: ["jan", "fev", "mar"]}
  //   ],
  //   measures: ["media1", "media2"]
  // });
  // const dataset = cube.setDataset(data).getData()

  return <QPivotTable striped />
  // @code
}

function datasetGenerator(schema: any, definition: any) {
  const dataSource = DataGenerator(schema)
  const cube = new Cube(dataSource)
  return cube.transform(definition)
}
