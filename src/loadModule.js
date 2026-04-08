import {global} from './preset';
import parseToken from './parseToken';
import ensureSlash from '@kne/ensure-slash'
import {loadComponent} from "./loadComponent";
import getStaticPath from './getStaticPath';
import get from 'lodash/get';

const formatRemote = (remote) => {
    return remote.replace(/[-/.@]/g, '_');
};

const loadModule = (token, targetOptions = {}) => {
    const remotes = get(targetOptions, 'remotes', global.remotes);
    const remoteEntryFileName = get(targetOptions, 'remoteEntryFileName', global.remoteEntryFileName);
    const tokenObject = parseToken(token);

    const {url, remote} = ((tokenObject, remotes) => {
        const defaultConfig = remotes['default'] || {};
        const remoteConfig = tokenObject.remote ? remotes[tokenObject.remote] : null;

        const resolveOptions = (options) => {
            const resolvedRemote = get(targetOptions, 'remote', options.remote);
            const resolvedVersion = get(targetOptions, 'version', options.version);
            return {
                url: get(targetOptions, 'url', options.url),
                remote: resolvedRemote,
                version: resolvedVersion,
                tpl: get(targetOptions, 'tpl', options.tpl)
            };
        };

        const getRemoteWithVersion = (options) => {
            const resolved = resolveOptions(options);
            return resolved.version ? `${resolved.remote}_${resolved.version}` : resolved.remote;
        };

        const getStaticPathWithTpl = (options) => {
            return getStaticPath(resolveOptions(options));
        };

        const getBaseOptions = () => {
            if (tokenObject.url && tokenObject.remote && tokenObject.version) {
                return {url: tokenObject.url, remote: tokenObject.remote, version: tokenObject.version};
            }

            if (tokenObject.url && tokenObject.remote) {
                return {url: tokenObject.url, remote: tokenObject.remote};
            }

            if (remoteConfig && tokenObject.version) {
                return {
                    url: remoteConfig.url,
                    remote: remoteConfig.remote,
                    version: tokenObject.version,
                    tpl: remoteConfig.tpl
                };
            }

            if (remoteConfig && remoteConfig.defaultVersion) {
                return {
                    url: remoteConfig.url,
                    remote: remoteConfig.remote,
                    version: remoteConfig.defaultVersion,
                    tpl: remoteConfig.tpl
                };
            }

            if (remoteConfig) {
                return {
                    url: remoteConfig.url,
                    remote: remoteConfig.remote,
                    tpl: remoteConfig.tpl
                };
            }

            if (tokenObject.remote && tokenObject.version) {
                return {
                    url: defaultConfig.url,
                    remote: tokenObject.remote,
                    version: tokenObject.version,
                    tpl: defaultConfig.tpl
                };
            }

            if (tokenObject.remote) {
                return {
                    url: defaultConfig.url,
                    remote: tokenObject.remote,
                    version: defaultConfig.defaultVersion,
                    tpl: defaultConfig.tpl
                };
            }

            return {
                url: defaultConfig.url,
                remote: defaultConfig.remote,
                version: defaultConfig.defaultVersion,
                tpl: defaultConfig.tpl
            };
        };

        const options = getBaseOptions();
        return {
            url: getStaticPathWithTpl(options),
            remote: getRemoteWithVersion(options)
        };
    })(tokenObject, remotes);
    return loadComponent(formatRemote(remote), "default", './' + tokenObject.module.moduleName, ensureSlash(url) + '/' + remoteEntryFileName)().then((module) => {
        const Component = ((tokenModule, module) => {
            if (tokenModule.subModuleName && tokenModule.subModulePropName) {
                return module[tokenModule.subModuleName][tokenModule.subModulePropName];
            }
            if (tokenModule.subModuleName) {
                return module[tokenModule.subModuleName];
            }
            if (!tokenModule.subModuleName && tokenModule.modulePropName) {
                return module['default'][tokenModule.modulePropName];
            }
            return module['default'];
        })(tokenObject.module, module);
        return {
            default: Component
        };
    });
};

export const safeLoadModule = async (token) => {
    try {
        return await loadModule(token).then(({default: defaultModule}) => defaultModule);
    } catch (e) {
        console.error(e);
        return () => {
            return {};
        };
    }
};

export default loadModule;
