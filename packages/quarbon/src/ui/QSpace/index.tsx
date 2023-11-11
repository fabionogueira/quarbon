
type TQSpaceProps = {
    children?: any,
    className?: string
}

export function QSpace(props: TQSpaceProps) {
    const { children, className } = props

    return <div className={`space ${className||''}`}>{children}</div>
}
