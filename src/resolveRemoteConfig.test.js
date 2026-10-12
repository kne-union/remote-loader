import resolveRemoteConfig, {mergeRemotes, remoteConfigCache} from './resolveRemoteConfig';
import getPublicPath from './getPublicPath';
import {global} from './preset';

const mockFetchJson = (data) => {
    return jest.fn(() => Promise.resolve({ok: true, status: 200, json: () => Promise.resolve(data)}));
};

describe('mergeRemotes', () => {
    test('同名配置浅合并，其余配置保留', () => {
        const remotes = mergeRemotes({
            'components-core': {url: 'http://core.example.com', remote: 'components-core', defaultVersion: '0.4.64'},
            'ai-interview': {url: 'http://old.example.com', remote: 'ai-interview', defaultVersion: '0.1.0'}
        }, {
            'ai-interview': {configUrl: 'http://ai.example.com/remote-module-config.json'}
        });
        expect(remotes['components-core']).toEqual({url: 'http://core.example.com', remote: 'components-core', defaultVersion: '0.4.64'});
        expect(remotes['ai-interview']).toEqual({
            url: 'http://old.example.com', remote: 'ai-interview', defaultVersion: '0.1.0', configUrl: 'http://ai.example.com/remote-module-config.json'
        });
    });

    test('未传入覆盖配置时返回全局配置副本', () => {
        const base = {default: {url: 'http://static.example.com', remote: 'ui_component'}};
        const remotes = mergeRemotes(base);
        expect(remotes).toEqual(base);
        expect(remotes).not.toBe(base);
    });
});

describe('resolveRemoteConfig', () => {
    const originFetch = window.fetch;

    beforeEach(() => {
        global.remotes = {};
        remoteConfigCache.clear();
    });

    afterEach(() => {
        window.fetch = originFetch;
    });

    const setFetch = (fetchMock) => {
        window.fetch = fetchMock;
    };

    test('没有 configUrl 时直接返回合并后的配置', async () => {
        global.remotes = {ui: {url: 'http://static.example.com', remote: 'ui'}};
        const config = await resolveRemoteConfig('ui');
        expect(config).toEqual({url: 'http://static.example.com', remote: 'ui'});
    });

    test('使用配置文件中的绝对 url、tpl 与 version', async () => {
        setFetch(mockFetchJson({name: 'other-name', url: 'https://cdn.example.com/ai/cn-prod/abc', tpl: '{{url}}', version: '0_1_192'}));
        const config = await resolveRemoteConfig('ai', {
            remotes: {ai: {remote: 'ai-interview', configUrl: 'https://ai.example.com/remote-module-config.json'}}
        });
        expect(config).toEqual({
            remote: 'ai-interview',
            configUrl: 'https://ai.example.com/remote-module-config.json',
            url: 'https://cdn.example.com/ai/cn-prod/abc',
            tpl: '{{url}}',
            defaultVersion: '0_1_192'
        });
    });

    test('配置文件 url 为空时使用 configUrl 所在目录，tpl 默认为 {{url}}', async () => {
        setFetch(mockFetchJson({url: '', version: '0_1_192'}));
        const config = await resolveRemoteConfig('ai', {
            remotes: {ai: {remote: 'ai-interview', configUrl: 'https://ai.example.com/sub/remote-module-config.json?t=1'}}
        });
        expect(config.url).toBe('https://ai.example.com/sub');
        expect(config.tpl).toBe('{{url}}');
        expect(config.defaultVersion).toBe('0_1_192');
    });

    test('配置文件 url 为相对路径时以 configUrl 所在目录解析', async () => {
        setFetch(mockFetchJson({url: 'static/v1/', version: '1_0_0'}));
        const config = await resolveRemoteConfig('ai', {
            remotes: {ai: {remote: 'ai-interview', configUrl: 'https://ai.example.com/sub/remote-module-config.json'}}
        });
        expect(config.url).toBe('https://ai.example.com/sub/static/v1');
    });

    test('配置文件缺少 tpl 与 version 时回退原配置', async () => {
        setFetch(mockFetchJson({url: 'https://cdn.example.com/ai'}));
        const config = await resolveRemoteConfig('ai', {
            remotes: {
                ai: {
                    remote: 'ai-interview', tpl: '{{url}}/{{remote}}', defaultVersion: '0_0_1', configUrl: 'https://ai.example.com/remote-module-config.json'
                }
            }
        });
        expect(config.tpl).toBe('{{url}}/{{remote}}');
        expect(config.defaultVersion).toBe('0_0_1');
    });

    test('同一 configUrl 只请求一次', async () => {
        const fetchMock = mockFetchJson({url: 'https://cdn.example.com/ai', version: '1'});
        setFetch(fetchMock);
        const options = {remotes: {ai: {remote: 'ai-interview', configUrl: 'https://ai.example.com/remote-module-config.json'}}};
        await Promise.all([resolveRemoteConfig('ai', options), resolveRemoteConfig('ai', options)]);
        await resolveRemoteConfig('ai', options);
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test('请求失败时抛出明确错误且下次可重试', async () => {
        const options = {remotes: {ai: {remote: 'ai-interview', configUrl: 'https://ai.example.com/remote-module-config.json'}}};
        setFetch(jest.fn(() => Promise.resolve({ok: false, status: 404})));
        await expect(resolveRemoteConfig('ai', options)).rejects.toThrow('[remote-loader] Remote config [ai] load failed: https://ai.example.com/remote-module-config.json');

        const fetchMock = mockFetchJson({url: 'https://cdn.example.com/ai', version: '1'});
        setFetch(fetchMock);
        const config = await resolveRemoteConfig('ai', options);
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(config.url).toBe('https://cdn.example.com/ai');
    });

    test('全局配置的 configUrl 解析后写回全局，getPublicPath 可同步使用', async () => {
        setFetch(mockFetchJson({url: 'https://cdn.example.com/ai', version: '0_1_192'}));
        global.remotes = {ai: {remote: 'ai-interview', configUrl: 'https://ai.example.com/remote-module-config.json'}};
        expect(() => getPublicPath('ai')).toThrow('Remote config for [ai] is invalid');

        await resolveRemoteConfig('ai');
        expect(global.remotes.ai).toEqual({
            remote: 'ai-interview',
            configUrl: 'https://ai.example.com/remote-module-config.json',
            url: 'https://cdn.example.com/ai',
            tpl: '{{url}}',
            defaultVersion: '0_1_192'
        });
        expect(getPublicPath('ai')).toBe('https://cdn.example.com/ai');
    });

    test('remoteOptions 中的 configUrl 不写回全局', async () => {
        setFetch(mockFetchJson({url: 'https://cdn.example.com/ai', version: '0_1_192'}));
        global.remotes = {ai: {remote: 'ai-interview', url: 'https://old.example.com', defaultVersion: '0_0_1'}};

        await resolveRemoteConfig('ai', {remotes: {ai: {configUrl: 'https://ai.example.com/remote-module-config.json'}}});
        expect(global.remotes.ai).toEqual({remote: 'ai-interview', url: 'https://old.example.com', defaultVersion: '0_0_1'});
    });
});
