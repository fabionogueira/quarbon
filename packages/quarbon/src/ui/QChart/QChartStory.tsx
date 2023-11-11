const colorSchemas = [
  'categorical',
  'trendBlue',
  'trendPurple',
  'trendCyan',
  'trendTeal',
  'temperature',
  'sales',
  'alert',
];

export const QChartStory = (props: any) => {
  /*

  colors?: TColorSchema
  title?: string
  subtitle?: string
  caption?: string
  legend?: any
  series?: TSerie[]
  config?: TConfig
   */

  return (
    <div>
      <div>{props.title}</div>
      <label>
        color:
        <select>
          {colorSchemas.map(n => {
            return <option key={n} value={n}>{n}</option>
          })}
        </select>
      </label>
    </div>
  )
}
