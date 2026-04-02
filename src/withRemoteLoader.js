import React, {forwardRef, memo} from "react";
import useLoader from './useLoader';
import {global} from "./preset";
import merge from "lodash/merge";

const withRemoteLoader = (WrappedComponent) => {
    const RemoteComponent = forwardRef(({
                                            modules = [],
                                            remoteError,
                                            onLoadComplete,
                                            fallback,
                                            options,
                                            ...props
                                        }, ref) => {
        const {loading, error, remoteModules} = useLoader({modules, onLoadComplete, options});
        if (loading) {
            return fallback || global.fallback;
        }
        if (error) {
            return remoteError || global.error;
        }
        return <WrappedComponent {...props} ref={ref} remoteModules={remoteModules}/>;
    });
    RemoteComponent.displayName = `withRemoteLoader(${WrappedComponent.displayName || WrappedComponent.name})`;
    return memo(RemoteComponent);
};

export const createWithRemoteLoader = (params) => (WrappedComponent) => {
    const RemoteComponent = withRemoteLoader(WrappedComponent);
    const CreateWithRemoteLoaderComponent = memo(forwardRef((props, ref) => {
        const mergedProps = merge({}, params, props);
        return <RemoteComponent {...mergedProps} ref={ref}/>;
    }));
    CreateWithRemoteLoaderComponent.displayName = `createWithRemoteLoader(${WrappedComponent.displayName || WrappedComponent.name})`;
    return CreateWithRemoteLoaderComponent;
};

export default withRemoteLoader;
