import {global} from './preset';
import parseToken from './parseToken';
import ensureSlash from '@kne/ensure-slash'
import {loadComponent} from "./loadComponent";
import getStaticPath from './getStaticPath';
import get from 'lodash/get';

const formatRemote = (remote) => {
    return remote.replace(/[-/.@]/g, '_');
};

const loadModule = (token) => {
    const remotes = global.remotes;
    const remoteEntryFileName = global.remoteEntryFileName;
    const tokenObject = parseToken(token);

    const {url, remote} = ((tokenObject, remotes) => {
        const getStaticPathWithTpl = (options) => getStaticPath(Object.assign({}, options, {
            tpl: get(remotes, `[${tokenObject.remote || 'default'}].tpl`)
        }));
        if (tokenObject.url && tokenObject.remote && tokenObject.version) {
            return {
                url: getStaticPathWithTpl({url: tokenObject.url, remote: tokenObject.remote,version:tokenObject.version}),
                remote: tokenObject.remote + '_' + tokenObject.version
            }
        }
        if (tokenObject.url && tokenObject.remote) {
            return {
                url: getStaticPathWithTpl({url: tokenObject.url, remote: tokenObject.remote}),
                remote: tokenObject.remote
            }
        }
        if (tokenObject.remote && remotes[tokenObject.remote] && tokenObject.version) {
            return {
                url: getStaticPathWithTpl({
                    url: remotes[tokenObject.remote].url,
                    remote: remotes[tokenObject.remote].remote,
                    version: tokenObject.version
                }), remote: remotes[tokenObject.remote].remote + '_' + tokenObject.version
            };
        }

        if (tokenObject.remote && remotes[tokenObject.remote] && remotes[tokenObject.remote].defaultVersion) {
            return {
                url: getStaticPathWithTpl({
                    url: remotes[tokenObject.remote].url,
                    remote: remotes[tokenObject.remote].remote,
                    version: remotes[tokenObject.remote].defaultVersion
                }), remote: remotes[tokenObject.remote].remote + '_' + remotes[tokenObject.remote].defaultVersion
            };
        }

        if (tokenObject.remote && remotes[tokenObject.remote]) {
            return {
                url: getStaticPathWithTpl({
                    url: remotes[tokenObject.remote].url, remote: remotes[tokenObject.remote].remote
                }), remote: remotes[tokenObject.remote].remote
            };
        }

        if (remotes['default'].defaultVersion) {
            return {
                url: getStaticPathWithTpl({
                    url: remotes['default'].url,
                    remote: remotes['default'].remote,
                    version: remotes['default'].defaultVersion
                }), remote: remotes['default'].remote + '_' + remotes['default'].defaultVersion
            };
        }

        return {
            url: getStaticPathWithTpl({url: remotes['default'].url, remote: remotes['default'].remote}),
            remote: remotes['default'].remote
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

export default loadModule;
