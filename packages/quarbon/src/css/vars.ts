// @ts-ignore
import strVars from "./vars.scss?inline";

type TVars = {
    lg_max: number,
    md_max: number,
    sm_max: number,
    xs_max: number,
    z_modal: number,
};

export const vars:TVars = strVars
    .split(":export")[1]
    .split(";")
    .reduce((object:any, row:string) => {
        row = row.trim();
        
        if (row == "}" || row == "{")
            return object;
        
        let array = row.split(":");
        let key = array[0];
        let value = array[1].trim();

        object[key] = parseInt(value) || value;
        
        return object;
    },
    {}
);
