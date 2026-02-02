import React, {forwardRef, memo, useMemo} from "react";
import withRemoteLoader from "./withRemoteLoader";

const InnerRemoteLoaders = memo(forwardRef(({remoteModules, ...others}, ref) => {
    const [Component] = remoteModules;
    return <Component {...others} ref={ref}/>;
}));
InnerRemoteLoaders.displayName = 'InnerRemoteLoaders';

const RemoteLoaders = withRemoteLoader(InnerRemoteLoaders);

const RemoteLoader = memo(forwardRef(({module, ...props}, ref) => {
    const modules = useMemo(() => [module], [module]);
    return <RemoteLoaders {...props} modules={modules} ref={ref}/>;
}));
RemoteLoader.displayName = 'RemoteLoader';

export default RemoteLoader;

