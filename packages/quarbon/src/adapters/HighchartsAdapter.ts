import * as Highcharts from 'highcharts'
import {IChartAdapter} from "@quarbon/adapters/IChartAdapter";

const themeValues = {
  // colors: [],
  chart: {
    backgroundColor: "var(--q-layer)",
    // borderWidth: 2,
    // plotBackgroundColor: 'rgba(255, 255, 255, .9)',
    // plotShadow: true,
    // plotBorderWidth: 1
  },
  title: {
    style: {
      color: 'currentColor',
      // font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
    }
  },
  subtitle: {
    style: {
      color: 'var(--q-text-02)',
      // font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
    }
  },
  xAxis: {
    // gridLineWidth: 1,
    lineColor: 'var(--q-border-subtle)',
    // tickColor: 'red',
    labels: {
      style: {
        color: 'var(--q-text-02)',
        // font: '11px Trebuchet MS, Verdana, sans-serif'
      }
    },
    title: {
      style: {
        color: 'var(--q-text-02)',
        // fontWeight: 'bold',
        // fontSize: '12px',
        // fontFamily: 'Trebuchet MS, Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    // alternateGridColor: null,
    // minorTickInterval: 'auto',
    lineColor: 'var(--q-border-subtle)',
    // lineWidth: 1,
    // tickWidth: 1,
    // tickColor: '#fff',
    labels: {
      style: {
        color: 'var(--q-text-02)',
        // font: '11px Trebuchet MS, Verdana, sans-serif'
      }
    },
    title: {
      style: {
        color: 'currentColor',
        // fontWeight: 'bold',
        // fontSize: '12px',
        // fontFamily: 'Trebuchet MS, Verdana, sans-serif'
      }
    }
  },
  legend: {
    itemStyle: {
      // font: '9pt Trebuchet MS, Verdana, sans-serif',
      color: 'var(--q-text-02)'

    },
    itemHoverStyle: {
      color: 'var(--q-border-subtle)'
    },
    itemHiddenStyle: {
      // color: 'red'
    }
  },
  // credits: {
  //   style: {
  //     right: '10px'
  //   }
  // },
  // labels: {
  //   style: {
  //     color: '#99b'
  //   }
  // }
};
let customOptions = {};

class HighchartsAdapterClass implements IChartAdapter {
  initialize() {
    customOptions = {
      ...themeValues
    };
    Highcharts.setOptions(customOptions);
  }

  setDark(_:boolean) : IChartAdapter {
    return (this as unknown as IChartAdapter);
  }

  setDefaultColors(colors:string[]) {
    Highcharts.setOptions({
      ...customOptions,
      colors: colors as any,
    });

    return (this as unknown as IChartAdapter);
  }

  render(element: HTMLElement, definition: any) {
    definition.accessibility = { enabled: false }
    Highcharts.chart(element as any, definition);
  }
}

export const HighchartsAdapter = new HighchartsAdapterClass();
