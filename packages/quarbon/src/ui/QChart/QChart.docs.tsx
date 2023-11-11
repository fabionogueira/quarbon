import { Meta, Page, Story, Header } from '@docs/components'
import { QChart } from '@quarbon/ui'
// @doc:story QChartCombinationStory
import dataCombination from './demo.custom.invert'
// @doc:story:end

Meta.set({
  name: 'Components/Chart',
  custom() {
    return (
      <Page component={QChart} className="docs-chart">
        <Header description="Minimal Highcharts wrapper for Quarbon"/>
        <Story id="QChartLinesStory" label="Lines" source={QChartLinesStory} />
        <Story id="QChartCombinationStory" label="Combination" source={QChartCombinationStory} />
      </Page>
    )
  },
})

// @doc:story QChartLinesStory
const dataLines = {
  title: {
    text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
    align: 'left',
  },
  subtitle: {
    text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
    align: 'left',
  },
  yAxis: {
    title: {
      text: 'Number of Employees',
    },
  },
  xAxis: {},
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  plotOptions: {
    series: {
      pointStart: 2010,
    },
  },
  series: [
    {
      name: 'Installation & Developers',
      data: [43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157, 161454, 154610],
    },
    {
      name: 'Manufacturing',
      data: [24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243, 31050],
    },
    {
      name: 'Sales & Distribution',
      data: [11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213, 25663],
    },
    {
      name: 'Operations & Maintenance',
      data: [null, null, null, null, null, null, null, null, 11164, 11218, 10077],
    },
    {
      name: 'Other',
      data: [21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 11164, null, null],
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
}
// @doc:story:end

/**
 * @doc:story
 */
function QChartLinesStory() {
  return <QChart definition={dataLines} />
}

/**
 * @doc:story
 */
function QChartCombinationStory() {
  return <QChart definition={dataCombination} />
}
