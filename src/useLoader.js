import useRefCallback from "@kne/use-ref-callback";
import loadModule from './loadModule';
import {useEffect, useRef, useState, useCallback} from "react";
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

    const updateRemotes = useCallback((newRemotes) => {
        if (!isEqual(remotesRef.current, newRemotes)) {
            remotesRef.current = newRemotes;
            setRemotes(newRemotes);
        }
    }, []);

    useEffect(() => {
        Promise.all(modules.map(async (token) => {
            if (cache.has(token)) {
                return cache.get(token);
            }
            const {default: defaultModal} = await loadModule(token);
            typeof defaultModal.moduleMounted === 'function' && await defaultModal.moduleMounted({
                token, module: defaultModal
            });
            cache.set(token, defaultModal);
            return defaultModal;
        })).then(async (loadedModules) => {
            loadComplete && await loadComplete(loadedModules);
            updateRemotes(loadedModules);
            setLoading(false);
            return loadedModules;
        }, (e) => {
            console.error(e.stack);
            setError(true);
        });
    }, [modules, loadComplete, updateRemotes]);
    return {
        loading, error, remoteModules: remotes
    };
};

export default useLoader;
