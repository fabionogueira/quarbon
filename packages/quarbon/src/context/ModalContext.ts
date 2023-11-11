import { createContext } from "react"

export type TModalContext = {
  opened?: boolean
  ref?: null | HTMLElement
  open?: null | ((ref: HTMLElement) => void)
}

export const ModalContext = createContext<TModalContext>({
  opened: false,
  ref: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open: (_ref: HTMLElement) => void 0,
})
