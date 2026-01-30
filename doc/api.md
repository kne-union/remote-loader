### 组件

#### RemoteLoader

用于加载远程模块的 React 组件。

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| module | string | 是 | - | 远程模块标记，格式：`[模块地址/remote/version:]模块名[@子模块][.模块属性]` |
| ...props | any | 否 | - | 传递给加载的远程模块的属性 |

### 高阶组件

#### withRemoteLoader

用于包装组件并提供远程模块加载功能的高阶组件。

包装后的组件接收以下属性：

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| modules | Array\<string\> | 是 | - | 远程模块标记数组 |
| onLoadComplete | Function | 否 | - | 模块加载完成的回调函数，接收加载的模块数组 |
| fallback | ReactNode | 否 | null | 加载中显示的内容 |
| remoteError | ReactNode \| Function | 否 | null | 加载失败时显示的内容，可以是 React 节点或函数 |
| ...props | any | 否 | - | 传递给被包装组件的属性 |

被包装组件通过 `remoteModules` 属性接收加载的模块数组。

#### createWithRemoteLoader

用于创建带预设配置的 withRemoteLoader 高阶组件。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| params | Object | 是 | - | 预设参数 |
| params.modules | Array\<string\> | 是 | - | 远程模块标记数组 |

返回一个 HOC，该 HOC 的属性会与预设参数合并。

### 钩子

#### useLoader

用于在函数组件中加载远程模块的 React 钩子。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| config.modules | Array\<string\> | 是 | - | 远程模块标记数组 |
| config.onLoadComplete | Function | 否 | - | 模块加载完成的回调函数，接收加载的模块数组 |

**返回值：**

| 名称 | 类型 | 描述 |
|------|------|------|
| loading | boolean | 是否正在加载 |
| error | Error | 加载错误，如果没有错误则为 null |
| remoteModules | Array | 加载的远程模块数组 |

### 函数

#### loadModule

加载远程模块的核心函数，内部使用缓存机制。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| token | string | 是 | - | 远程模块标记 |

**返回值：**

| 类型 | 描述 |
|------|------|
| Promise\<any\> | 解析为加载的远程模块的 Promise |

#### safeLoadModule

安全加载远程模块的函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| token | string | 是 | - | 远程模块标记 |

**返回值：**

| 类型 | 描述 |
|------|------|
| Promise\<any\> | 解析为加载的远程模块的 Promise |

#### parseToken

解析模块标记的函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| token | string | 是 | - | 模块标记，格式：`[模块地址/remote/version:]模块名[@子模块][.模块属性]` |

**返回值：**

| 类型 | 描述 |
|------|------|
| Object | 解析后的模块信息 |
| Object.url | string \| null | 远程地址 |
| Object.remote | string \| null | 远程容器名称 |
| Object.version | string \| null | 远程容器版本 |
| Object.module | Object | 模块信息 |
| Object.module.moduleName | string \| undefined | 主模块名称 |
| Object.module.modulePropName | string \| undefined | 主模块属性名 |
| Object.module.subModuleName | string \| undefined | 子模块名称 |
| Object.module.subModulePropName | string \| undefined | 子模块属性名 |

#### preset

设置全局配置的函数，配置会合并到全局配置对象。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 否 | - | 全局配置选项 |
| options.remotes | Object | 否 | {} | 远程容器配置，键为容器名称，值为配置对象 |
| options.remotes[name].url | string | 是 | - | 远程容器基础 URL |
| options.remotes[name].remote | string | 是 | - | 远程容器名称 |
| options.remotes[name].defaultVersion | string | 否 | - | 默认版本 |
| options.remotes[name].tpl | string | 否 | - | 路径模板，使用 `{{url}}/{{remote}}/{{version}}` 语法 |
| options.remoteEntryFileName | string | 否 | 'remoteEntry.js' | 远程入口文件名 |
| options.error | ReactNode \| Function | 否 | null | 全局加载失败时显示的内容 |
| options.fallback | ReactNode | 否 | null | 全局加载中显示的内容 |

**返回值：**

| 类型 | 描述 |
|------|------|
| Object | 合并后的全局配置对象 |

#### getPublicPath

根据配置生成公共路径。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| name | string | 是 | - | 远程容器名称（使用 preset 中配置的 remotes） |
| options | Object | 否 | - | 覆盖配置 |
| options.remotes | Object | 否 | {} | 远程容器配置 |
| options.version | string | 否 | - | 版本号 |

**返回值：**

| 类型 | 描述 |
|------|------|
| string | 生成的公共路径 |

#### getStaticPath

根据参数生成静态路径。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| config | Object | 是 | - | 路径配置 |
| config.url | string | 是 | - | 远程容器基础 URL |
| config.remote | string | 是 | - | 远程容器名称 |
| config.version | string | 是 | - | 版本号 |
| config.tpl | string | 否 | '{{url}}/{{remote}}/{{version}}' | 路径模板，支持 `{{url}}`、`{{remote}}`、`{{version}}` 占位符 |

**返回值：**

| 类型 | 描述 |
|------|------|
| string | 生成的静态路径（以 / 结尾） |

#### getOrLoadRemote

获取或加载远程容器。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| remote | string | 是 | - | 远程容器全局名称 |
| shareScope | string \| Object | 否 | - | 共享作用域，可以是作用域名称或作用域对象 |
| remoteFallbackUrl | string | 否 | - | 远程容器的回退 URL |

**返回值：**

| 类型 | 描述 |
|------|------|
| Promise | 解析为远程容器的 Promise |

#### loadComponent

加载远程组件的函数，返回一个异步函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| remote | string | 是 | - | 远程容器全局名称 |
| shareScope | string \| Object | 否 | - | 共享作用域 |
| module | string | 是 | - | 模块名称 |
| url | string | 否 | - | 远程容器的 URL |

**返回值：**

| 类型 | 描述 |
|------|------|
| Function | 返回一个异步函数，调用该函数会解析为加载的远程组件 |
