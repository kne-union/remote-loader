# 缓存破坏机制修复方案

## 问题
远程模块的 `remoteEntry.js` 被浏览器强缓存，导致配置更新后仍加载旧版本。

## 解决方案
在 URL 中添加版本号作为查询参数，确保每个版本使用独立的缓存。

## 实现

### 修改 `src/loadModule.js`

在 `loadComponent` 调用时添加版本参数：

```javascript
// 在 loadModule 函数的最后，修改 return 语句
return loadComponent(
    formatRemote(remote), 
    "default", 
    './' + tokenObject.module.moduleName, 
    ensureSlash(url) + '/' + remoteEntryFileName,
    options.version  // 新增：传递版本号
)().then((module) => {
    // ... 现有代码
});
```

### 修改 `src/loadComponent.js`

接收并使用版本号：

```javascript
export const loadComponent = (remote, sharedScope, module, url, version) => {
    return async () => {
        // 添加版本号到 URL（仅当版本存在时）
        const urlWithVersion = version ? 
            (url.includes('?') ? `${url}&v=${version}` : `${url}?v=${version}`) : 
            url;
            
        await getOrLoadRemote(remote, sharedScope, urlWithVersion);
        const container = window[remote];

        if (!container || typeof container.get !== 'function') {
            throw new Error(`[remote-loader] Remote container [${remote}] is invalid`);
        }

        const factory = await container.get(module);
        if (typeof factory !== 'function') {
            throw new Error(`[remote-loader] Module factory [${module}] from [${remote}] is invalid`);
        }

        return factory();
    };
};
```

### 可选：添加配置选项

在 `src/preset.js` 中添加全局配置：

```javascript
export const global = {
    remotes: {},
    remoteEntryFileName: 'remoteEntry.js',
    cacheBusting: true  // 新增：默认启用缓存破坏
};

export const preset = (options) => {
    Object.assign(global, options);
};
```

然后在 `loadModule.js` 中使用：

```javascript
const cacheBusting = get(targetOptions, 'cacheBusting', global.cacheBusting);
const urlWithVersion = cacheBusting && options.version ? 
    (url.includes('?') ? `${url}&v=${options.version}` : `${url}?v=${options.version}`) : 
    url;
```

## 使用方法

### 默认行为（推荐）
```javascript
remoteLoaderPreset({
    remotes: {
        'components-core': {
            url: 'https://example.com',
            remote: 'components-core',
            defaultVersion: '0.4.64',
            tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build'
        }
    }
});

// URL 将自动添加版本号：
// https://example.com/packages/@kne-components/components-core/0.4.64/build/remoteEntry.js?v=0.4.64
```

### 禁用缓存破坏（如果需要）
```javascript
remoteLoaderPreset({
    cacheBusting: false,  // 全局禁用
    remotes: {
        // ...
    }
});

// 或针对特定加载禁用
loadModule('components-core:Global', { cacheBusting: false });
```

## 优点

1. **自动化**：无需手动清除缓存
2. **版本隔离**：每个版本使用独立缓存
3. **向后兼容**：不影响现有代码
4. **可配置**：可以全局或单独禁用

## 测试

```javascript
// test-cache-busting.js
import loadModule from './src/loadModule';

// 测试 1：验证 URL 包含版本号
const module1 = await loadModule('components-core:Global');
// 预期：加载 .../remoteEntry.js?v=0.4.64

// 测试 2：不同版本使用不同缓存
const module2 = await loadModule('components-core/0.5.0:Global');
// 预期：加载 .../remoteEntry.js?v=0.5.0

// 测试 3：禁用缓存破坏
const module3 = await loadModule('components-core:Global', { cacheBusting: false });
// 预期：加载 .../remoteEntry.js（无版本号）
```

## 发布计划

1. 在 `dev` 分支实现修复
2. 添加单元测试
3. 更新文档
4. 发布为 1.4.7 版本
5. 在 CHANGELOG 中说明此修复

## 注意事项

- CDN 需要支持查询参数（大多数 CDN 默认支持）
- 如果 CDN 配置忽略查询参数，需要调整 CDN 设置
- 生产环境建议启用此功能以避免缓存问题
