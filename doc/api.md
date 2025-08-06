### API 文档

本文档详细描述了 remote-loader 库提供的所有 API。

### 组件

#### RemoteLoader

用于加载远程模块的 React 组件。

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| module | string | 是 | - | 远程模块标记，格式：`[模块地址/remote/version:]模块名[@子模块][.模块属性]` |
| fallback | ReactNode | 否 | null | 加载中显示的内容 |
| errorFallback | ReactNode \| Function | 否 | null | 加载失败时显示的内容，可以是 React 节点或接收错误对象的函数 |
| onError | Function | 否 | null | 加载失败时的回调函数 |
| ...props | any | 否 | - | 传递给加载的远程模块的属性 |

### 高阶组件

#### withRemoteLoader

用于包装组件并提供远程模块加载功能的高阶组件。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| module | string \| Array\<string\> | 是 | - | 远程模块标记或标记数组 |
| options | Object | 否 | {} | 配置选项 |
| options.fallback | ReactNode | 否 | null | 加载中显示的内容 |
| options.errorFallback | ReactNode \| Function | 否 | null | 加载失败时显示的内容 |
| options.onError | Function | 否 | null | 加载失败时的回调函数 |

### 钩子

#### useLoader

用于在函数组件中加载远程模块的 React 钩子。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| module | string \| Array\<string\> | 是 | - | 远程模块标记或标记数组 |
| options | Object | 否 | {} | 配置选项 |
| options.onError | Function | 否 | null | 加载失败时的回调函数 |

**返回值：**

| 名称 | 类型 | 描述 |
|------|------|------|
| result | Object | 包含加载状态和结果的对象 |
| result.loading | boolean | 是否正在加载 |
| result.error | Error | 加载错误，如果没有错误则为 null |
| result.module | any | 加载的远程模块，如果未加载完成则为 null |

### 函数

#### loadModule

加载远程模块的核心函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| module | string | 是 | - | 远程模块标记 |
| options | Object | 否 | {} | 配置选项 |
| options.onError | Function | 否 | null | 加载失败时的回调函数 |

**返回值：**

| 类型 | 描述 |
|------|------|
| Promise\<any\> | 解析为加载的远程模块的 Promise |

#### parseToken

解析模块标记的函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| token | string | 是 | - | 模块标记 |

**返回值：**

| 类型 | 描述 |
|------|------|
| Object | 解析后的模块信息 |
| Object.remote | string | 远程容器名称 |
| Object.version | string | 远程容器版本 |
| Object.module | string | 模块名称 |
| Object.submodule | string | 子模块名称 |
| Object.property | string | 模块属性 |

#### preset

设置全局配置的函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 是 | - | 全局配置选项 |
| options.remotes | Object | 否 | {} | 远程容器配置 |
| options.remoteEntry | string | 否 | 'remoteEntry.js' | 远程入口文件名 |
| options.onError | Function | 否 | null | 全局错误处理函数 |
| options.fallback | ReactNode | 否 | null | 全局加载中显示的内容 |
| options.errorFallback | ReactNode \| Function | 否 | null | 全局加载失败时显示的内容 |

**返回值：**

| 类型 | 描述 |
|------|------|
| Object | 当前的全局配置 |

#### getPublicPath

生成公共路径的函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| remote | string | 是 | - | 远程容器名称 |
| version | string | 否 | null | 远程容器版本 |

**返回值：**

| 类型 | 描述 |
|------|------|
| string | 生成的公共路径 |

#### getStaticPath

生成静态路径的函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| remote | string | 是 | - | 远程容器名称 |
| version | string | 否 | null | 远程容器版本 |
| file | string | 是 | - | 文件名 |

**返回值：**

| 类型 | 描述 |
|------|------|
| string | 生成的静态路径 |

#### getOrLoadRemote

获取或加载远程容器的函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| remote | string | 是 | - | 远程容器名称 |
| version | string | 否 | null | 远程容器版本 |

**返回值：**

| 类型 | 描述 |
|------|------|
| Promise\<Object\> | 解析为远程容器的 Promise |

#### loadComponent

加载远程组件的函数。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| remote | string | 是 | - | 远程容器名称 |
| version | string | 否 | null | 远程容器版本 |
| module | string | 是 | - | 模块名称 |
| submodule | string | 否 | null | 子模块名称 |
| property | string | 否 | null | 模块属性 |

**返回值：**

| 类型 | 描述 |
|------|------|
| Promise\<any\> | 解析为加载的远程组件的 Promise |
