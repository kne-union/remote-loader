import {getOrLoadRemote} from './getOrLoadRemote';

describe('getOrLoadRemote', () => {
    beforeEach(() => {
        document.head.querySelectorAll('script[data-webpack]').forEach((item) => item.remove());
        delete window.remote_exist;
        delete window.remote_loaded;
        delete window.remote_pending;
        delete window.remote_fallback;
        delete global.__webpack_share_scopes__;
    });

    test('window 已有远程容器时直接 resolve', async () => {
        window.remote_exist = {};
        await expect(getOrLoadRemote('remote_exist', 'default')).resolves.toBeUndefined();
    });

    test('existingRemote 且 data-status=success 时复用并 resolve', async () => {
        const script = document.createElement('script');
        script.setAttribute('data-webpack', 'remote_loaded');
        script.setAttribute('data-status', 'success');
        document.head.appendChild(script);

        await expect(getOrLoadRemote('remote_loaded', 'default')).resolves.toBeUndefined();
        expect(script.getAttribute('data-status')).toBe('success');
    });

    test('existingRemote 在 load 事件后 resolve', async () => {
        const script = document.createElement('script');
        script.setAttribute('data-webpack', 'remote_pending');
        document.head.appendChild(script);

        const promise = getOrLoadRemote('remote_pending', 'default');
        window.remote_pending = {};
        script.dispatchEvent(new Event('load'));

        await expect(promise).resolves.toBeUndefined();
        expect(script.getAttribute('data-status')).toBe('success');
    });

    test('无 existingRemote 时按 fallback url 注入脚本并加载', async () => {
        const promise = getOrLoadRemote('remote_fallback', 'default', 'http://static.example.com/remoteEntry.js');

        const script = document.querySelector('script[data-webpack="remote_fallback"]');
        expect(script).toBeTruthy();
        window.remote_fallback = {};
        script.dispatchEvent(new Event('load'));

        await expect(promise).resolves.toBeUndefined();
    });

    test('existingRemote 触发 error 时删除脚本并 reject', async () => {
        const script = document.createElement('script');
        script.setAttribute('data-webpack', 'remote_pending');
        document.head.appendChild(script);

        const promise = getOrLoadRemote('remote_pending', 'default');
        script.dispatchEvent(new Event('error'));

        await expect(promise).rejects.toBeUndefined();
        expect(document.querySelector('script[data-webpack="remote_pending"]')).toBeNull();
    });

    test('fallback script 触发 error 时删除脚本并 reject', async () => {
        const promise = getOrLoadRemote('remote_fallback', 'default', 'http://static.example.com/remoteEntry.js');
        const script = document.querySelector('script[data-webpack="remote_fallback"]');

        script.dispatchEvent(new Event('error'));

        await expect(promise).rejects.toBeUndefined();
        expect(document.querySelector('script[data-webpack="remote_fallback"]')).toBeNull();
    });

    test('shareScope 可用时会执行 remote.init', async () => {
        const init = jest.fn().mockResolvedValue(undefined);
        global.__webpack_share_scopes__ = {default: {react: {}}};

        const promise = getOrLoadRemote('remote_loaded', 'default', 'http://static.example.com/remoteEntry.js');
        const script = document.querySelector('script[data-webpack="remote_loaded"]');
        window.remote_loaded = {init};
        script.dispatchEvent(new Event('load'));

        await expect(promise).resolves.toBeUndefined();
        expect(init).toHaveBeenCalledTimes(1);
        expect(window.remote_loaded.__initialized).toBe(true);
    });

    test('无 existingRemote 且无 fallback 时 reject', async () => {
        await expect(getOrLoadRemote('not_found', 'default')).rejects.toContain('Cannot Find Remote not_found');
    });
});
