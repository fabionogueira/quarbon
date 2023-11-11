import { createContext } from "react";

export const QTabsContext = createContext({
    active: "",
    activeClass: "",
    indicator: "",
    setActive: (_name: string) => void (0),
    color: ""
});