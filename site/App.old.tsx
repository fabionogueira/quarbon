import { useState } from "react";
import { Meta, Page, Props, Story, Header } from "@docs/components";
import { Playground } from "@docs/components/Playground";
// @ts-ignore
import config from "./config.json";
import "../packages/doctools/dynamics/imports";
import "./App.scss";
import "./theme.scss";

//import {REFS} from "@quarbon/.docs/Doc"

import {
  QButton,
  QResizer,
  QSelect,
  QSelectItem,
  QToolbar,
  QToolbarTitle,
  QTree,
} from "@quarbon/ui";
import { Theme, TThemeName } from "@quarbon/utils/theme";
import { CbMenu, CbOverflowMenuVertical } from "@quarbon/icons/cb";

let onhashchangeFn: any = null;
window.onhashchange = (evt) => {
  onhashchangeFn && onhashchangeFn(evt);
};

function App() {
  const [active, setActive] = useState<any>(null);
  const [theme, setTheme] = useState(Theme.get());
  const themes = ["white", "gray10", "gray90", "gray100"];
  const nodes: any = [];
  const all = Meta.get();

  Object.entries(all).forEach(([key, value]) => {
    let node = {
      ...(value as any),
      id: key,
    };

    nodes.push(node);

    if (node.children) {
      node.children.forEach((n: any) => (n.id = n.label));
    }
  });

  onhashchangeFn = () => {
    findActive();
  };

  if (!active) findActive();

  function onThemeChange(value: TThemeName) {
    Theme.set(value);
    setTheme(value);
  }
  function onTreeChange(node: any) {
    setActive(node);
  }
  function findActive() {
    let key = location.hash.split("Page/")[1] || config.index;
    let obj: any;

    nodes.forEach((n1: any) => {
      if (n1.children) {
        n1.children.forEach((n2: any) => {
          if (key == `${n1.label}/${n2.label}`) {
            obj = n2;
          }
        });
      } else {
        if (n1.label == key) {
          obj = n1;
        }
      }
    });

    obj = obj || nodes[0];
    if (obj) setActive(obj);
  }

  function renderPage(story: any) {
    let def = story?.page;
    if (!def) {
      return null;
    }

    const Component = def.custom;
    const key = def.name;

    location.hash = `#Page/${key}`;

    if (Component) {
      return <Component key={key} />;
    }

    return (
      <Page key={key} className={def.className}>
        <Header component={def.component} description={def.description} />

        <Playground
          component={def.component}
          attributes={def.props}
          custom={def.playground}
        />

        <Props definition={def.props} component={def.component} />

        {def.stories?.length > 0 && (
          <>
            <h2>Usage</h2>
            <hr style={{ marginBottom: 40 }} />
          </>
        )}
        {def.stories?.map((story: any) => {
          return (
            <Story
              key={story.id}
              id={story.id}
              label={story.label}
              source={story.body}
            />
          );
        })}
      </Page>
    );
  }

  return (
    <div className="client vbox">
      <div>
        <QToolbar dark>
          <QButton flat icon={<CbMenu />} />
          <QToolbarTitle>
            <span>
              Quarbon <strong>[UI Components]</strong>
            </span>
          </QToolbarTitle>
          <QSelect onChange={onThemeChange} value={theme}>
            {themes.map((theme) => (
              <QSelectItem key={theme} value={theme} label={theme} />
            ))}
          </QSelect>
          <QButton flat icon={<CbOverflowMenuVertical />} />
        </QToolbar>
      </div>

      <div className="client hbox">
        {/* Left Panel */}
        <div className="vbox main__left-panel" style={{ width: 264 }}>
          <QTree nodes={nodes} selected={active?.id} onChange={onTreeChange} />
        </div>

        <QResizer min={256} style={{ marginRight: -6 }} />
        {/* Content */}
        {renderPage(active)}
      </div>
    </div>
  );
}

export default App;
