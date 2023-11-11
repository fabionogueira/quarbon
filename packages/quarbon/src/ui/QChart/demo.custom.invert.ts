const values = generateValues();

export default {
  chart: {
    zoomType: 'xy', // permite selecionar parte do gráfico para zoom
  },
  title: {
    text: 'Submercado, 2023',
    align: 'left',
  },
  subtitle: {
  },
  xAxis: [
    {
      aggr: values.days,
      // tickInterval: 10, // intervalo entre os dias
      crosshair: true,
    },
  ],
  yAxis: [
    // Primary yAxis
    {
      max: values.max,
      labels: {
        format: '{value}°C',
        // style: {
        //     color: Highcharts.getOptions().colors[1]
        // }
      },
      title: {
        text: 'Temperatura',
        // style: {
        //     color: Highcharts.getOptions().colors[1]
        // }
      }
    },

    // Secondary yAxis
    {
      max: values.max,
      title: {
        text: 'Precipitação',
        // style: {
        //     color: Highcharts.getOptions().colors[0]
        // }
      },
      labels: {
        format: '{value} mm',
        // style: {
        //     color: Highcharts.getOptions().colors[0]
        // }
      },

      opposite: true, // coloca a escala do lado oposto (direita)
      reversed: true, // inverte a posição das barras, fica de cima pra baixo
    },
  ],
  tooltip: {
    shared: true, // mostra o tooltip com dados de ambas as séries
  },
  series: [
    {
      name: 'Precipitação',
      type: 'column',
      yAxis: 1,
      data: values.precipitation,
      tooltip: {
        valueSuffix: ' mm',
      }
    },
    {
      name: 'Temperatura',
      type: 'area', // 'line', // 'spline',
      data: values.temperature,
      tooltip: {
        valueSuffix: '°C',
      },
    },
  ],
  // colors: ['#da1e28', '#ff832b','#f1c21b','#198038',], // custom colors for this chart
  plotOptions: {
    series: {
      // compare: 'percent'
    }
  },
}

function generateValues() {
  const max = 100;
  const maxDays = 80;
  const obj = {
    precipitation: [] as number[],
    temperature: [] as number[],
    max,
    days: [] as string[]
  };
  const date = new window.Date();

  for (let i=0; i<maxDays; i++) {
    const v1 = Math.floor(Math.random() * (max - 30));
    let v2 = Math.floor(Math.random() * (100 - v1 - 15));
    if (v2 < 0) v2 = 1;

    obj.precipitation.push(v1);
    obj.temperature.push(v2);
    obj.days.push(`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth()).padStart(2, '0')}`);
    date.setDate(date.getDate() + 1);
  }

  return obj;
}