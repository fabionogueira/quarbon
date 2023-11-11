
export const devtools = {
    setProps: (props:any, newProps:any) => {
        let p = {
            ...newProps
        }

        delete(p.setProps);

        props.setProps && props.setProps(p);
    }
}
