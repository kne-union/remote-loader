import {global} from './preset';
import parseToken from './parseToken';
import ensureSlash from '@kne/ensure-slash'
import {loadComponent} from "./loadComponent";

const loadModule = (token) => {
    const remotes = global.remotes;
    const remoteEntryFileName = global.remoteEntryFileName;
    const tokenObject = parseToken(token);

    const {url, remote} = ((tokenObject, remotes) => {
        if (tokenObject.url && tokenObject.remote) {
            return {url: tokenObject.url, remote: tokenObject.remote}
        }
        if (tokenObject.remote && remotes[tokenObject.remote] && tokenObject.version) {
            return {
                url: ensureSlash(remotes[tokenObject.remote].url) + '/' + remotes[tokenObject.remote].remote + '/' + tokenObject.version,
                remote: remotes[tokenObject.remote].remote
            };
        }

        if (tokenObject.remote && remotes[tokenObject.remote] && remotes[tokenObject.remote].defaultVersion) {
            return {
                url: ensureSlash(remotes[tokenObject.remote].url) + '/' + remotes[tokenObject.remote].remote + '/' + remotes[tokenObject.remote].defaultVersion,
                remote: remotes[tokenObject.remote].remote
            };
        }

        if (tokenObject.remote && remotes[tokenObject.remote]) {
            return {
                url: ensureSlash(remotes[tokenObject.remote].url) + '/' + remotes[tokenObject.remote].remote,
                remote: remotes[tokenObject.remote].remote
            };
        }

        if (remotes['default'].defaultVersion) {
            return {
                url: ensureSlash(remotes['default'].url) + '/' + remotes['default'].remote + '/' + remotes['default'].defaultVersion,
                remote: remotes['default'].remote
            };
        }

        return {
            url: ensureSlash(remotes['default'].url) + '/' + remotes['default'].remote,
            remote: remotes['default'].remote
        };
    })(tokenObject, remotes);
    return loadComponent(remote, "default", './' + tokenObject.module.moduleName, ensureSlash(url) + '/' + remoteEntryFileName)().then((module) => {
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