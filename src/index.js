import preset, { global } from "./preset";
import React, { useMemo } from "react";
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
    module: propsModule,
    remoteLoader,
    fallback,
    remoteError,
    ...others
  } = props;

  const { remote, url, module: loaderModule } = Object.assign({}, { remote: global.remote, url: global.url }, remoteLoader);

  const module = loaderModule || propsModule;

  const Component = useMemo(() => {
    if (!remote || !url || !module) {
      return () => {
        return remoteError || global.error;
      };
    }

    return React.lazy(loadModule({
      remote, module, url
    }));
  }, [remote, module, url]);

  return (
    <React.Suspense fallback={fallback || global.fallback}>
      <Component {...others} />
    </React.Suspense>
  );
};

export default RemoteLoader;

export { preset };
