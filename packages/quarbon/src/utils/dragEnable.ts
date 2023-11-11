/**
 * dragEnable 1.0.2
 * @author Fábio Nogueira
 * @description Permite arrastar um elemento html usando o atributo drag-enabled
 * @example
 *      <!-- básico -->
 *      <h1 drag-enabled>arraste-me</h1>
 *      <div style="background:red; padding:10px">
 *          Arraste-me
 *          <h1 drag-enabled="self">arraste-me</h1>
 *      </div>
 *
 *      <!-- arrastando uma cópia -->
 *      <h1 drag-enabled="clone">arraste-me</h1>
 *
 *      <!-- eventos -->
 *      dragStart, dragMove, dragAfterMove, dragEnd, dropEnter, dropExit
 *      <h1 drag-enabled @dragmove="onDragMove">arraste-me</h1>
 *      <script>
 *          function onDragMove(event) {
 *              event.cancel = true // cancela o arrasto
 *          }
 *      </script>
 *
 *      <!-- evento ao passar por um elemento alvo -->
 *      <h1 drag-enabled>arraste-me</h1>
 *      <div drop-enabled>se passar aqui</div>
 *
 *      <!-- drag-grid -->
 *      <div drag-enabled drag-grid="10,10">muda de posição a cada 10px</div>
 *
 *      drag-container="self|document" default=document
 *          faz com que o elemento arrastado fique dentro do elemento pai
 *          se não for definido o elemento arrastado ficará dentro do body
 */

let targetElement: HTMLElement | any
let difX: number, difY: number, initialX: number, initialY: number
let initialUserSelect: string
let initialCursor: string
let activeTargetDrop: HTMLElement | any
let dragData: any
let grid = [1, 1]
let mouseX: number
let mouseY: number
let deslocX: number
let deslocY: number
let cursor

function round(p: number, n: number) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n)
}

function createEvent() {
  return {
    data: dragData,
    difX: difX,
    difY: difY,
    mouseX: mouseX,
    mouseY: mouseY,
    deslocX: deslocX,
    deslocY: deslocY,
    cancel: false,
    targetElement: targetElement,
    targetDrop: activeTargetDrop,
  }
}

function dispatch(target: HTMLElement, name: string, event: any = null) {
  let i, fn, attr, attrs, vei

  if (!target) {
    return
  }

  name = `on${name.toLowerCase()}`
  attrs = target.attributes

  for (i = 0; i < attrs.length; i++) {
    attr = attrs[i]
    fn = (window as any)[attr.value]

    if (attr.name == name && typeof fn == 'function') {
      fn(event)
    }
  }

  // vue event
  vei = (target as any)._vei
  if (vei) {
    fn = vei[`on${name.charAt(2).toUpperCase()}${name.substr(3)}`]
    if (typeof fn == 'function') {
      fn(event)
    }
  } else {
    fn = (target as any)[name]
    if (typeof fn == 'function') {
      fn(event)
    }
  }

  // native event
//   const evt = new DragEvent('look', { bubbles: true, cancelable: false });
//   target.dispatchEvent(evt);
}

function isDraggable(element: HTMLElement) {
  return element.hasAttribute('drag-enabled')
}

function disableSelection() {
  if (initialUserSelect === undefined) {
    initialUserSelect = document.body.style.userSelect
    initialCursor = document.body.style.cursor
  }
  document.body.style.userSelect = 'none'
}

function enableSelection() {
  document.body.style.userSelect = initialUserSelect
  document.body.style.cursor = initialCursor
}

function onMouseDown(event: MouseEvent | TouchEvent | any) {
  if (event.changedTouches) {
    event = event.changedTouches[0]
  }

  let r, evt
  let target = event.target

  if (targetElement) {
    onMouseUp()
    targetElement = null
  }

  if (target?.closest('[drag-enabled]') && target.closest('[prevent-default]')) {
    event.cancelBubble = true
    event.preventDefault()
  }

  while (target.parentNode && target != document.body) {
    if (target.getAttribute('drag-enabled') == 'false') {
      return
    }

    if (isDraggable(target)) {
      targetElement = target

      r = (targetElement as any).getBoundingClientRect()

      difX = event.pageX - r.left
      difY = event.pageY - r.top
      initialX = event.pageX
      initialY = event.pageY
      targetElement.initialOffsetLeft = targetElement.offsetLeft
      targetElement.initialOffsetTop = targetElement.offsetTop

      if (targetElement.getAttribute('drag-enabled') == 'clone') {
        let t = targetElement.cloneNode(true)

        t.getData = targetElement.getData
        targetElement = t
        targetElement.__isClone = true
      }

      evt = { target: targetElement }
      dispatch(targetElement, 'dragBeforeStart', evt)
      evt.target.__isClone = targetElement.__isClone
      targetElement = evt.target

      targetElement.zIndex = targetElement.style.zIndex

      // targetElement.ondragstart = function() {
      //     return false
      // }

      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('touchend', onMouseUp)
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('touchmove', onMouseMove, { passive: false })

      return
    }

    target = target.parentNode
  }
}

