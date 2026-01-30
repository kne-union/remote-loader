import React, {forwardRef, memo} from "react";
import withRemoteLoader from "./withRemoteLoader";

const InnerRemoteLoaders = forwardRef(({remoteModules, ...others}, ref) => {
    const [Component] = remoteModules;
    return <Component {...others} ref={ref}/>;
});

const RemoteLoaders = withRemoteLoader(InnerRemoteLoaders);

const RemoteLoader = memo(forwardRef(({module, ...props}, ref) => {
    const modules = [module];
    return <RemoteLoaders {...props} modules={modules} ref={ref}/>;
}));

export default RemoteLoader;

