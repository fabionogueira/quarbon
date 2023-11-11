import { createContext } from 'react'

type TPageProps = {
  children: any
  className?: string
  component?: any
}

export function Page(props: TPageProps) {
  const { className = '', component, children } = props
  const componentName = component ? component.displayName ?? component.name : null

  return (
    <PageContext.Provider value={{component, componentName}}>
      <div className={`row scroll page justify-center ${className}`}>
        <div className="page__inner">{children}</div>
      </div>
    </PageContext.Provider>
  )
}

export const PageContext = createContext<any>({})
