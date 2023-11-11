import { lazy as reactLazy, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { RouterContext } from "../context/RouterContext"
import { Uid } from "./uid"

type TTransitionRouteProps = {
    children: any,
    transition?: string,
    transitionShow?: string,
    transitionHide?: string,

    onError?: Function
}

export function TransitionRoute({
    children,
    onError,
}:TTransitionRouteProps)
{
    let loading:boolean
    let Child:any
    
    const nodeRef = useRef(null)
    const location = useLocation()
    const [force, forceUpdate] = useState(0)
    const currentModule = useRef<any>()
    const pathname = location.pathname
    const arr = Array.isArray(children) ? children : [children]
    const route = find(arr, pathname, force == -1)
    const element = route ? route.props.element : null
    const isLazy = Boolean(element?.preload)
    const ctx:any = {}

    if (!route) {
        loading = false
        Child = currentModule.current?.Component
        
        if (!Child) {
            return null
        }
    } else {        
        // is lazy load component
        if (isLazy && !element.Component) {
            loading = true
    
            element.preload()
                .then((module: any) => {
                    setTimeout(() => {
                        currentModule.current = module.default 
                        element.Component = module.default
                        forceUpdate(force + 1) //Element)
                    }, 100)
                })
                .catch((error:Error) => {
                    onError && onError(error)
                })
            
            if (!currentModule.current) {
                // first load
                return <LazyLoadingScreen />
            } else {
                Child = currentModule.current
            }
        } else {
            loading = false
            Child = isLazy ? element.Component : element
        }
    }
   
    Child.uid = Child.uid || Uid()

    function onEntered() {
        ctx.onEntered && ctx.onEntered()
        delete(ctx.onEntered)
    }
    
    return (
        <>
            <SwitchTransition>
                <CSSTransition
                    key={Child.uid}
                    nodeRef={nodeRef}
                    timeout={300}
                    classNames="slide_left"
                    unmountOnExit
                    onEntered={onEntered}
                    appear
                >
                    {/* {(state) => (
                        <div ref={nodeRef} className="page">
                            {currentOutlet}
                        </div>
                    )} */}
                    <RouterContext.Provider value={ ctx }>
                        <Child />
                    </RouterContext.Provider>
                </CSSTransition>
            </SwitchTransition>
            {loading && <LazyLoadingScreen />}
        </>
    )
}

type TRouteProps = {
    path?: string,
    element: any,
    exact?: boolean,
    force?: boolean
}

export function Route(props:TRouteProps) {
    return (
        <>
            {props.element}
        </>
    )
}

export function lazy (importStatement:any) {
    const Component:any = reactLazy(importStatement);
    
    Component.preload = importStatement;
    
    return Component;
}

function LazyLoadingScreen() {
    return (
        <div className="wait">
            <h1>loading...</h1>
        </div>
    )
}

function find(arr:Array<any>, path:string, exact:boolean) {
    return arr.find(({props}) => {
        if (props.force) {
            return true
        }

        return exact || props.exact
            ? path == props.path
            : path.startsWith(props.path) || props.path=="*"
    })
}
