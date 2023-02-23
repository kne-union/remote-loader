import React, {forwardRef, useEffect, useState} from "react";
import useLoader from './useLoader';
import {global} from "./preset";
import {merge} from "lodash";

const withRemoteLoader = (WrappedComponent) => {
    return forwardRef(({modules, remoteError, onLoadComplete, fallback, ...props}, ref) => {
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);
        const [remotes, setRemotes] = useState([]);
        const loaderPromise = useLoader({modules, onLoadComplete});
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
        return <WrappedComponent {...props} ref={ref} remoteModules={remotes}/>;
    });
};

export const createWithRemoteLoader = (params) => (WrappedComponent) => {
    const RemoteComponent = withRemoteLoader(WrappedComponent);
    return forwardRef((props, ref) => <RemoteComponent {...merge({}, params, props)} ref={ref}/>);
};

export default withRemoteLoader;