function onMouseUp() {
  let evt = createEvent()

  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('touchend', onMouseUp)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('touchmove', onMouseMove)

  enableSelection()

  if (targetElement.__drag_started) {
    dispatch(targetElement, 'dragEnd', evt)
  }

  if (activeTargetDrop) {
    activeTargetDrop.removeAttribute('drop-over')
    dispatch(targetElement, 'drop', evt)
    dispatch(activeTargetDrop, 'drop', evt)
    activeTargetDrop = null
  }

  targetElement.removeAttribute('drag-moving')
  targetElement.removeAttribute('droppable')
  targetElement.__drag_started = false

  if (targetElement.__isClone && targetElement.parentNode) {
    targetElement.parentNode.removeChild(targetElement)
  }

  if (targetElement.zIndex) {
    targetElement.style.zIndex = targetElement.zIndex
  } else {
    targetElement.style.removeProperty('z-index')
  }

  dragData = null
  targetElement = null
}

function onMouseMove(event: MouseEvent | TouchEvent | any) {
  let rect, targetMouseOver, gd, x, y, dropName, nativeEvent
  let targetDrop: HTMLElement | Element | null
  let evt: any

  nativeEvent = event

  if (event.changedTouches) {
    event = event.changedTouches[0]
  }

  deslocX = event.pageX - initialX
  deslocY = event.pageY - initialY
  mouseX = event.pageX
  mouseY = event.pageY

  evt = createEvent()

  // encontra o target drop
  if (!targetElement.__display) {
    targetElement.__display = targetElement.style.display
  }
  targetElement.style['pointer-events'] = 'none'
  targetDrop = targetMouseOver = document.elementFromPoint(event.pageX, event.pageY)
  targetElement.style['pointer-events'] = 'initial'
  evt.target = targetDrop // element que o mouse está dentro

  if (targetDrop) {
    targetDrop = targetDrop.closest('[drop-enabled]')
    if (targetDrop) {
      evt.targetDrop = targetDrop
      dropName = targetDrop.getAttribute('drop-enabled')

      if (targetElement.getAttribute('drop-target') && targetElement.getAttribute('drop-target') != dropName) {
        evt.targetDrop = targetDrop = null
      } else {
        // posição do mouse dentro target drop
        rect = targetDrop.getBoundingClientRect()
        evt.dropX = mouseX - rect.left
        evt.dropY = mouseY - rect.top

        // posição do mouse dentro do elemento mouseover
        rect = (targetMouseOver as HTMLElement).getBoundingClientRect()
        evt.dropChildX = mouseX - rect.left
        evt.dropChildY = mouseY - rect.top
      }
    }
  }

  if (!targetElement.__drag_started) {
    cursor = targetElement.getAttribute('drag-cursor') || 'grabbing'

    disableSelection()
    document.body.style.cursor = cursor

    let dragContainer = targetElement.getAttribute('drag-container');
    if (dragContainer && dragContainer != 'self') {
      document.body.appendChild(targetElement)
    }

    targetElement.setAttribute('drag-moving', '')
    targetElement.__drag_started = true
    dragData = targetElement.getData ? targetElement.getData() : targetElement.getAttribute('drop-data')
    gd = targetElement.parentNode.getAttribute('drag-grid')
    if (gd) {
      grid = gd.split(',')
      grid.forEach((n, i, a) => {
        a[i] = Number(n)
      })
    } else {
      grid = [1, 1]
    }

    dispatch(targetElement, 'dragStart', {
      mouseX,
      mouseY,
      targetElement,
      data: dragData,
      target: targetElement,
      targetOrigin: event.target,
    })
  }

  x = targetElement.parentNode == document.body ? mouseX - difX : targetElement.initialOffsetLeft + deslocX
  y = targetElement.parentNode == document.body ? mouseY - difY : targetElement.initialOffsetTop + deslocY

  x = round(x, grid[0])
  y = round(y, grid[1])

  evt.x = x
  evt.y = y

  dispatch(targetElement, 'dragMove', evt)

  if (evt.cancel !== true) {
    // posiciona o elemento
    targetElement.style.zIndex = 9999999
    targetElement.style.position = 'absolute'
    targetElement.style.margin = 0
    targetElement.style.top = `${evt.y}px`
    targetElement.style.left = `${evt.x}px`
  }

  dispatch(targetElement, 'dragAfterMove', evt)

  if (activeTargetDrop && activeTargetDrop != targetDrop) {
    // saiu da drop zone
    evt.targetDrop = activeTargetDrop
    activeTargetDrop.removeAttribute('drop-over')
    targetElement.removeAttribute('droppable')

    dispatch(activeTargetDrop, 'dropExit', evt)
    dispatch(targetElement, 'dropExit', evt)
    activeTargetDrop = null
  }

  if (targetDrop && targetDrop != activeTargetDrop) {
    // entrou na drop zone
    targetDrop.setAttribute('drop-over', '')
    targetElement.setAttribute('droppable', '')
    activeTargetDrop = targetDrop
    dispatch(activeTargetDrop, 'dropEnter', evt)
    dispatch(targetElement, 'dropEnter', evt)
  }

  nativeEvent.preventDefault()
}

document.addEventListener('mousedown', onMouseDown, true)
document.addEventListener('touchstart', onMouseDown, true)

export {}
