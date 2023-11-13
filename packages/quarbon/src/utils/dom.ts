/** @format */

let textMetricsElement: HTMLElement
let zindex = 9999

const actions: any = {}

type TRect = {
  left: number
  top: number
  height: number
  width: number
}

document.body.addEventListener('mousedown', (event) => {
  const els = document.body.querySelectorAll('[click-out-capture]')
  const parent = (event.target as any).closest('[click-out-capture]')

  els.forEach((el) => {
    const element = el as any
    const fn = element.$onMouseDown

    if (parent != el) {
      fn && fn(event)
      delete element.$onMouseDown
    }
  })
})

/**
 * @example
 *
 * <button data-action="close-modal">click</button>
 *
 */
document.body.addEventListener('click', (event: any) => {
  const target = event.target as HTMLElement
  const el: any = target.getAttribute('data-action') ? target : target.closest('[data-action]')

  if (el) {
    const value: any = el.getAttribute('data-action')
    const parent: any = target.closest(`[data-${value}]`)
    const fn: Function = parent ? parent[value] : null

    if (fn) {
      setTimeout(() => {
        fn(event.nativeEvent || event)
      }, 100)
    }
  }
})

const hpos: any = {
  adjust(x: number, ra: TRect, rb: TRect, mw: number) {
    if (x + rb.width > mw) x = ra.left
    if (x + rb.width > mw) x = mw - rb.width
    if (x < 0) x = 0

    return x
  },
  ll(ra: TRect) {
    return ra.left
  },
  rl(ra: TRect) {
    return ra.left + ra.width
  },
  lr(ra: TRect, rb: TRect) {
    return ra.left - rb.width
  },
  rr(ra: TRect, rb: TRect) {
    return ra.left + ra.width - rb.width
  },
  cc(ra: TRect, rb: TRect) {
    return ra.left + ra.width / 2 - rb.width / 2
  },
  cl(ra: TRect) {
    return ra.left + ra.width / 2
  },
  cr(ra: TRect, rb: TRect) {
    return ra.left + ra.width / 2 - rb.width
  },
}

const vpos: any = {
  adjust(y: number, ra: TRect, rb: TRect, mr: number) {
    if (y + rb.height > mr) y = ra.top
    if (y + rb.height > mr) y = mr - rb.height
    if (y < 0) y = 0

    return y
  },
  tt(ra: TRect) {
    return ra.top
  },
  bt(ra: TRect) {
    return ra.top + ra.height
  },
  tb(ra: TRect, rb: TRect) {
    return ra.top - rb.height
  },
  bb(ra: TRect, rb: TRect) {
    return ra.top + ra.height - rb.height
  },
  cc(ra: TRect, rb: TRect) {
    return ra.top + ra.height / 2 - rb.height / 2
  },
  ct(ra: TRect) {
    return ra.top + ra.height / 2
  },
  cb(ra: TRect, rb: TRect) {
    return ra.top + ra.height / 2 - rb.height
  },
}

