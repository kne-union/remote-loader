import {renderHook, waitFor, act} from '@testing-library/react';
import useLoader, {cache} from './useLoader';
import loadModule from './loadModule';

jest.mock('./loadModule', () => jest.fn());

const createDeferred = () => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return {promise, resolve, reject};
};

describe('useLoader', () => {
    beforeEach(() => {
        cache.clear();
        loadModule.mockReset();
    });

    test('模块切换后会重置 error 并成功更新', async () => {
        loadModule.mockImplementation((token) => {
            if (token === 'a') {
                return Promise.reject(new Error('failed-a'));
            }
            return Promise.resolve({default: 'module-b'});
        });

        const {result, rerender} = renderHook(({modules}) => useLoader({modules}), {
            initialProps: {modules: ['a']}
        });

        await waitFor(() => {
            expect(result.current.error).toBe(true);
            expect(result.current.loading).toBe(false);
        }, {timeout: 3000});

        rerender({modules: ['b']});

        await waitFor(() => {
            expect(result.current.error).toBe(false);
            expect(result.current.loading).toBe(false);
            expect(result.current.remoteModules).toEqual(['module-b']);
        });
    });

    test('只接受最新请求结果，避免竞态覆盖', async () => {
        const deferredA = createDeferred();
        const deferredB = createDeferred();

        loadModule.mockImplementation((token) => {
            if (token === 'a') {
                return deferredA.promise;
            }
            return deferredB.promise;
        });

        const {result, rerender} = renderHook(({modules}) => useLoader({modules}), {
            initialProps: {modules: ['a']}
        });

        rerender({modules: ['b']});

        await act(async () => {
            deferredB.resolve({default: 'module-b'});
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.remoteModules).toEqual(['module-b']);
        });

        await act(async () => {
            deferredA.resolve({default: 'module-a'});
        });

        await act(async () => {
            await Promise.resolve();
        });

        expect(result.current.remoteModules).toEqual(['module-b']);
    });

    test('缓存 key 包含 options，不同 options 不串缓存', async () => {
        loadModule.mockImplementation((token, options) => {
            return Promise.resolve({default: `${token}-${options.version}`});
        });

        const {result, rerender} = renderHook(({modules, options}) => useLoader({modules, options}), {
            initialProps: {modules: ['mod-a'], options: {version: '1.0.0'}}
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.remoteModules).toEqual(['mod-a-1.0.0']);
        });

        rerender({modules: ['mod-a'], options: {version: '2.0.0'}});

        await waitFor(() => {
            expect(result.current.remoteModules).toEqual(['mod-a-2.0.0']);
        });

        rerender({modules: ['mod-a'], options: {version: '2.0.0'}});

        await act(async () => {
            await Promise.resolve();
        });

        expect(loadModule).toHaveBeenCalledTimes(2);
    });

    test('全部命中缓存时不再触发 loadModule', async () => {
        loadModule.mockResolvedValue({default: 'cached-module'});

        const first = renderHook(() => useLoader({modules: ['cache-a'], options: {version: '1.0.0'}}));

        await waitFor(() => {
            expect(first.result.current.loading).toBe(false);
            expect(first.result.current.remoteModules).toEqual(['cached-module']);
        });
        expect(loadModule).toHaveBeenCalledTimes(1);
        first.unmount();

        loadModule.mockClear();

        const second = renderHook(() => useLoader({modules: ['cache-a'], options: {version: '1.0.0'}}));

        await waitFor(() => {
            expect(second.result.current.loading).toBe(false);
            expect(second.result.current.remoteModules).toEqual(['cached-module']);
        });

        expect(loadModule).toHaveBeenCalledTimes(0);
    });

    test('options 含函数时也能稳定缓存', async () => {
        function sameName() {
            return 'ok';
        }

        loadModule.mockResolvedValue({default: 'module-with-fn'});

        const {result, rerender} = renderHook(({options}) => useLoader({modules: ['fn-a'], options}), {
            initialProps: {options: {version: '1.0.0', handler: sameName}}
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.remoteModules).toEqual(['module-with-fn']);
        });

        rerender({options: {version: '1.0.0', handler: sameName}});

        await act(async () => {
            await Promise.resolve();
        });

        expect(loadModule).toHaveBeenCalledTimes(1);
    });

    test('部分缓存命中时仅加载未命中模块', async () => {
        loadModule.mockImplementation((token) => {
            return Promise.resolve({default: `module-${token}`});
        });

        const {result, rerender} = renderHook(({modules, options}) => useLoader({modules, options}), {
            initialProps: {modules: ['a'], options: {version: '1.0.0', list: [1, 2]}}
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.remoteModules).toEqual(['module-a']);
        });

        rerender({modules: ['a', 'b'], options: {version: '1.0.0', list: [1, 2]}});

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.remoteModules).toEqual(['module-a', 'module-b']);
        });

        expect(loadModule).toHaveBeenCalledTimes(2);
    });
});
