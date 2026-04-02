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
        const resolveOptions = (options) => {
            const resolvedRemote = get(targetOptions, 'remote', options.remote);
            const resolvedVersion = get(targetOptions, 'version', options.version);
            return {
                url: get(targetOptions, 'url', options.url),
                remote: resolvedRemote,
                version: resolvedVersion
            };
        };

        const getRemoteWithVersion = (options) => {
            const resolved = resolveOptions(options);
            return resolved.version ? `${resolved.remote}_${resolved.version}` : resolved.remote;
        };

        const getStaticPathWithTpl = (options) => {
            const resolved = resolveOptions(options);
            return getStaticPath(Object.assign({}, resolved, {
                tpl: get(targetOptions, 'tpl', get(remotes, `[${resolved.remote || 'default'}].tpl`))
            }));
        };

        if (tokenObject.url && tokenObject.remote && tokenObject.version) {
            const options = {url: tokenObject.url, remote: tokenObject.remote, version: tokenObject.version};
            return {
                url: getStaticPathWithTpl(options), remote: getRemoteWithVersion(options)
            }
        }
        if (tokenObject.url && tokenObject.remote) {
            const options = {url: tokenObject.url, remote: tokenObject.remote};
            return {
                url: getStaticPathWithTpl(options),
                remote: getRemoteWithVersion(options)
            }
        }
        if (tokenObject.remote && remotes[tokenObject.remote] && tokenObject.version) {
            const options = {
                url: remotes[tokenObject.remote].url,
                remote: remotes[tokenObject.remote].remote,
                version: tokenObject.version
            };
            return {
                url: getStaticPathWithTpl(options), remote: getRemoteWithVersion(options)
            };
        }

        if (tokenObject.remote && remotes[tokenObject.remote] && remotes[tokenObject.remote].defaultVersion) {
            const options = {
                url: remotes[tokenObject.remote].url,
                remote: remotes[tokenObject.remote].remote,
                version: remotes[tokenObject.remote].defaultVersion
            };
            return {
                url: getStaticPathWithTpl(options), remote: getRemoteWithVersion(options)
            };
        }

        if (tokenObject.remote && remotes[tokenObject.remote]) {
            const options = {
                url: remotes[tokenObject.remote].url, remote: remotes[tokenObject.remote].remote
            };
            return {
                url: getStaticPathWithTpl(options), remote: getRemoteWithVersion(options)
            };
        }

        if (remotes['default'].defaultVersion) {
            const options = {
                url: remotes['default'].url,
                remote: remotes['default'].remote,
                version: remotes['default'].defaultVersion
            };
            return {
                url: getStaticPathWithTpl(options), remote: getRemoteWithVersion(options)
            };
        }

        const options = {url: remotes['default'].url, remote: remotes['default'].remote};
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
