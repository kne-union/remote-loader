import {global} from "./preset";
import getStaticPath from './getStaticPath';

const getPublicPath = (name, options) => {
    const {remotes, version} = Object.assign({}, {remotes: global.remotes}, options);
    const config = (name && remotes[name]) || remotes['default'];

    if (!config || !config.url || !config.remote) {
        throw new Error(`[remote-loader] Remote config for [${name || 'default'}] is invalid`);
    }

    const currentVersion = version || config.defaultVersion;
    return getStaticPath({
        url: config.url, remote: config.remote, version: currentVersion, tpl: config.tpl
    });
};

export default getPublicPath;
