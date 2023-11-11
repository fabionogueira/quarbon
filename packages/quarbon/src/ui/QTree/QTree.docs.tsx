import { useState } from 'react'
import { Meta, Page, Story, Header, Props } from '@docs/components'
import { QResizer, QTree, TNode } from '@quarbon/ui'

Meta.set({
  name: 'Components/Tree',
  custom() {
    return (
      <Page component={QTree} className="docs-tree">
        <Header />
        <Props />
        {/* <Playground attributes={propsDef} component={QTree} /> */}
        <Story id="QTreeAccordionModeStory" label="Accordion mode" source={QTreeAccordionModeStory} />
        <Story id="QTreeTreeModeStory" label="Tree mode" source={QTreeTreeModeStory} />
      </Page>
    )
  },
})

//@doc:story QTreeAccordionModeStory, QTreeTreeModeStory
const nodes: TNode[] = [
  {
    id: '1',
    label: 'LO Menu 1',
  },
  {
    id: '2',
    label: 'LO Menu 2',
    children: [
      { id: '1.1', label: 'LO Menu tem 01' },
      { id: '1.2', label: 'LO Menu tem 02' },
      {
        id: '1.3',
        label: 'LO Menu tem 03',
        children: [
          { id: '1.3.1', label: 'LO SubMenu tem 01' },
          { id: '1.3.2', label: 'LO SubMenu tem 02' },
          { id: '1.3.3', label: 'LO SubMenu tem 03' },
          { id: '1.3.4', label: 'LO SubMenu tem 04' },
        ],
      },
      { id: '1.4', label: 'LO Menu tem 04' },
    ],
  },
  {
    id: '3',
    label: 'LO Menu 3',
  },
]
// @doc:story:end

/**
 * @doc:story
 */
function QTreeAccordionModeStory() {
  const [selected, setSelected] = useState('1.3.3')

  function onChange(node: any) {
    setSelected(node.id)
  }

  return (
    <div className="row">
      <QTree accordion={true} nodes={nodes} selected={selected} onChange={onChange} />
      <QResizer />
      <h6>selected={selected}</h6>
    </div>
  )
}

/**
 * @doc:story
 */
function QTreeTreeModeStory() {
  const [selected, setSelected] = useState('1.3.3')

  function onChange(node: any) {
    setSelected(node.id)
  }

  return (
    <div className="row">
      <QTree accordion={false} nodes={nodes} selected={selected} onChange={onChange} />
      <QResizer />
      <h6>selected={selected}</h6>
    </div>
  )
}
