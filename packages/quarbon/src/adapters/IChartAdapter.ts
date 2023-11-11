import {Cube} from "@cube/Cube.ts";

export interface IChartAdapter {
    initialize: () => void;
    setDark: (dark:boolean) => IChartAdapter;
    setDefaultColors: (colors:string[]) => IChartAdapter;
    definition: (chartType:string, cube:Cube, config: any, options: any) => any;
    render: (element: HTMLElement, definition: any) => void;
}
