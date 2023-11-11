import { Header, Meta, Page, Story } from '@docs/components'
import {
  QButton,
  QCard,
  QCardActions,
  QCardSection,
  QCheckbox,
  QField,
  QList,
  QListItem,
  QListLabel,
  QListSection,
  QRadio,
  QSelect,
  QTable,
  TTableCol,
} from '@quarbon/ui'
import { lorem1 } from '@docs/lorem'
import { useState } from 'react'

Meta.set({
  name: 'Skeleton',
  custom: SkeletonDocs,
})

export function SkeletonDocs() {
  return (
    <Page className="docs-skeleton">
      <Header title="Skeleton" />
      <Story id="SkeletonElementsStory" label="Button" source={SkeletonElementsStory} />
      <Story id="SkeletonCardStory" label="Card" source={SkeletonCardStory} />
      <Story id="SkeletonListStory" label="List" source={SkeletonListStory} />
      <Story id="SkeletonTableStory" label="Table" source={SkeletonTableStory} />
    </Page>
  )
}

/**
 * @doc:story
 */
function SkeletonElementsStory() {
  const [skeleton, setSkeleton] = useState(true)

  return (
    <div>
      <QCheckbox label="Active" checked={skeleton} onChange={() => setSkeleton(!skeleton)} />
      <div className="row q-gap-16">
        <QField outlined label="Button">
          <QButton label="Skeleton" skeleton={skeleton} />
        </QField>
        <QField outlined label="Checkbox">
          <QCheckbox skeleton={skeleton} label="Skeleton" />
        </QField>
        <QField outlined label="Radio">
          <QRadio name="option1" value="1" skeleton={skeleton} label="Skeleton" />
        </QField>
        <QField outlined label="Select">
          <QSelect
            skeleton={skeleton}
            options={[
              { id: 1, label: 'Option 01' },
              { id: 2, label: 'Option 02' },
              { id: 3, label: 'Option 03' },
            ]}
          />
        </QField>
      </div>
    </div>
  )
}

/**
 * @doc:story
 */
function SkeletonCardStory() {
  return (
    <div className="q-gap-16">
      <QCard skeleton>
        <QCardSection>Card Section</QCardSection>
        <QCardSection>{lorem1}</QCardSection>
        <QCardActions>
          <QButton label="Action 1" color="secondary" />
          <QButton label="Action 2" />
        </QCardActions>
      </QCard>
      <QCard>
        <QCardSection skeleton>Card Section</QCardSection>
        <QCardSection>{lorem1}</QCardSection>
        <QCardActions>
          <QButton label="Action 1" color="secondary" />
          <QButton label="Action 2" />
        </QCardActions>
      </QCard>
      <QCard>
        <QCardSection>Card Section</QCardSection>
        <QCardSection skeleton>{lorem1}</QCardSection>
        <QCardActions>
          <QButton label="Action 1" color="secondary" />
          <QButton label="Action 2" />
        </QCardActions>
      </QCard>
    </div>
  )
}

/**
 * @doc:story
 */
function SkeletonListStory() {
  const arr = [1, 2, 3, 4]

  return (
    <QList>
      {arr.map((i) => (
        <QListItem key={i}>
          <QListSection avatar>
            <div className="q-avatar q-skeleton"></div>
          </QListSection>

          <QListSection>
            <QListLabel skeleton>Single line item</QListLabel>
            <QListLabel skeleton caption>
              Secondary line text. Lorem ipsum dolor sit amet
            </QListLabel>
          </QListSection>
        </QListItem>
      ))}
    </QList>
  )
}

/**
 * @doc:story
 */
function SkeletonTableStory() {
  const columns: Array<TTableCol> = [{ field: 'name' }, { field: 'protocol' }, { field: 'port' }]
  const rows: Array<Record<string, any>> = [
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
    {
      name: 'Load Balancer 10',
      protocol: 'HTTPS',
      port: '443',
    },
  ]

  return <QTable skeleton clickable columns={columns} rows={rows} />
}
