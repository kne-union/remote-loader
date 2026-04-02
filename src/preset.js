import merge from 'lodash/merge';
export const global = {
    remotes: {}, remoteEntryFileName: 'remoteEntry.js', error: null, fallback: null
};

export const preset = (options) => {
    return merge(global, options);
};

export default preset;
