
import { getContent } from "./parser";

export function vitePluginDirectives(config) {
  config = config || {}
  config.directives = config.directives || [];
  
  return {
    name: 'vite-plugin-directives',

    load(id) {
      if (id.endsWith(".ts") || id.endsWith(".tsx")) {
        let source = getContent(id);

        if (process.env.NODE_ENV != 'development') {
          source = removeDirective(source, "//#IFDEBUG", "//#ENDIF");
        }

        config.directives.forEach(([start, end]) => {
          source = removeDirective(source, start, end);
        });

        return source;
      }

      return null;
    },
  }
}

function removeDirective(source, start, end) {
  let ignore = false;

  return source
    .split("\n")
    .filter(row => {
      row = row.trim();

      if (row.startsWith(start)) {
        ignore = true;
        return false;
      }
      
      if (row.startsWith(end)) {
        ignore = false;
        return false;
      }

      return !ignore;
    })
    .join("\n");
}

