import useRefCallback from "@kne/use-ref-callback";
import loadModule from './loadModule';
import {useEffect, useRef, useState} from "react";
import isEqual from "lodash/isEqual";

const cache = new Map();

const useLoader = ({modules, onLoadComplete}) => {
    const [loading, setLoading] = useState(!modules.every((token) => cache.has(token)));
    const [error, setError] = useState(false);
    const loadComplete = useRefCallback(onLoadComplete);
    const [remotes, setRemotes] = useState(() => {
        if (loading) {
            return [];
        }
        return modules.map((token) => cache.get(token));
    });

    const remotesRef = useRef(remotes);
    remotesRef.current = remotes;

    useEffect(() => {
        Promise.all(modules.map(async (token) => {
            if (cache.has(token)) {
                return cache.get(token);
            }
            const module = await loadModule(token);
            cache.set(token, module);
            return module;
        })).then((modules) => {
            loadComplete && loadComplete(modules);
            setLoading(false);
            if (!isEqual(remotesRef.current, modules)) {
                setRemotes(modules);
            }
            return modules;
        }, (e) => {
            console.error(e);
            setError(true);
        });
    }, [modules]);
    return {
        loading, error, remoteModules: remotes
    };
};

export default useLoader;
