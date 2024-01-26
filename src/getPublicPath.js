import {global} from "./preset";
import getStaticPath from './getStaticPath';

const getPublicPath = (name, options) => {
    const {remotes, version} = Object.assign({}, {remotes: global.remotes}, options)
    const config = name && remotes[name] || remotes['default'];
    const currentVision = version || config.defaultVersion;
    return getStaticPath({
        url: config.url, remote: config.remote, version: currentVision, tpl: config.tpl
    });
};

export default getPublicPath;
