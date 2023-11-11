export type TOnEvent = (event: TStackEvent) => void;
export type TBeforeShowEvent = {
    id: string;
};

export type TStackEvent = {
    name: "open" | "back" | "escape" | "clickout" | "close" | "context" | "backdrop";
    data?: any;
};
export type TStack = {
    id: string;
    opened: boolean;
    on: TOnEvent;
};

export type TPosition = "top" | "bottom" | "left" | "right" | null;
export type TOpenModalOptions = {
  autoPosition?: boolean;
  backdrop?: boolean;
  props?: any;
  params?: any;
  className?: string;
  transition?: string;
  transitionShow?: string;
  transitionHide?: string;
  position?: TPosition;
  persistent?: boolean;
  onCloseButton?: Function;
};

export type TAnchor =
  | "top left"
  | "top middle"
  | "top right" // "top start"    | "top end"    |
  | "center left"
  | "center middle"
  | "center right" // "center start" | "center end" |
  | "bottom left"
  | "bottom middle"
  | "bottom right"; // "bottom start" | "bottom end"
// ll-bt
// l = left    ( anchor )
// l = left    ( self )
// b = bottom  ( anchor )
// t = top     ( self  )
// A2S2-A1S1
