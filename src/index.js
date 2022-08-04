import preset, { global } from "./preset";
import React from "react";
import { loadComponent } from "./loadComponent";

const parseModule = (module) => {
  const [modulePath, moduleName] = module.split("@");
  return {
    modulePath: /^\.\//.test(modulePath) ? modulePath : ("./" + modulePath),
    moduleName: moduleName || "default"
  };
};

export const loadModule = ({ remote, module, url }) => {
  const { modulePath, moduleName } = parseModule(module);
  return () => loadComponent(remote, "default", modulePath, url)().then((module) => {
    return { default: module[moduleName] };
  });
};


const RemoteLoader = (props) => {
  const {
    loader,
    fallback,
    error,
    ...others
  } = props;

  const { remote, url, module } = Object.assign({}, { remote: global.remote, url: global.url }, loader);

  if (!loader || !remote || !url || !module) {
    return error || global.error;
  }

  const Component = React.lazy(loadModule({
    remote, module, url
  }));
  return (
    <React.Suspense fallback={fallback || global.fallback}>
      <Component {...others} />
    </React.Suspense>
  );
};

export default RemoteLoader;

export { preset };
