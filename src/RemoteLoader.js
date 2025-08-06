import React, {useMemo, forwardRef} from "react";
import withRemoteLoader from "./withRemoteLoader";

const RemoteLoaders = withRemoteLoader(forwardRef(({remoteModules, ...others}, ref) => {
    const [Component] = remoteModules;
    return <Component {...others} ref={ref}/>;
}));

const RemoteLoader = forwardRef(({module, ...props}, ref) => {
    const modules = useMemo(() => {
        return [module];
    }, [module]);
    return <RemoteLoaders {...props} modules={modules} key=={module} ref={ref}/>
});

export default RemoteLoader;

