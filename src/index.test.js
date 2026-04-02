import * as RemoteLoaderExports from './index';
import {global, preset} from './preset';

describe('index exports', () => {
    beforeEach(() => {
        global.remotes = {};
        global.remoteEntryFileName = 'remoteEntry.js';
        global.error = null;
        global.fallback = null;
    });

    test('导出 getGlobal 且返回深拷贝', () => {
        preset({
            remotes: {
                default: {
                    url: 'http://static.example.com',
                    remote: 'ui_component'
                }
            }
        });

        const config = RemoteLoaderExports.getGlobal();
        config.remotes.default.url = 'http://changed.example.com';

        expect(global.remotes.default.url).toBe('http://static.example.com');
    });

    test('关键导出存在', () => {
        expect(typeof RemoteLoaderExports.getStaticPath).toBe('function');
        expect(typeof RemoteLoaderExports.getPublicPath).toBe('function');
        expect(typeof RemoteLoaderExports.loadModule).toBe('function');
        expect(RemoteLoaderExports.default).toBeTruthy();
    });
});
