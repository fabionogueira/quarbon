import { createContext } from 'react'
import { TColor } from '@quarbon/types'

export type TQAccordionContext = {
  active?: string
  activeClass?: string
  indicator?: string
  setActive: (name: string) => void
  color?: TColor | ''
  toggle?: boolean
}

export const QAccordionContext = createContext<TQAccordionContext>({
  active: '',
  activeClass: '',
  indicator: '',
  setActive: (name: string) => undefined,
  color: '',
  toggle: false,
})
