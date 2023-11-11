
import {useEffect, useRef} from "react";
import "@docs/libs/prism.js"
import "@docs/libs/prism.css"
import "@docs/libs/prism.theme.atom-dark.css"

window.Prism = window.Prism || {};
window.Prism.manual = true;

type THighlightProps = {
    code?: string;
    language: string;
}

export function Highlight(props: THighlightProps) {
    const codeRef = useRef<any>(null);
    const {code, language} = props;

    useEffect(() => {
        if (!code) return;

        const el = codeRef.current;
        const Prism = window.Prism;

        el.innerHTML = Prism.highlight(code, Prism.languages.tsx, "tsx")
    }, [])

    if (!code) return null;

    return (
        <pre className={`highlight language-${language}`}>
            <code ref={codeRef}></code>
        </pre>
    )
}