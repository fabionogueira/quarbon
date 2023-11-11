type TListener = (name: string) => void

const listeners: TListener[] = []
let activeTheme: TThemeName | null;
let isDark: boolean;

export type TThemeName = 'white' | 'gray10' | 'gray90' | 'gray100'

export const Theme = {
  set(name: TThemeName) {
    document.body.setAttribute('theme', name)
    localStorage.setItem('__quarbon__.theme', name)
    activeTheme = name;
    isDark = 'gray90 gray100'.includes(name);
    dispatch();
  },
  get() {
    return activeTheme
  },
  addEventListener(callback: TListener) {
    listeners.push(callback)
    dispatch();
  },
  isDark() {
    return isDark;
  },
  removeEventListener(callback: TListener) {
    const index = listeners.findIndex((fn) => fn == callback)

    if (index >= 0) {
      listeners.splice(index, 1)
    }
  },
}

function dispatch() {
  listeners.forEach((fn: any) => {
    const n = fn.__theme

    fn.__theme = activeTheme

    if (n != activeTheme) {
      fn(activeTheme)
    }
  })
}

Theme.set((localStorage.getItem('__quarbon__.theme') as TThemeName) || 'white')
