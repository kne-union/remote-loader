import preset, { global } from "./preset";
import React, { useMemo, forwardRef, useEffect, useState, useRef } from "react";
import { loadComponent } from "./loadComponent";
import useRefCallback from "@kne/use-ref-callback";
import { merge, constant } from "lodash";

const parseModule = (module) => {
  const [pathStr, nameStr] = module.split("@");
  let moduleName = "default", subModuleName, modulePath;
  if (nameStr) {
    modulePath = pathStr;
    [moduleName, subModuleName] = nameStr.split(".");
  } else {
    [modulePath, subModuleName] = pathStr.split(".");
  }
  return {
    modulePath: /^\.\//.test(modulePath) ? modulePath : ("./" + modulePath),
    moduleName: moduleName || "default",
    subModuleName
  };
};

export const loadModule = ({ remote, module, url }) => {
  const { modulePath, moduleName, subModuleName } = parseModule(module);
  return () => loadComponent(remote, "default", modulePath, url)().then((module) => {
    const Component = subModuleName ? module[moduleName][subModuleName] : module[moduleName];
    return {
      default: Component
    };
  });
};

const useLoader = ({ modules, remoteLoader, onLoadComplete }) => {
  const loadComplete = useRefCallback(onLoadComplete);
  const { remote, url, module: loaderModule } = Object.assign({}, {
    remote: global.remote,
    url: global.url
  }, remoteLoader);

  return useMemo(() => {
    const moduleList = loaderModule ? [loaderModule] : modules;
    if (!remote || !url || !moduleList || moduleList.length === 0) {
      return Promise.resolve([]);
    }

    return Promise.all(moduleList.map((module) => loadModule({
      remote, module, url
    })())).then((modules) => {
      onLoadComplete && onLoadComplete(modules);
      return modules;
    });

  }, [remote, loaderModule, modules, url, loadComplete]);
};

export const withRemoteLoader = (WrappedComponent) => {
  return forwardRef(({ modules, module, remoteLoader, remoteError, onLoadComplete, fallback, ...props }, ref) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [remotes, setRemotes] = useState([]);
    const moduleMemo = useMemo(() => {
      return [module];
    }, [module]);
    const loaderPromise = useLoader({ modules: modules || moduleMemo, remoteLoader, remoteError, onLoadComplete });
    useEffect(() => {
      loaderPromise.then((modules) => {
        setRemotes(modules.map((module) => {
          return module.default;
        }));
      }, () => {
        setError(true);
      }).then(() => {
        setLoading(false);
      });
    }, [loaderPromise]);
    if (loading) {
      return fallback || global.fallback;
    }
    if (error) {
      return remoteError || global.error;
    }
    return <WrappedComponent {...props} ref={ref} remoteModules={remotes} />;
  });
};

export const createWithRemoteLoader = (params) => (WrappedComponent) => {
  const RemoteComponent = withRemoteLoader(WrappedComponent);
  return forwardRef((props, ref) => <RemoteComponent {...merge({}, params, props)} ref={ref} />);
};

const RemoteLoader = withRemoteLoader(forwardRef(({ remoteModules, ...others }, ref) => {
  const [Component] = remoteModules;
  return <Component {...others} ref={ref} />;
}));

export default RemoteLoader;

export { preset };
