import getPublicPath from './getPublicPath';
import {global} from './preset';

describe('getPublicPath', () => {
    const originRemotes = global.remotes;

    afterEach(() => {
        global.remotes = originRemotes;
    });

    test('远程配置缺失时抛出明确错误', () => {
        global.remotes = {};
        expect(() => getPublicPath('missing-remote')).toThrow('Remote config for [missing-remote] is invalid');
    });
});
