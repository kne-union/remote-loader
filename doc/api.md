### 组件

#### RemoteLoader

用于加载单个远程模块并渲染其默认导出组件。

| 属性             | 类型                    | 必填 | 默认值                 | 描述                                                 |
|----------------|-----------------------|----|---------------------|----------------------------------------------------|
| module         | string                | 是  | -                   | 远程模块标记，格式：`[模块地址/remote/version:]模块名[@子模块][.模块属性]` |
| onLoadComplete | Function              | 否  | -                   | 加载完成回调，参数为已加载模块数组                                  |
| remoteFallback | ReactNode             | 否  | `preset().fallback` | 加载中展示内容                                            |
| remoteError    | ReactNode \| Function | 否  | `preset().error`    | 加载失败展示内容                                           |
| remoteOptions  | Object                | 否  | `{}`                | 传递给内部 `loadModule` 的覆盖配置，其中 `remotes` 与全局配置按 remote 名合并 |
| ...props       | any                   | 否  | -                   | 透传到远程组件的业务属性（可包含 JSX）                              |

### 高阶组件

#### withRemoteLoader

为组件注入远程加载能力。被包装组件通过 `remoteModules` 获取已加载模块数组。

| 属性             | 类型                    | 必填 | 默认值                 | 描述                       |
|----------------|-----------------------|----|---------------------|--------------------------|
| modules        | Array<string>         | 是  | `[]`                | 远程模块标记数组                 |
| onLoadComplete | Function              | 否  | -                   | 加载完成回调                   |
| remoteFallback | ReactNode             | 否  | `preset().fallback` | 加载中展示内容                  |
| remoteError    | ReactNode \| Function | 否  | `preset().error`    | 加载失败展示内容                 |
| remoteOptions  | Object                | 否  | `{}`                | 传递给内部 `loadModule` 的覆盖配置，其中 `remotes` 与全局配置按 remote 名合并 |
| ...props       | any                   | 否  | -                   | 透传给被包装组件                 |

#### createWithRemoteLoader

用于创建预设参数版 HOC。

| 参数     | 类型     | 必填 | 默认值 | 描述                                                   |
|--------|--------|----|-----|------------------------------------------------------|
| params | Object | 是  | -   | 预设参数（如 `modules`、`remoteFallback`、`remoteOptions` 等） |

返回值：`(WrappedComponent) => ReactComponent`。

参数合并方式为浅合并（`Object.assign({}, params, props)`），同名字段由运行时 `props` 覆盖。

### Hooks

#### useLoader

在函数组件中按需加载远程模块。

| 参数                    | 类型            | 必填 | 默认值  | 描述                     |
|-----------------------|---------------|----|------|------------------------|
| config.modules        | Array<string> | 是  | `[]` | 远程模块标记数组               |
| config.onLoadComplete | Function      | 否  | -    | 加载完成回调                 |
| config.options        | Object        | 否  | `{}` | 传递给 `loadModule` 的覆盖配置 |

返回值：

| 名称            | 类型         | 描述         |
|---------------|------------|------------|
| loading       | boolean    | 是否处于加载中    |
| error         | boolean    | 是否加载失败     |
| remoteModules | Array<any> | 已加载的远程模块数组 |

并导出 `cache`（LRU 实例）用于外部清理或观测缓存状态。

### 函数

#### loadModule

加载远程模块并返回规范化结果。

| 参数            | 类型     | 必填 | 默认值 | 描述                        |
|---------------|--------|----|-----|---------------------------|
| token         | string | 是  | -   | 远程模块标记                    |
| targetOptions | Object | 否  | -   | 覆盖配置：`remotes` 与全局配置按 remote 名合并；`url`、`remote`、`version`、`tpl`、`remoteEntryFileName` 覆盖解析结果 |

返回值：`Promise<{ default: any }>`。

命中的 remote 配置含 `configUrl` 时，先拉取并解析配置文件（见 `resolveRemoteConfig`），再加载模块；拉取失败时返回的 Promise 被拒绝。

#### safeLoadModule

安全加载版本，内部捕获异常。

| 参数    | 类型     | 必填 | 默认值 | 描述     |
|-------|--------|----|-----|--------|
| token | string | 是  | -   | 远程模块标记 |

返回值：`Promise<any>`，失败时返回空函数组件。

#### parseToken

解析远程模块标记。

| 参数    | 类型     | 必填 | 默认值 | 描述   |
|-------|--------|----|-----|------|
| token | string | 是  | -   | 模块标记 |

返回对象字段：

| 字段                       | 类型                  | 描述     |
|--------------------------|---------------------|--------|
| url                      | string \| null      | 远程基础地址 |
| remote                   | string \| null      | 远程容器名  |
| version                  | string \| null      | 远程版本   |
| module.moduleName        | string              | 主模块名   |
| module.modulePropName    | string \| undefined | 主模块属性名 |
| module.subModuleName     | string \| undefined | 子模块名   |
| module.subModulePropName | string \| undefined | 子模块属性名 |

