import { Header, Meta, Page, Props, Story } from '@docs/components'

// @doc:story QTableBasicStory
import { QTable, TTableCol } from '@quarbon/ui'
// @doc:story:end

Meta.set({
  name: 'Components/Table',
  custom() {
    return (
      <Page component={QTable} className="docs-qtable">
        <Header />
        <Props />
        {/*<Playground />*/}
        <Story id="QTableBasicStory" label="Basic" source={QTableBasicStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QTableBasicStory() {
  const columns: TTableCol[] = [{ field: 'name' }, { field: 'protocol' }, { field: 'port' }]
  const rows: Record<string, any>[] = [
    {
      name: 'Load Balancer 11',
      protocol: 'HTTP',
      port: '80',
    },
    {
      name: 'Load Balancer 4',
      protocol: 'HTTP',
      port: '81',
    },
  ]

  return (
    <QTable
      clickable
      title="Table title"
      helperText="This is some helpful text"
      columns={columns}
      rows={rows}
      toolbar="TOOLBAR"
      footer="FOOTER"
    />
  )
}
