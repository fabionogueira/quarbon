/** @format */

// import.ts 1.0.1

type TModule = {
  status: "loading" | "error" | "success";
  promisse: Promise<any> | null;
};

const modules: { [key: string]: TModule } = {};

export function loader(path: string, type = "js", asyncLoad = true) {
  if (path.startsWith("./")) {
    path = `${location.origin}${path.substring(1)}`
  }

  if (modules[path]) {
    if (modules[path].status == "loading") return modules[path].promisse as Promise<any>;
    if (modules[path].status == "success") return Promise.resolve(true);
    return Promise.resolve(false)
  }

  modules[path] = {
    status: "loading",
    promisse: null,
  };

  return type == "css" ? loadCSS(path) : loadJS(path, asyncLoad);
}

function loadJS(path: string, asyncLoad=true) {
  const promisse = new Promise((resolve) => {
    const script: any = document.createElement("script");

    script.onload = script.onreadystatechange = function () {
      if (modules[path].status != "loading") {
        return;
      }

      script.onload = script.onreadystatechange = null;

      modules[path] = {
        status: "success",
        promisse: null,
      };

      resolve(true);
    };

    script.onerror = () => {
      modules[path] = {
        status: "error",
        promisse: null,
      };

      resolve(false);
    };

    script.src = path;
    //script.setAttribute("defer", "");
    if (asyncLoad) {
      script.setAttribute("async", "");
    }

    document.head.insertBefore(script, document.head.lastChild);
  });

  modules[path].promisse = promisse;
  return promisse;
}

function loadCSS(path: string) {
  const promisse = new Promise((resolve) => {
    const style: any = document.createElement("link");

    style.setAttribute("rel", "stylesheet");
    style.setAttribute("type", "text/css");
    style.setAttribute("href", path);

    style.onload = style.onreadystatechange = () => {
      if (modules[path].status != "loading") {
        return;
      }

      style.onload = style.onreadystatechange = null;
      modules[path].status = "success";
      resolve(true);
    };

    style.onerror = () => {
      modules[path].status = "error";
      resolve(false);
    };

    document.head.insertBefore(style, document.head.lastChild);
  });

  modules[path].promisse = promisse;
  return promisse;
}