export const DOM = {
  create(tagName: string, cssText?: string, className?: string) {
    let htmlElement, i, a, attrs

    a = tagName.split('[')
    tagName = a[0]
    attrs = a[1]

    htmlElement = document.createElement(tagName)

    if (attrs) {
      a = attrs.replace(']', '').split(',')
      for (i = 0; i < a.length; i++) {
        attrs = a[i].split('=')
        htmlElement.setAttribute(attrs[0], attrs[1])
      }
    }

    if (cssText) {
      htmlElement.style.cssText = cssText
    }

    if (className) {
      htmlElement.className = className
    }

    return htmlElement
  },
  remove(htmlElement: HTMLElement) {
    htmlElement.parentNode && htmlElement.parentNode.removeChild(htmlElement)
  },
  getStyle(o: any, property: string, camelProperty: string) {
    let val = null

    if (o == null) {
      return null
    }

    camelProperty = property // this._hyphen2camel(property); //ex: line-width para lineWidth

    // Handle "float" property as a special case
    /*
     * if (property=="float") { val = jsf.Dom.getStyle(o,"cssFloat"); if
     * (val==null) { val = jsf.Dom.getStyle(o,"styleFloat"); } } else
     */
    if (o.currentStyle && o.currentStyle[camelProperty]) {
      val = o.currentStyle[camelProperty]
    } else if (window.getComputedStyle) {
      val = window.getComputedStyle(o, null).getPropertyValue(property)
    } else if (o.style && o.style[camelProperty]) {
      val = o.style[camelProperty]
    }
    // For color values, make the value consistent across browsers
    // Convert rgb() colors back to hex for consistency
    /*
     * if (/^\s*rgb\s*\(/.test(val)) { val = css.rgb2hex(val); } //
     * Lowercase all #hex values if (/^#/.test(val)) { val =
     * val.toLowerCase(); }
     */
    return val
  },
  style(e: HTMLElement, s: any) {
    let k, ss
    let rules = (e.getAttribute('style') || '').split(';').reduce((o: any, value) => {
      let a = value.split(':')
      let k = a[0]
      let v = a[1]

      if (v) {
        o[k] = v
      }

      return o
    }, {})

    for (k in s) {
      rules[k] = s[k]
    }

    ss = Object.keys(rules).reduce((str, key) => {
      return str + key + ':' + rules[key] + ';'
    }, '')

    e.setAttribute('style', ss)
  },

  /**
   * @param {String} position format hh-vv, ex: ll-bt
   * @param {HTMLElement|{left,top,height,width}} ref Reference element
   * @param {Number|{left,top,bottom,right}} margin
   */
  positionByRect(
    target: HTMLElement | null,
    position: string,
    ref?: HTMLElement,
    fitToHeight: boolean = false,
    offset: any = {},
  ) {
    let x, y, hcb, vcb, arr, styl, screen, rRef, rTarget

    if (!target) {
      return this
    }

    let container: any = target.parentNode
    let display = target.style.display
    let visibility = target.style.visibility

    if (container.hasAttribute('is-template')) {
      container = container.parentNode
    }

    if (!target.offsetWidth || !target.offsetHeight) {
      target.style.display = 'block'
      target.style.visibility = 'hidden'
    }

    screen = {
      left: 0,
      top: 0,
      width: container.offsetWidth,
      height: container == document.body ? window.innerHeight : container.offsetHeight,
    }

    target.style.top = '0'
    target.style.left = '0'

    if (target.offsetWidth > screen.width - 80) {
      target.style.width = `${screen.width - 80 + 1}px`
    } else {
      target.style.width = `${target.offsetWidth + 1}px`
    }

    if (ref) {
      arr = position.split('-') //ex: ll-bt
      hcb = hpos[arr[0]]
      vcb = vpos[arr[1]]

      if (!hcb || !vcb) {
        throw new Error(`invalidate position ${position}, use format hh-vv, ex: ll-bt`)
      }
    }

    rRef = ref ? (ref.getBoundingClientRect ? ref.getBoundingClientRect() : ref) : screen
    rTarget = target.getBoundingClientRect()
    styl = window.getComputedStyle(target)
    rTarget.width += parseInt(styl['marginLeft']) + parseInt(styl['marginRight'])
    rTarget.height += parseInt(styl['marginTop']) + parseInt(styl['marginBottom'])

    if (ref) {
      x = hcb(rRef, rTarget)
      y = vcb(rRef, rTarget)
    } else {
      x = offset.x || 0
      y = offset.y || 0
      rRef = {
        height: 1,
        left: x,
        top: y,
        width: 1,
      }
    }

    if (fitToHeight) {
      target.style.height = `${screen.height - y}px`
    }

    x = hpos.adjust(x, rRef, rTarget, screen.width) + (offset.left || 0) - (offset.right || 0)
    y = vpos.adjust(y, rRef, rTarget, screen.height) + (offset.top || 0) - (offset.bottom || 0)

    target.style.display = display
    target.style.visibility = visibility

    this.style(target, {
      left: x + 'px',
      top: y + 'px',
    })

    return this
  },
  isChild(parent: HTMLElement, child: HTMLElement) {
    let i
    let p: any

    if (child.parentNode == parent) {
      return true
    }

    p = parent.childNodes

    for (i = 0; i < p.length; i++) {
      if (this.isChild(p[i], child)) {
        return true
      }
    }

    return false
  },
  textMetrics(text: string, cssText: string, className: string) {
    if (!textMetricsElement) {
      textMetricsElement = document.body.appendChild(this.create('span', 'position:absolute; top:10000px; left:0;'))
    }

    textMetricsElement.style.cssText = cssText || ''
    textMetricsElement.className = className || ''
    textMetricsElement.innerHTML = text

    return {
      width: textMetricsElement.offsetWidth,
      height: textMetricsElement.offsetHeight,
    }
  },
  clickOut(el: HTMLElement, fn: Function | null = null) {
    if (!fn) {
      el.removeAttribute('click-out-capture')
      delete (el as any).$onMouseDown
    } else {
      el.setAttribute('click-out-capture', '')
      ;(el as any).$onMouseDown = fn
    }
    return this
  },
  dataAction(name: string, fn: Function | null = null) {
    actions[name] = fn
    return this
  },
  dataActionDispatch(value: string, event?: any) {
    const fn = actions[value]
    fn && fn(event)
  },
  dataAttrs(props: any) {
    return Object.keys(props)
      .filter((k: string) => k.startsWith('data'))
      .reduce((o, k) => ({ ...o, [k]: (props as any)[k] }), {})
  },
  zIndex() {
    return zindex++
  },
  isFocused(element: HTMLElement) {
    const inputDocument = element.ownerDocument
    return inputDocument.hasFocus() && inputDocument.activeElement === element
  },
}
