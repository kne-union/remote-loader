import {global} from './preset';

export const remoteConfigCache = new Map();

export const mergeRemotes = (baseRemotes, targetRemotes) => {
    const remotes = Object.assign({}, baseRemotes);
    Object.keys(targetRemotes || {}).forEach((key) => {
        remotes[key] = Object.assign({}, remotes[key], targetRemotes[key]);
    });
    return remotes;
};

const getLocationHref = () => {
    return typeof window !== 'undefined' && window.location ? window.location.href : undefined;
};

const getConfigBaseUrl = (configUrl) => {
    const target = new URL(configUrl, getLocationHref());
    target.search = '';
    target.hash = '';
    return target.href.replace(/\/[^/]*$/, '');
};

const fetchRemoteConfig = (configUrl) => {
    if (!remoteConfigCache.has(configUrl)) {
        const request = fetch(configUrl).then((response) => {
            if (!response.ok) {
                throw new Error(`status ${response.status}`);
            }
            return response.json();
        });
        remoteConfigCache.set(configUrl, request);
        request.catch(() => {
            if (remoteConfigCache.get(configUrl) === request) {
                remoteConfigCache.delete(configUrl);
            }
        });
    }
    return remoteConfigCache.get(configUrl);
};

const applyRemoteConfig = (config, data, configUrl) => {
    const baseUrl = getConfigBaseUrl(configUrl);
    const url = data.url ? new URL(data.url, baseUrl + '/').href.replace(/\/+$/, '') : baseUrl;
    return Object.assign({}, config, {
        url,
        tpl: data.tpl || config.tpl || '{{url}}',
        defaultVersion: data.version || config.defaultVersion
    });
};

const resolveRemoteConfig = async (name, options = {}) => {
    const targetConfig = options.remotes && options.remotes[name];
    const config = mergeRemotes(global.remotes, options.remotes)[name];
    if (!config || !config.configUrl) {
        return config;
    }

    let data;
    try {
        data = await fetchRemoteConfig(config.configUrl);
    } catch (e) {
        throw new Error(`[remote-loader] Remote config [${name}] load failed: ${config.configUrl}`);
    }

    const resolved = applyRemoteConfig(config, data || {}, config.configUrl);
    const globalConfig = global.remotes[name];
    const isGlobalConfigUrl = !(targetConfig && targetConfig.configUrl) && globalConfig && globalConfig.configUrl === config.configUrl;
    if (isGlobalConfigUrl) {
        global.remotes[name] = Object.assign({}, globalConfig, {
            url: resolved.url, tpl: resolved.tpl, defaultVersion: resolved.defaultVersion
        });
    }
    return resolved;
};

export default resolveRemoteConfig;
