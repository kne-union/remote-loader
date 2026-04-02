import {loadComponent} from './loadComponent';
import {getOrLoadRemote} from './getOrLoadRemote';

jest.mock('./getOrLoadRemote', () => ({
    getOrLoadRemote: jest.fn()
}));

describe('loadComponent', () => {
    beforeEach(() => {
        getOrLoadRemote.mockReset();
        getOrLoadRemote.mockResolvedValue(undefined);
        delete window.remote_app;
    });

    test('远程容器无效时抛出可读错误', async () => {
        const load = loadComponent('remote_app', 'default', './App', 'http://test/remoteEntry.js');
        await expect(load()).rejects.toThrow('Remote container [remote_app] is invalid');
    });

    test('模块工厂无效时抛出可读错误', async () => {
        window.remote_app = {
            get: jest.fn().mockResolvedValue(null)
        };
        const load = loadComponent('remote_app', 'default', './App', 'http://test/remoteEntry.js');
        await expect(load()).rejects.toThrow('Module factory [./App] from [remote_app] is invalid');
    });
});
