import '@quarbon/.docs/definition'

import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Meta } from '@docs/components'
import './App.scss'
import './theme.scss'
import { useState } from 'react'

const tree = Meta.get()
const routes: any[] = []

Object.values(tree).forEach((item1: any) => {
  const path1 = item1.label.toLowerCase()

  if (item1.page) {
    item1.path = path1
    routes.push({
      path: path1,
      page: item1.page,
    })
  }

  item1.children?.forEach((item2: any) => {
    const path = `${path1}/${item2.label.toLowerCase()}`
    item2.path = path
    routes.push({
      path: path,
      page: item2.page,
    })
  })
})

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  function reRender(path: string) {
    navigate(path)
  }

  return (
    <div className="hbox client">
      <div className="vbox scroll docs-left-menu">
        {Object.values(tree).map((item1: any) => {
          return (
            <div key={item1.label}>
              {item1.children ? (
                <p className="docs-left-menu__item docs-left-menu__parent">{item1.label}</p>
              ) : (
                <p
                  className={'docs-left-menu__item' + (location.pathname.substring(1) == item1.path ? ' docs-left-menu__active' : '')}
                  onClick={() => reRender(item1.path)}
                >
                  {item1.label}
                </p>
              )}

              {item1.children?.map((item2: any) => {
                return (
                  <p
                    key={item2.label}
                    style={{ marginLeft: 20 }}
                    className={'docs-left-menu__item' + (location.pathname.substring(1) == item2.path ? ' docs-left-menu__active' : '')}
                    onClick={() => reRender(item2.path)}
                  >
                    {item2.label}
                  </p>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="client vbox">
        <Routes location={location}>
          {routes.map((route) => {
            return <Route key={route.path} path={route.path} element={<PageRender page={route.page} />} />
          })}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  )
}

function PageRender({ page }: any) {
  return page.custom ? <page.custom /> : null
}

export default App
