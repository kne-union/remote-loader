import {global} from "./preset";
import ensureSlash from '@kne/ensure-slash';

const getPublicPath = (name, options) => {
    const {remotes, version} = Object.assign({}, {remotes: global.remotes}, options)
    const config = name && remotes[name] || remotes['default'];
    const currentVision = version || config.defaultVersion;
    return `${ensureSlash(config.url)}/${ensureSlash(config.remote)}${currentVision ? `/${currentVision}` : ''}`;
};

export default getPublicPath;
