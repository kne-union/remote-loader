/*eslint-disable*/
/**
 * The Right Way to Load Dynamic Remotes
 * @author ScriptedAlchemy <zackary.l.jackson@gmail.com>
 * @see {@link https://gist.github.com/ScriptedAlchemy/3a24008ef60adc47fad1af7d3299a063}
 *
 * @param {string} remote - the remote global name
 * @param {object | string} shareScope - the shareScope Object OR scope key
 * @param {string} remoteFallbackUrl - fallback url for remote module
 * @returns {Promise<object>} - Federated Module Container
 */
export const getOrLoadRemote = (remote, shareScope, remoteFallbackUrl = undefined) => new Promise((resolve, reject) => {
    // check if remote exists on window
    if (!window[remote]) {
        // search dom to see if remote tag exists, but might still be loading (async)
        const existingRemote = document.querySelector(`[data-webpack="${remote}"]`);
        // when remote is loaded..
        const onload = async (script) => {
            script.setAttribute('data-status', 'success');
            // check if it was initialized
            if (!window[remote].__initialized) {
                if (typeof __webpack_share_scopes__ !== 'undefined') {
                    // otherwise, init share scope as usual
                    await window[remote].init(__webpack_share_scopes__[shareScope]);
                }
                // mark remote as initialized
                window[remote].__initialized = true;
            }
            // resolve promise so marking remote as loaded
            resolve();
        };

        const onerror = (e, script) => {
            script.parentNode.removeChild(script);
            reject(e.message);
        };
        if (existingRemote) {
            // if existing remote but not loaded, hook into its onload and wait for it to be ready
            //existingRemote.onload = onload;
            if (existingRemote.getAttribute('data-status') === 'success') {
                onload(existingRemote);
                return;
            }
            existingRemote.addEventListener('load', () => {
                onload(existingRemote);
            });
            //existingRemote.onerror = reject;
            existingRemote.addEventListener('error', (e) => {
                onerror(e, existingRemote);
            });
            // check if remote fallback exists as param passed to function
            // TODO: should scan public config for a matching key if no override exists
        } else if (remoteFallbackUrl) {
            // inject remote if a fallback exists and call the same onload function
            var d = document, script = d.createElement('script');
            script.type = 'text/javascript';
            // mark as data-webpack so runtime can track it internally
            script.setAttribute('data-webpack', `${remote}`);
            script.async = true;
            //script.onerror = reject;
            script.addEventListener('error', (e) => {
                onerror(e, script);
            });
            //script.onload = onload;
            script.addEventListener('load', () => {
                onload(script);
            });
            script.src = remoteFallbackUrl;
            d.getElementsByTagName('head')[0].appendChild(script);
        } else {
            // no remote and no fallback exist, reject
            reject(`Cannot Find Remote ${remote} to inject`);
        }
    } else {
        // remote already instantiated, resolve
        resolve();
    }
});
