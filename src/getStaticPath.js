import template from 'lodash/template';
import ensureSlash from '@kne/ensure-slash';

const getStaticPath = ({url, remote, version, tpl}) => {
    const compiled = template(tpl || '{{url}}/{{remote}}/{{version}}', {interpolate: /{{([\s\S]+?)}}/g});
    return ensureSlash(compiled({url: ensureSlash(url || ''), remote: remote || '', version: version || ''}));
};

export default getStaticPath;
