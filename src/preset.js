export const global = {
    remotes: {}, remoteEntryFileName: 'remoteEntry.js', error: null, fallback: null
};

export const preset = (options) => {
    return Object.assign(global, options);
};

export default preset;
