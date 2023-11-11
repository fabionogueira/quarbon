import { QButton } from "@quarbon/ui";
import { QDialog, QDialogActions, QDialogBody } from "@quarbon/ui/QDialog";

import "./Dialog.scss";

export function BaseDialog(props: any) {
    const { params: options, close } = props;
    const { title, content, buttons, className = "", closeRef } = options;

    closeRef.current = close;
    
    function onCloseButton() {
        close();
    }

    return (
        <QDialog
            title={title}
            persistent
            close={options.close}
            display="auto"
            className={className}
            onCloseButton={onCloseButton}        
        >
            <QDialogBody>{typeof (content) == "function" ? content(options.props) : content}</QDialogBody>
            {buttons.length > 0 &&
                <QDialogActions>
                    {buttons.map((btn: any, index: number) =>
                        btn ? (
                            <QButton
                                key={index}
                                label={btn.label}
                                color={btn.color}
                                onClick={() => close(index)}
                            />
                        ) : (
                            <div key={index}/>
                        )
                    )}
                </QDialogActions>
            }
        </QDialog>
    );
}
