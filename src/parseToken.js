import ensureSlash from '@kne/ensure-slash'
// token: [模块地址/remote/version:]模块名[@子模块][.模块属性]

const parseByURL = (address) => {
    try {
        const parsed = new URL(address);
        const addressList = parsed.pathname.split('/').filter((name) => !!name);

        if (addressList.length === 1) {
            return {url: parsed.origin, remote: addressList[0], version: null};
        }

        if (addressList.length === 2) {
            return {url: parsed.origin, remote: addressList[0], version: addressList[1]};
        }

        return {
            url: parsed.origin,
            remote: addressList[addressList.length - 2],
            version: addressList[addressList.length - 1]
        };
    } catch (e) {
        return null;
    }
};

const parseToken = (token) => {
    const {url, remote, version} = ((token) => {

        const address = ((token) => {
            const res = token.match(/^(.*):.+/);
            if (res && res[1]) {
                return ensureSlash(res[1]);
            }
            return null;
        })(token);

        if (!address) {
            return {url: null, remote: null, version: null};
        }

        const isHttpAddress = /^https?:\/\//.test(address);
        if (isHttpAddress) {
            const parsed = parseByURL(address);
            if (parsed) {
                return parsed;
            }
        }

        const addressList = address.split('/').filter((name) => !!name);

        if (addressList.length === 1) {
            return {url: null, remote: addressList[0], version: null}
        }

        return {
            url: null,
            remote: addressList[addressList.length - 2],
            version: addressList[addressList.length - 1]
        };
    })(token);

    const module = ((token) => {
        const moduleStr = token.replace(/^.*:/, '');
        const [module, subModule] = moduleStr.split('@').map((module) => {
            const [name, propName] = module.split('.');
            return {name, propName};
        });
        const output = {
            moduleName: module.name, modulePropName: module.propName
        };

        if (subModule) {
            Object.assign(output, {
                subModuleName: subModule.name, subModulePropName: subModule.propName
            })
        }

        return output;
    })(token);

    return {url, remote, version, module};
};

export default parseToken;
