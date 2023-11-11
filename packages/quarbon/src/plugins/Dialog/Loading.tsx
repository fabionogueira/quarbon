import { createRoot } from "react-dom/client";

import { QLoading } from "@quarbon/ui/QLoading";
import { zIndex } from "@quarbon/utils/css";

let LoadingDiv: HTMLElement | null;

export const Loading = {
  show(label?:string) {
    if (!LoadingDiv) {
      const div = document
          .body
          .appendChild(document.createElement("div"));

      createRoot(div).render(
          <QLoading
            overlay
            inline={false}
            size={56}
            color="primary"
            label={label}
            style={{zIndex:zIndex()}}
          />
      );

      LoadingDiv = div;
    }
  },

  hide() {
    if (LoadingDiv) {
      setTimeout(() => {
        LoadingDiv?.parentNode?.removeChild(LoadingDiv);
        LoadingDiv = null;
      }, 200)
    }
  }
}