#### preset

设置并合并全局配置。

| 参数      | 类型     | 必填 | 默认值 | 描述    |
|---------|--------|----|-----|-------|
| options | Object | 否  | -   | 全局配置项 |

说明：使用深度合并策略（`lodash/merge`）。

`options.remotes` 中每个 remote 配置的字段：

| 字段             | 类型     | 必填 | 描述                                                         |
|----------------|--------|----|------------------------------------------------------------|
| remote         | string | 是  | 远程名，与远程容器名前缀对应                                             |
| url            | string | 否  | 远程基础地址；配置 `configUrl` 时可省略                                 |
| tpl            | string | 否  | 路径模板，默认 `{{url}}/{{remote}}/{{version}}`                     |
| defaultVersion | string | 否  | 默认版本，须与远程容器名中的版本一致                                         |
| configUrl      | string | 否  | 远程配置文件地址（`@kne/npm-tools entryHtml` 生成的 `remote-module-config.json`），首次加载该 remote 时拉取 |

`configUrl` 配置文件的合并规则：

| 配置文件字段  | 合并到       | 规则                                              |
|---------|-----------|-------------------------------------------------|
| url     | url       | 相对路径以 `configUrl` 所在目录解析；为空时使用 `configUrl` 所在目录 |
| tpl     | tpl       | 为空时使用原配置 `tpl`，再为空时为 `{{url}}`                  |
| version | defaultVersion | 为空时使用原配置 `defaultVersion`                       |
| name    | -         | 忽略，`remote` 始终使用原配置                              |

#### getGlobal

获取当前全局配置快照。

| 参数 | 类型 | 必填 | 默认值 | 描述  |
|----|----|----|-----|-----|
| -  | -  | -  | -   | 无参数 |

返回值：`Object`（深拷贝后的全局配置）。

#### getPublicPath

根据远程容器配置生成公共路径。

| 参数      | 类型     | 必填 | 默认值 | 描述               |
|---------|--------|----|-----|------------------|
| name    | string | 是  | -   | `remotes` 中的容器键名 |
| options | Object | 否  | -   | 覆盖配置             |

返回值：`string`。

同步读取配置：只配置了 `configUrl` 的 remote 需先调用 `resolveRemoteConfig` 或加载过该 remote 的模块，否则抛出配置无效错误。

#### resolveRemoteConfig

解析 remote 配置，含 `configUrl` 时拉取配置文件并合并。

| 参数      | 类型     | 必填 | 默认值 | 描述                          |
|---------|--------|----|-----|-----------------------------|
| name    | string | 是  | -   | `remotes` 中的容器键名            |
| options | Object | 否  | -   | `{ remotes }`，与全局配置按 remote 名合并后再解析 |

返回值：`Promise<Object>`，解析后的配置 `{ remote, url, tpl, defaultVersion, configUrl }`；无 `configUrl` 时返回合并后的原配置。

| 行为   | 说明                                                                    |
|------|-----------------------------------------------------------------------|
| 缓存   | 同一 `configUrl` 只请求一次；请求失败不缓存，下次重试                                    |
| 写回全局 | `configUrl` 来自全局 `preset` 时，解析结果写回全局配置，供 `getPublicPath` 同步使用；来自 `options.remotes` 时不写回 |
| 失败   | 抛出 `[remote-loader] Remote config [name] load failed: <configUrl>`     |

#### getStaticPath

按模板生成静态资源路径。

| 参数             | 类型     | 必填 | 默认值                              | 描述     |
|----------------|--------|----|----------------------------------|--------|
| config.url     | string | 是  | -                                | 远程基础地址 |
| config.remote  | string | 是  | -                                | 远程容器名  |
| config.version | string | 否  | -                                | 版本号    |
| config.tpl     | string | 否  | `{{url}}/{{remote}}/{{version}}` | 路径模板   |

返回值：`string`（以 `/` 结尾）。

#### getOrLoadRemote

获取或加载远程容器实例。

| 参数                | 类型               | 必填 | 默认值 | 描述       |
|-------------------|------------------|----|-----|----------|
| remote            | string           | 是  | -   | 远程容器全局名称 |
| shareScope        | string \| Object | 否  | -   | 共享作用域    |
| remoteFallbackUrl | string           | 否  | -   | 远程容器回退地址 |

返回值：`Promise<any>`。

#### loadComponent

创建远程组件加载器。

| 参数          | 类型               | 必填 | 默认值 | 描述                |
|-------------|------------------|----|-----|-------------------|
| remote      | string           | 是  | -   | 远程容器全局名称          |
| sharedScope | string \| Object | 否  | -   | 共享作用域             |
| module      | string           | 是  | -   | 模块名（如 `./Layout`） |
| url         | string           | 否  | -   | `remoteEntry` 地址  |

返回值：`() => Promise<any>`。
