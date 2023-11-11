import {useLocation, useNavigate} from "react-router-dom";

import "@quarbon/css/themes/index.scss"
import "@quarbon/css/core.scss"
import "@quarbon/css/box.scss"
import "@quarbon/css/grid.scss"
import "@quarbon/css/typography.scss"
import "@quarbon/css/visibility.scss"
import "@quarbon/css/transitions.css"
import "@quarbon/css/form.scss"
import "@quarbon/utils/dragEnable"
import "@quarbon/utils/theme";
import "@quarbon/utils/history"
import "@quarbon/utils/screen"
import "@quarbon/langdef";

type TConfig = {
    plugins?: string[]
}

const quarbonConfig: TConfig = {
    plugins: []
};
const plugins:Record<string, any> = {
    router: {
        useLocation,
        useNavigate
    }
}
const registered:Record<string, any> = {}

export function config(conf: TConfig) {
    quarbonConfig.plugins = conf.plugins ?? [];
    quarbonConfig.plugins.forEach(name => {
        registered[name] = plugins[name];
    })
}

export function getPlugin(name:string) {
    return registered[name] ?? {};
}

if (!import.meta.env.DEV) {
    const description = "Quarbon UI";
    const ascii = [
        " ███   █   █    █   ████  ████   ███  █   █",
        "█   █  █   █   █ █  █   █ █   █ █   █ ██  █",
        "█   █  █   █   ███  ████  ████  █   █ █ █ █",
        "█  ██  █   █  █   █ █  █  █   █ █   █ █  ██",
        " ███ █  ███   █   █ █   █ ████   ███  █   █",
    ];

    console.log(`%c\n\n${ascii.join("\n")}\n\n${description}\n`, "font-family:monospace;color:#dd4f51;font-size:12px;");
}
