import useRefCallback from "@kne/use-ref-callback";
import loadModule from './loadModule';
import {useRef, useMemo} from "react";

const useLoader = ({modules, onLoadComplete}) => {
    const loadedModulesRef = useRef({});
    const loadComplete = useRefCallback(onLoadComplete);
    return useMemo(() => Promise.all(modules.map(async (token) => {
        if (!loadedModulesRef.current[token]) {
            loadedModulesRef.current[token] = await loadModule(token);
        }
        return loadedModulesRef.current[token];
    })).then((modules) => {
        loadComplete && loadComplete(modules);
        return modules;
    }), [modules]);
};

export default useLoader;