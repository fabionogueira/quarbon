
export function CSSTransition(el:HTMLElement) {
    return {
        add(css: string, onComplete?: Function) {
            function doAdd() {
                if (css && el) {
                    const arr = css.split(" ")

                    remove(el, arr)
                    add(el, arr)
                }
            }

            if (onComplete) {
                setTimeout(() => {
                    doAdd()    
                    onComplete && doTransition(el, onComplete)
                }, 100)
            } else {
                doAdd()
            }

            return this
        },
        
        remove(css:string, onComplete?:Function) {
            if (css && el) {
                remove(el, css.split(" "))
            }
            
            onComplete && doTransition(el, onComplete)

            return this
        }
    }
}

function remove(el:HTMLElement, arr:Array<string>) {
    arr.forEach(css => {
        el.classList.remove(css)
    })
}

function add(el:HTMLElement, arr:Array<string>) {
    arr.forEach(css => {
        el.classList.add(css)
    })
}

function doTransition(el:HTMLElement, onComplete?:Function) {
    let tm, timeout:any
    let complete = false
    
    if (!el) {
        onComplete && onComplete()
        return
    }

    el.addEventListener("transitionend", onTransitionEnd)

    function onTransitionEnd() {
        if (complete) {
            return
        }

        complete = true
        clearTimeout(timeout)

        onComplete && onComplete()
    }

    try {
        tm = getComputedStyle(el)['transitionDuration']
        tm = Math.max.apply(null, tm
            .split(',')
            .map(s => parseFloat(s.trim()) || .2)
        )
    } catch (error) {
        tm = .3
    }
    
    timeout = setTimeout(onTransitionEnd, tm * 1000)
}
