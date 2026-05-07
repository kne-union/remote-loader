import {getOrLoadRemote} from './getOrLoadRemote';

export const loadComponent = (remote, sharedScope, module, url, version) => {
    return async () => {
        // Add version to URL for cache busting (only when version exists)
        const urlWithVersion = version ? 
            (url.includes('?') ? `${url}&v=${version}` : `${url}?v=${version}`) : 
            url;
            
        await getOrLoadRemote(remote, sharedScope, urlWithVersion);
        const container = window[remote];

        if (!container || typeof container.get !== 'function') {
            throw new Error(`[remote-loader] Remote container [${remote}] is invalid`);
        }

        const factory = await container.get(module);
        if (typeof factory !== 'function') {
            throw new Error(`[remote-loader] Module factory [${module}] from [${remote}] is invalid`);
        }

        return factory();
    };
};
