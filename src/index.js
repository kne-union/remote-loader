import preset, { global } from "./preset";
import React, { useMemo, forwardRef, useEffect, useState } from "react";
import { loadComponent } from "./loadComponent";
import useRefCallback from "@kne/use-ref-callback";
import { merge } from "lodash";

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

export const loadModule = ({ remote, module, url, onLoadComplete }) => {
  const { modulePath, moduleName, subModuleName } = parseModule(module);
  return () => loadComponent(remote, "default", modulePath, url)().then((module) => {
    const Component = subModuleName ? module[moduleName][subModuleName] : module[moduleName];
    return {
      default: forwardRef((props, ref) => {
        useEffect(() => {
          onLoadComplete && onLoadComplete();
        }, []);
        return <Component ref={ref} {...props} />;
      })
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
      remote, module, url, onLoadComplete: loadComplete
    })()));

  }, [remote, loaderModule, modules, url, loadComplete]);
};


const RemoteLoader = forwardRef((props, ref) => {
  const {
    module: propsModule,
    remoteLoader,
    fallback,
    remoteError,
    onLoadComplete,
    ...others
  } = props;

  const propsModuleList = useMemo(() => [propsModule], [propsModule]);

  const loaderPromise = useLoader({ modules: propsModuleList, remoteLoader, onLoadComplete });

  const Component = useMemo(() => {
    return React.lazy(() => loaderPromise.then((componentList) => {
      if (!componentList[0]) {
        return { default: () => (remoteError || global.error) };
      }
      return componentList[0];
    }));
  }, [loaderPromise]);

  return (
    <React.Suspense fallback={fallback || global.fallback}>
      <Component {...others} ref={ref} />
    </React.Suspense>
  );
});

export default RemoteLoader;

export const withRemoteLoader = (WrappedComponent) => {
  return forwardRef(({ modules, remoteLoader, remoteError, onLoadComplete, fallback, ...props }, ref) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [remotes, setRemotes] = useState([]);
    const loaderPromise = useLoader({ modules, remoteLoader, remoteError, onLoadComplete });
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

export { preset };
