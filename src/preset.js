export const global = {
  remote: "", url: "", error: null, fallback: null
};

export const preset = (options) => {
  return Object.assign(global, options);
};

export default preset;
