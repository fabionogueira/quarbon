/** @format */

import { useCallback, useEffect, useState } from "react";
import { Screen } from "@quarbon/utils/screen";

let QScreenId = 0;

type TSizes =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "lt-xs"
  | "lt-sm"
  | "lt-md"
  | "lt-lg"
  | "lt-xl"
  | "gt-xs"
  | "gt-sm"
  | "gt-md"
  | "gt-lg"
  | "gt-xl";
type TScreenProps = {
  children?: any;
  size?: TSizes;
  max?: number;
  min?: number;
  exact?: boolean;
  onResize?: (width: number) => void;
};

type TQScreenState = {
  size: TSizes | null;
  width: number;
  show: boolean | null;
};

export function QScreen(props: TScreenProps) {
  const [id] = useState(`QScreen-${++QScreenId}`);
  const [state, setState] = useState<TQScreenState>({
    size: Screen.size() as TSizes,
    width: Screen.width(),
    show: null,
  });
  const { children, size, max, min, exact = false, onResize } = props;
  const sz = `size-${size}`;
  const onResizeWindow = useCallback(
    (width: number) => {
      if (sz) {
        setState({ size: size || null, width, show: null });
      } else if (max || min) {
        const show = Boolean((min && min >= width) || (max && max <= width));
        if (show !== state.show) {
          setState({ size: null, width, show });
        }
      }
    },
    [max, min, size, state.show, sz]
  );

  useEffect(() => {
    if (sz) {
      Screen.onChange(onResizeWindow, id);
    } else if (max || min) {
      Screen.onResize(onResizeWindow, id);
    }

    return () => {
      Screen.offChange(id);
      Screen.offResize(id);
    };
  }, [id, min, max, sz, state, onResizeWindow]);

  if (size) {
    const sizes = Screen.sizes();

    if (exact) {
      if (sz == state.size) {
        onResize?.(state.width);
        return children;
      }
    } else if (sizes.includes(sz)) {
      onResize?.(state.width);
      return children;
    }
  } else if (min && min >= state.width) {
    onResize?.(state.width);
    return children;
  } else if (max && max <= state.width) {
    onResize?.(state.width);
    return children;
  }

  return null;
}
