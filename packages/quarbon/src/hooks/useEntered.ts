import { useContext } from "react";
import { RouterContext } from "../context/RouterContext";

export function useEntered(cb:Function) {
    const ctx: any = useContext(RouterContext);
    ctx.onEntered = cb
}