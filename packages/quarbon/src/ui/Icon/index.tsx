
import { SvgIcon } from "../../utils/svgicon"
import "./Icon.scss"

type IconProps = {
    className?: string,
    name: string,
    size?: string,
    style?: string,
    color?: string
}

export function Icon(props: IconProps) {
    let {
        name,
        className=""
    } = props

    const icon = SvgIcon.create(name, props)

    return (
        <svg
            style={icon.style}
            className={`c-icon ${icon.class} ${className}`}
            viewBox={icon.viewBox}
            fill="currentColor"
            dangerouslySetInnerHTML={{__html: icon.innerHTML}}
        />)
}
