import useRefCallback from "@kne/use-ref-callback";
import loadModule from './loadModule';
import LRUCache from './LRUCache';
import {useEffect, useRef, useState, useCallback, useMemo} from "react";

const cache = new LRUCache(500);

export {cache};

const stableStringify = (value) => {
    if (value === null || typeof value !== 'object') {
        if (typeof value === 'function') {
            return `__function__:${value.name || 'anonymous'}`;
        }
        return JSON.stringify(value);
    }

    if (Array.isArray(value)) {
        return `[${value.map((item) => stableStringify(item)).join(',')}]`;
    }

    const keys = Object.keys(value).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
};

const getCacheKey = (token, options) => {
    return `${token}::${stableStringify(options || {})}`;
};

const useLoader = ({modules = [], onLoadComplete, options = {}}) => {
    const loadComplete = useRefCallback(onLoadComplete);
    const loadCompleteRef = useRef(loadComplete);
    const requestIdRef = useRef(0);

    loadCompleteRef.current = loadComplete;

    const optionsKey = useMemo(() => stableStringify(options || {}), [options]);

    const [loading, setLoading] = useState(() => {
        const allCached = modules.every((token) => cache.has(getCacheKey(token, options)));
        return !allCached;
    });
    const [error, setError] = useState(false);
    const [remotes, setRemotes] = useState(() => {
        return modules.every((token) => cache.has(getCacheKey(token, options))) ? modules.map((token) => cache.get(getCacheKey(token, options))) : [];
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
        const requestId = ++requestIdRef.current;
        const moduleCacheKeys = modules.map((token) => getCacheKey(token, options));
        const cachedRemotes = moduleCacheKeys.map((key) => cache.get(key));
        const allCached = cachedRemotes.every((item) => item !== undefined);

        setError(false);
        if (allCached) {
            updateRemotes(cachedRemotes);
            setLoading(false);
            return;
        }

        setLoading(true);

        Promise.all(modules.map(async (token, index) => {
            const cacheKey = moduleCacheKeys[index];
            if (cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }
            const {default: defaultModal} = await loadModule(token, options);
            if (!defaultModal) {
                throw new Error(`[${token}] load failed!`);
            }
            typeof defaultModal.moduleMounted === 'function' && await defaultModal.moduleMounted({
                token, module: defaultModal
            });
            cache.set(cacheKey, defaultModal);
            return defaultModal;
        })).then(async (loadedModules) => {
            if (requestId !== requestIdRef.current) {
                return;
            }
            loadCompleteRef.current && await loadCompleteRef.current(loadedModules);
            updateRemotes(loadedModules);
            setLoading(false);
            return loadedModules;
        }, (e) => {
            if (requestId !== requestIdRef.current) {
                return;
            }
            console.error(e);
            setError(true);
            setLoading(false);
        });
    }, [modules, optionsKey, updateRemotes]);
    return {
        loading, error, remoteModules: remotes
    };
};

export default useLoader;
