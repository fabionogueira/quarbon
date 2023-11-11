import {CSSProperties, ReactNode} from "react";

/**
 * @doc:attrs TBaseProps
 */
export type TBaseProps = {
    children?: ReactNode | undefined;

    /**
     * @doc:attr:type string
     * @doc:attr:control false
     */
    className?: string;

    /**
     * @doc:attr:type boolean
     */
    disabled?: boolean;

    /**
     * @doc:attr:type CSSProperties
     * @doc:attr:control false
     */
    style?: CSSProperties | undefined;

    /**
     * @doc:attr:type string
     * @doc:attr:control false
     */
    tooltip?: string;
}