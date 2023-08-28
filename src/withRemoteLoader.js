import React, {forwardRef} from "react";
import useLoader from './useLoader';
import {global} from "./preset";
import merge from "lodash/merge";

const withRemoteLoader = (WrappedComponent) => {
    return forwardRef(({modules, remoteError, onLoadComplete, fallback, ...props}, ref) => {
        const {loading, error, remoteModules} = useLoader({modules, onLoadComplete});
        if (loading) {
            return fallback || global.fallback;
        }
        if (error) {
            return remoteError || global.error;
        }
        return <WrappedComponent {...props} ref={ref} remoteModules={remoteModules}/>;
    });
};

export const createWithRemoteLoader = (params) => (WrappedComponent) => {
    const RemoteComponent = withRemoteLoader(WrappedComponent);
    return forwardRef((props, ref) => <RemoteComponent {...merge({}, params, props)} ref={ref}/>);
};

export default withRemoteLoader;
