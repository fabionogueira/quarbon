
export function CSSTransition(el: HTMLElement) {
    let started = false
    let fnComplete:Function|null = null
    
    const waitCompletion = (fn: Function) => {
        if (!started) {
            fn()
        } else {
            fnComplete = fn
        }
    }
    
    (el as any).cancel && (el as any).cancel()
    
    return {
        add(cls: string) {
            waitCompletion(() => {
                el.classList.add(cls)
            })

            return this
        },
        
        remove(cls: string) {
            waitCompletion(() => {
                el.classList.remove(cls)
            })

            return this
        },

        enter(name: string, onComplete: Function) {
            const rules = [
                `${name}-enter`,
                `${name}-enter-active`
            ];

            started = true

            apply(el, name, rules, () => {
                fnComplete && fnComplete()
                onComplete()
            })
            
            return this
        },
        
        exit (name: string, onComplete: Function) {
            const rules = [
                `${name}-exit`,
                `${name}-exit-active`
            ];
            
            started = true

            apply(el, name, rules, () => {
                fnComplete && fnComplete()
                onComplete()
            })
            
            return this
        },
    }
}

function apply(el:HTMLElement, name:string, rules:Array<string>, onComplete:Function) {
    clear(el, name)
    el.classList.add(rules[0])

    next(el, () => {
        el.classList.add(rules[1])
        doTransition(el, () => {
            clear(el, name)
            onComplete()
        })
    })
}

function clear(el: HTMLElement, name: string) {
    let rules = [
        `${name}-enter`,
        `${name}-enter-from`,
        `${name}-leave`,
        `${name}-leave-from`
    ];

    rules.forEach(css => {
        el.classList.remove(css)
    })
}

function doTransition(el:HTMLElement, onComplete:Function) {
    let tm, timeout:any
    let complete = false
    
    if (!el || !el.parentNode) {
        return onComplete()
    }

    el.addEventListener("transitionend", onTransitionEnd);
    (el as any).cancel = onTransitionEnd;

    function onTransitionEnd() {
        delete ((el as any).cancel)
        
        if (complete) {
            return
        }

        complete = true
        clearTimeout(timeout)

        onComplete()
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

function next(el:HTMLElement, fn:Function) {
    if (!el.parentNode) {
        return fn()
    }

    setTimeout(() => {
        fn()
    }, 1)
}