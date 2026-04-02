import useRefCallback from "@kne/use-ref-callback";
import loadModule from './loadModule';
import LRUCache from './LRUCache';
import {useEffect, useRef, useState, useCallback} from "react";

const cache = new LRUCache(500);

// 导出 cache 实例以便外部可以访问和清理
export {cache};

const useLoader = ({modules = [], onLoadComplete, options = {}}) => {
    const loadComplete = useRefCallback(onLoadComplete);
    const loadCompleteRef = useRef(loadComplete);

    loadCompleteRef.current = loadComplete;

    const [loading, setLoading] = useState(() => {
        const allCached = modules.every((token) => cache.has(token));
        return !allCached;
    });
    const [error, setError] = useState(false);
    const [remotes, setRemotes] = useState(() => {
        return modules.every((token) => cache.has(token)) ? modules.map((token) => cache.get(token)) : [];
    });

    const remotesRef = useRef(remotes);

    const updateRemotes = useCallback((newRemotes) => {
        const isEqual = remotesRef.current.length === newRemotes.length && remotesRef.current.every((item, index) => item === newRemotes[index]);
        if (!isEqual) {
            remotesRef.current = newRemotes;
            setRemotes(newRemotes);
        }
    }, []);

    useEffect(() => {
        Promise.all(modules.map(async (token) => {
            if (cache.has(token)) {
                return cache.get(token);
            }
            const {default: defaultModal} = await loadModule(token, options);
            if (!defaultModal) {
                throw new Error(`[${token}] load failed!`);
            }
            typeof defaultModal.moduleMounted === 'function' && await defaultModal.moduleMounted({
                token, module: defaultModal
            });
            cache.set(token, defaultModal);
            return defaultModal;
        })).then(async (loadedModules) => {
            loadCompleteRef.current && await loadCompleteRef.current(loadedModules);
            updateRemotes(loadedModules);
            setLoading(false);
            return loadedModules;
        }, (e) => {
            console.error(e);
            setError(true);
            setLoading(false);
        });
    }, [modules, updateRemotes]);
    return {
        loading, error, remoteModules: remotes
    };
};

export default useLoader;
