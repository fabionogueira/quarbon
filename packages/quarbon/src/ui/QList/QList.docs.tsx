import { useState } from 'react'
import { QButton, QCheckbox, QList, QListItem, QListLabel, QListSection, QMenu, QSeparator } from '@quarbon/ui'
import { Dialog } from '@quarbon/plugins/Dialog'
import {Header, Meta, Page, Props, Story} from '@docs/components'
import {
  CbAccount,
  CbAirplayFilled,
  CbMessageQueue,
  CbOverflowMenuVertical,
  CbSendFilled,
  CbSettings,
  CbStarFilled,
  CbTrashCan,
} from '@quarbon/icons/cb'
import { lorem1 } from '@docs/lorem'

Meta.set({
  name: 'Components/List',
  custom() {
    return (
      <Page component={QList} className="docs-qlist">
        <Header/>
        <Props title="QList Props" />
        <Props title="QListItem Props" component={QListItem} />
        <Props title="QListSection Props" component={QListSection} />
        <Props title="QListLabel Props" component={QListLabel} />
        <Story id="QListBasicStory" label="Basic" source={QListBasicStory} />
        <Story id="QListWithIconStory" label="With icon" source={QListWithIconStory} />
        <Story id="QListWithCheckboxStory" label="With checkbox" source={QListWithCheckboxStory} />
        <Story id="QListItemWithMenuStory" label="Item with menu" source={QListItemWithMenuStory} />
        <Story id="QListMenuExampleStory" label="Menu example" source={QListMenuExampleStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QListBasicStory() {
  return (
    <QList bordered separator style={{width:"100%"}}>
      <QListItem clickable>
        <QListSection>Single line item</QListSection>
      </QListItem>
      <QListItem clickable>
        <QListSection>
          <QListLabel>Item with caption</QListLabel>
          <QListLabel caption>Caption</QListLabel>
        </QListSection>
      </QListItem>
      <QListItem clickable>
        <QListSection>
          <QListLabel overline>OVERLINE</QListLabel>
          <QListLabel caption>Item with overline</QListLabel>
        </QListSection>
      </QListItem>
    </QList>
  )
}

/**
 * @doc:story
 */
function QListWithIconStory() {
  return (
    <QList bordered separator>
      <QListItem clickable className="text-primary">
        <QListSection avatar>
          <CbAccount size={24} />
        </QListSection>
        <QListSection>Icon as avatar</QListSection>
      </QListItem>
      <QListItem clickable>
        <QListSection avatar>
          <CbAirplayFilled size={24} />
        </QListSection>

        <QListSection>
          <QListLabel>Single line item</QListLabel>
          <QListLabel caption lines="2">
            Secondary line text. {lorem1}
          </QListLabel>
        </QListSection>

        <QListSection side top>
          <QListLabel caption>5 min ago</QListLabel>
          <CbStarFilled color="yellow" />
        </QListSection>
      </QListItem>
    </QList>
  )
}

/**
 * @doc:story
 */
function QListWithCheckboxStory() {
  const [notifications, setNotifications] = useState(false)
  const [sound, setSound] = useState(false)

  return (
    <QList bordered separator>
      <QListLabel header>General</QListLabel>
      <QListItem clickable onClick={() => setNotifications(!notifications)}>
        <QListSection avatar style={{ marginRight: 20 }}>
          <QCheckbox checked={notifications} />
        </QListSection>
        <QListSection>
          <QListLabel>Notifications</QListLabel>
          <QListLabel caption lines="2">
            Notify me about updates to apps or games that I downloaded
          </QListLabel>
        </QListSection>
      </QListItem>
      <QListItem clickable onClick={() => setSound(!sound)}>
        <QListSection avatar style={{ marginRight: 20 }}>
          <QCheckbox checked={sound} />
        </QListSection>
        <QListSection>
          <QListLabel>Sound</QListLabel>
          <QListLabel caption lines="2">
            Auto-update apps at anytime. Data charges may apply
          </QListLabel>
        </QListSection>
      </QListItem>
    </QList>
  )
}

/**
 * @doc:story
 */
function QListItemWithMenuStory() {
  return (
    <QList bordered separator>
      <QListLabel header>General</QListLabel>
      <QListItem clickable onClick={() => Dialog.notifyWarning('Item clicked')}>
        <QListSection>
          <QListLabel>Sound</QListLabel>
          <QListLabel caption lines="2">
            Auto-update apps at anytime. Data charges may apply
          </QListLabel>
        </QListSection>
        <QListSection side>
          <QButton flat style={{ zIndex: 1 }}>
            <CbOverflowMenuVertical />
            <QMenu>
              <QList>
                <QListItem clickable>
                  <QListSection>
                    <QListLabel>Menu Item 01</QListLabel>
                  </QListSection>
                </QListItem>
                <QListItem clickable>
                  <QListSection>
                    <QListLabel>Menu Item 02</QListLabel>
                  </QListSection>
                </QListItem>
                <QListItem clickable>
                  <QListSection>
                    <QListLabel>Menu Item 03</QListLabel>
                  </QListSection>
                </QListItem>
              </QList>
            </QMenu>
          </QButton>
        </QListSection>
      </QListItem>
    </QList>
  )
}

/**
 * @doc:story
 */
function QListMenuExampleStory() {
  const [active, setActive] = useState(0)

  return (
    <QList bordered>
      <QListItem clickable active={active == 0} onClick={() => setActive(0)}>
        <QListSection avatar>
          <CbMessageQueue size={24} />
        </QListSection>
        <QListSection>
          <QListLabel>Inbox</QListLabel>
        </QListSection>
      </QListItem>
      <QListItem clickable active={active == 1} onClick={() => setActive(1)}>
        <QListSection avatar>
          <CbSendFilled size={24} />
        </QListSection>
        <QListSection>
          <QListLabel>Outbox</QListLabel>
        </QListSection>
      </QListItem>
      <QListItem clickable active={active == 2} onClick={() => setActive(2)}>
        <QListSection avatar>
          <CbTrashCan size={24} />
        </QListSection>
        <QListSection>
          <QListLabel>Trash</QListLabel>
        </QListSection>
      </QListItem>
      <QSeparator />
      <QListItem clickable active={active == 3} onClick={() => setActive(3)}>
        <QListSection avatar>
          <CbSettings size={24} />
        </QListSection>
        <QListSection>
          <QListLabel>Settings</QListLabel>
        </QListSection>
      </QListItem>
    </QList>
  )
}
