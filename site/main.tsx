import { createRoot } from "react-dom/client";
import "@quarbon";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
//import App from "@quarbon/.docs/App"
// import { useLayoutEffect } from "react";
//
// (globalThis as any).setProps = (props: any, newProps?: any) => {
//   let p = {
//     ...(newProps ? newProps : props),
//   };
//
//   delete p.setProps;
//
//   useLayoutEffect(() => props.setProps && props.setProps(p));
// };

const rootElement: any = document.getElementById("root");
createRoot(rootElement).render(
  <BrowserRouter>
  <App />
    </BrowserRouter>);
