import { transpile } from "./parser.js";

let tm;
let progress = false;
let count = 0;

export function vitePluginDoctools() {
  return {
    name: 'vite-plugin-doctools',

    load(id) {
      if (id.includes(".docs.")) {
        doParser()
      }

      return null;
    },
  }
}

function doParser() {
  clearTimeout(tm);

  if (progress)
    return

  tm = setTimeout(() => {
    progress = true;
    transpile();
    setTimeout(() => {
      progress = false;
      //console.log(`vite-plugin-doctools transpiler refreshed [${++count}]`)
    }, 400);
  }, 1000)
}
