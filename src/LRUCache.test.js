import LRUCache from './LRUCache';

describe('LRUCache', () => {
    test('超过容量时淘汰最久未使用项', () => {
        const cache = new LRUCache(2);
        cache.set('a', 1);
        cache.set('b', 2);
        cache.get('a');
        cache.set('c', 3);

        expect(cache.has('a')).toBe(true);
        expect(cache.has('b')).toBe(false);
        expect(cache.has('c')).toBe(true);
    });

    test('设置已存在 key 时只更新值并刷新最近使用顺序', () => {
        const cache = new LRUCache(2);
        cache.set('a', 1);
        cache.set('b', 2);
        cache.set('a', 11);
        cache.set('c', 3);

        expect(cache.get('a')).toBe(11);
        expect(cache.has('b')).toBe(false);
        expect(cache.has('c')).toBe(true);
    });

    test('clear 与 size 正常工作', () => {
        const cache = new LRUCache(2);
        cache.set('a', 1);
        cache.set('b', 2);
        expect(cache.size()).toBe(2);

        cache.clear();
        expect(cache.size()).toBe(0);
        expect(cache.get('a')).toBeUndefined();
    });
});
