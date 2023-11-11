import { useEffect, useState } from "react";

import { TBeforeShowEvent } from "./types";
import { UIModal } from "./UIModal";

type TUIDynamicModal = {
    Component: any;
    ComponentProps?: Record<string, any>;
    autoPosition?: boolean;
    backdrop?: boolean;
    params?: any;
    className?: string;
    onClose?: Function;
    onExternalAction?: Function;
    transitionShow?: string;
    transitionHide?: string;
    transition?: string;
    persistent?: boolean;
}

export function UIDynamicModal(props: TUIDynamicModal) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    let {
        Component,
        ComponentProps,
        autoPosition,
        backdrop,
        params,
        className = "",
        onClose,
        onExternalAction,
        transitionShow,
        transitionHide,
        transition,
        persistent,
    } = props;

    transitionShow = transition || transitionShow;
    transitionHide = transition || transitionHide;

    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 100);
    }, []);

    function close(data?: any) {
        setData(data);
        setOpen(false);
    }

    function onExternalActionLocal(event: any) {
        if (onExternalAction) return onExternalAction(event);
        if (persistent) return false;

        close(event.name);
    }

    function onBeforeShow(event?: TBeforeShowEvent) {
        // console.log(event);
    }

    function onCloseLocal() {
        onClose && onClose(data)
    }

    return (
        <UIModal
            autoPosition={autoPosition}
            backdrop={backdrop}
            className={className}
            transitionShow={transitionShow}
            transitionHide={transitionHide}
            onExternalAction={onExternalActionLocal}
            onClose={onCloseLocal}
            onBeforeShow={onBeforeShow}
            open={open}
            persistent={persistent}
        >
            <Component close={close} params={params} {...ComponentProps} />
        </UIModal>
    );
}
