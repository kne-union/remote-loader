/**
 * LRU Cache 实现
 * 当缓存超过最大容量时，自动淘汰最久未使用的条目
 */
class LRUCache {
    constructor(maxSize = 50) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }

    /**
     * 检查缓存中是否存在指定 key
     * @param {*} key - 缓存键
     * @returns {boolean}
     */
    has(key) {
        return this.cache.has(key);
    }

    /**
     * 获取缓存值
     * 获取时会将该 key 移动到最近使用的位置
     * @param {*} key - 缓存键
     * @returns {*} 缓存值，不存在则返回 undefined
     */
    get(key) {
        const value = this.cache.get(key);
        if (value === undefined) {
            return undefined;
        }
        // 移动到最后，表示最近使用
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    /**
     * 设置缓存值
     * 如果超过最大容量，删除最久未使用的条目
     * @param {*} key - 缓存键
     * @param {*} value - 缓存值
     */
    set(key, value) {
        // 如果已存在，先删除以更新位置
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        // 如果超过最大容量，删除最久未使用的（Map 中的第一个）
        else if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    /**
     * 获取当前缓存条目数量
     * @returns {number}
     */
    size() {
        return this.cache.size;
    }

    /**
     * 清空所有缓存
     */
    clear() {
        this.cache.clear();
    }
}

export default LRUCache;
