import {getOrLoadRemote} from './getOrLoadRemote';

export const loadComponent = (remote, sharedScope, module, url) => {
    return async () => {
        await getOrLoadRemote(remote, sharedScope, url);
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
