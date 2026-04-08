
# remote-loader


### 描述

加载一个webpack5生成的邦联模块


### 安装

```shell
npm i --save @kne/remote-loader
```


### 概述

remote-loader 是一个面向 React 的远程模块加载工具，基于 Webpack 5 Module Federation 设计，适合将不同团队、不同发布节奏的功能模块在运行时进行组合。

### 特点

- 支持 `RemoteLoader`、`withRemoteLoader`、`useLoader` 三种接入方式，覆盖声明式、HOC 与 Hook 场景。
- 支持完整的 token 语法：可按远程名、版本、子模块、属性路径精确定位到目标导出。
- 内置模块缓存与复用机制，避免重复加载，提高首屏后交互性能。
- 支持全局与局部兜底（`fallback` / `error`）能力，远程模块异常时可平滑降级。
- `preset` 支持深度合并配置，便于在不同环境下渐进覆盖远程地址与模板参数。
- 新增 `getGlobal` 用于读取当前全局配置快照，便于调试与配置诊断。

### 适用场景

- 微前端主应用按需加载业务子模块。
- 组件平台动态装配跨仓库组件。
- 需要按版本灰度远程模块并快速回滚的前端系统。

### 使用体验亮点

- API 简洁，单个 `module` 字符串即可完成远程组件挂载。
- 在复杂场景下可直接使用 `useLoader` 获取加载状态与模块对象，易于与现有状态管理整合。
- 提供 `getPublicPath`、`getStaticPath` 等路径辅助函数，减少远程地址拼装错误。


### 示例(全屏)


#### 示例样式

```scss
.ant-space-vertical {
  width: 100%;
}

.container {
  background: #FFF;
}
```

#### 示例代码

- RemoteLoader 加载业务组件（Content/Table）
- 通过 `RemoteLoader` 分别加载 `components-core:Content` 与 `components-core:Table`，演示复杂表格列配置、异步点击与多类型字段渲染。
- remoteLoader(@kne/remote-loader),reactRouter(react-router-dom),_(lodash)

```jsx
const {default: Remote, preset} = remoteLoader;
const {range} = _;

const BaseExample = () => {
    return <div>
        <Remote module="components-core/0.4.64:Content"
                list={[{label: '标题0.4.64', content: '内容'}, {label: '标题标题', content: '内容内容'}, {
                    label: '标题标', content: '内容内容内容内容内容内容内容内容内容内容'
                }, {
                    label: '标题标题标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                }]}/>
        <Remote module="components-core:Content"
                list={[{label: '标题', content: '内容'}, {label: '标题标题', content: '内容内容'}, {
                    label: '标题标', content: '内容内容内容内容内容内容内容内容内容内容'
                }, {
                    label: '标题标题标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                }]}/>
        <Remote module="components-core:Table"
                name="test-table" dataSource={[
            {
                id: 0,
                date: "2021-07-21",
                datetime: "2023-07-22 09:00:00",
                serialNumber: "SX00192932323434",
                serialNumberShort: "SH0023",
                userName: "林珊珊",
                title: "我是主要字段",
                tagEnum: null,
                enUserName: "Lin Shanshan",
                phoneNumber: "+86 18792877372",
                email: "a@a.com",
                count: 4,
                description:
                    "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                description2:
                    "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                other: "其他信息",
            },
            {
                id: 1,
                date: "",
                datetime: "2023-07-22 09:00:00",
                serialNumber: "SX00192932323434",
                serialNumberShort: "SH0023",
                userName: "林珊珊1",
                title: "我是主要字段",
                tagEnum: "Y",
                enUserName: "Lin Shanshan",
                phoneNumber: null,
                email: "a@a.com",
                count: 5,
                description: "我是一段描述",
                description2: "我是一段描述",
                other: "其他信息",
            },
        ]}
                columns={[
                    {
                        name: "date",
                        title: "日期",
                        type: "date",
                        hover: true,
                    },
                    {
                        name: "datetime",
                        title: "日期时间",
                        type: "datetime",
                        hideSecond: true,
                    },
                    {
                        name: "serialNumber",
                        title: "编号",
                        type: "serialNumber",
                        primary: true,
                        onClick: async (item) => {
                            console.log(item);
                            return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(true);
                                }, 10000);
                            });
                        },
                    },
                    {
                        name: "serialNumberShort",
                        title: "短编号",
                        type: "serialNumberShort",
                    },
                    {
                        name: "title",
                        title: "主要信息",
                        type: "mainInfo",
                    },
                    {
                        name: "tag",
                        title: "状态标签",
                        type: "tag",
                        valueOf: () => ({type: "success", text: "审核通过"}),
                    },
                    {
                        name: "tagEnum",
                        title: "标签枚举",
                        type: "tag",
                        valueOf: (item) =>
                            item.tagEnum && {
                                type: "success",
                                isEnum: true,
                                moduleName: "marital",
                                name: item.tagEnum,
                            },
                    },
                    {
                        name: "avatar",
                        title: "头像",
                        type: "avatar",
                        valueOf: () => ({gender: "F"}),
                    },
                    {
                        name: "user",
                        title: "用户",
                        type: "user",
                        valueOf: (item) => `${item.enUserName} ${item.userName}`,
                    },
                    {
                        name: "hideInfo",
                        title: "隐藏字段",
                        type: "hideInfo",
                        valueOf: (item) =>
                            item["phoneNumber"] && {
                                loader: () => {
                                    return item["phoneNumber"] + "-" + item["id"];
                                },
                            },
                    },
                    {
                        name: "userName",
                        title: "用户名",
                        type: "userName",
                    },
                    {
                        name: "contacts",
                        title: "联系人",
                        type: "contacts",
                        valueOf: (item) => `${item.userName} ${item.phoneNumber}`,
                    },
                    {
                        name: "count",
                        title: "数量",
                        type: "singleRow",
                        render: ({target}) => {
                            return target.count === 5 ? {hover: true} : {hover: false};
                        },
                    },
                    {
                        name: "description",
                        title: "描述",
                        type: "description",
                    },
                    {
                        name: "description2",
                        title: "描述(省略)",
                        type: "description",
                        ellipsis: true,
                    },
                    {
                        name: "other",
                        title: "其他",
                        type: "other",
                        hover: true,
                    },
                    {
                        name: "options",
                        title: "操作",
                        type: "options",
                        valueOf: (item) => [
                            {
                                onClick: () => {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                },
                                children: "分配Program及教练",
                            }
                        ],
                    },
                ]}
        />
    </div>;
};

render(<BaseExample/>);

```

- RemoteLoader 属性子模块链式渲染
- 按 `InfoPage -> InfoPage.Part -> Descriptions` 的链路加载属性子模块，并传入含 JSX 的 `dataSource` 结构。
- remoteLoader(@kne/remote-loader)

```jsx
const {default: Remote} = remoteLoader;
const BaseExample = () => {
    return <Remote module="InfoPage">
        <Remote module="InfoPage.Part" title="退票信息">
            <Remote module="Descriptions"
                    dataSource={[[{label: "客户名称", content: "腾讯"}, {
                        label: "发票抬头", content: "腾讯科技公司"
                    }], [{label: "发票类型", content: "增值税专用发票"}, {
                        label: "发票开具日期", content: "2022-08-15"
                    }], [{label: "退票金额", content: "22000.00元"}], [{
                        label: "发票号", content: <div>
                            <div>00384895992774</div>
                            <div>00384895992774</div>
                            <div>00384895992774</div>
                            <div>00384895992774</div>
                        </div>
                    }], [{label: "是否需要重开发票", content: "否"}, {
                        label: "是否涉及金融变动", content: "否"
                    }], [{label: "是否造成实质损失", content: "否"}, {
                        label: "责任归属", content: "客户原因"
                    }], [{label: "退票原因", content: "退票原因的描述退票原因的描述退票原因的描"}], [{
                        label: "附件", content: "附件名称"
                    }], [{label: "操作时间", content: "2022-08-01 16:32"}, {label: "操作人", content: "西西歪"}]]}/>
        </Remote>
    </Remote>;
};

render(<BaseExample/>);

```

- JSX Props 稳定性与异常重建排查
- `module` 固定为字符串，通过动态/稳定两组 JSX props 对照，观察远程组件在重渲染过程中的挂载与卸载行为。
- remoteLoader(@kne/remote-loader)

```jsx
const {createWithRemoteLoader} = remoteLoader;
const {useEffect, useMemo, useState} = React;

const LogNode = ({label}) => {
    useEffect(() => {
        console.log(`[mount]`);
        return () => {
            console.log('[unmount]');
        };
    }, []);

    return <span>{label}</span>;
};

const RemoteContent = createWithRemoteLoader({
    modules: ["components-core:Content"]
})(({remoteModules, titleSlot, list}) => {
    const [Content] = remoteModules;
    return <Content title={titleSlot} list={list}/>;
});

const BaseExample = () => {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTick((current) => current + 1);
        }, 1200);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const stableTitleSlot = useMemo(() => {
        return <LogNode label="stable-title-slot"/>;
    }, []);

    const unstableTitleSlot = <LogNode label={`unstable-title-slot-${tick}`}/>;

    return <div>
        <RemoteContent
            titleSlot={unstableTitleSlot}
            list={[
                {
                    label: "动态 JSX（可能触发异常重建）",
                    content: <LogNode label={`unstable-content-${tick}`}/>
                }
            ]}
        />

        <RemoteContent
            titleSlot={stableTitleSlot}
            list={[
                {
                    label: "稳定 JSX（用于对照）",
                    content: <LogNode label="stable-content"/>
                }
            ]}
        />
    </div>;
};

render(<BaseExample/>);

```


### API

### 组件

#### RemoteLoader

用于加载单个远程模块并渲染其默认导出组件。

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| module | string | 是 | - | 远程模块标记，格式：`[模块地址/remote/version:]模块名[@子模块][.模块属性]` |
| onLoadComplete | Function | 否 | - | 加载完成回调，参数为已加载模块数组 |
| remoteFallback | ReactNode | 否 | `preset().fallback` | 加载中展示内容 |
| remoteError | ReactNode \| Function | 否 | `preset().error` | 加载失败展示内容 |
| remoteOptions | Object | 否 | `{}` | 传递给内部 `loadModule` 的覆盖配置 |
| ...props | any | 否 | - | 透传到远程组件的业务属性（可包含 JSX） |

### 高阶组件

#### withRemoteLoader

为组件注入远程加载能力。被包装组件通过 `remoteModules` 获取已加载模块数组。

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| modules | Array<string> | 是 | `[]` | 远程模块标记数组 |
| onLoadComplete | Function | 否 | - | 加载完成回调 |
| remoteFallback | ReactNode | 否 | `preset().fallback` | 加载中展示内容 |
| remoteError | ReactNode \| Function | 否 | `preset().error` | 加载失败展示内容 |
| remoteOptions | Object | 否 | `{}` | 传递给内部 `loadModule` 的覆盖配置 |
| ...props | any | 否 | - | 透传给被包装组件 |

#### createWithRemoteLoader

用于创建预设参数版 HOC。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| params | Object | 是 | - | 预设参数（如 `modules`、`remoteFallback`、`remoteOptions` 等） |

返回值：`(WrappedComponent) => ReactComponent`。

参数合并方式为浅合并（`Object.assign({}, params, props)`），同名字段由运行时 `props` 覆盖。

### Hooks

#### useLoader

在函数组件中按需加载远程模块。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| config.modules | Array<string> | 是 | `[]` | 远程模块标记数组 |
| config.onLoadComplete | Function | 否 | - | 加载完成回调 |
| config.options | Object | 否 | `{}` | 传递给 `loadModule` 的覆盖配置 |

返回值：

| 名称 | 类型 | 描述 |
|------|------|------|
| loading | boolean | 是否处于加载中 |
| error | boolean | 是否加载失败 |
| remoteModules | Array<any> | 已加载的远程模块数组 |

并导出 `cache`（LRU 实例）用于外部清理或观测缓存状态。

### 函数

#### loadModule

加载远程模块并返回规范化结果。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| token | string | 是 | - | 远程模块标记 |
| targetOptions | Object | 否 | - | 传递给 `getStaticPath` 的覆盖配置 |

返回值：`Promise<{ default: any }>`。

#### safeLoadModule

安全加载版本，内部捕获异常。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| token | string | 是 | - | 远程模块标记 |

返回值：`Promise<any>`，失败时返回空函数组件。

#### parseToken

解析远程模块标记。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| token | string | 是 | - | 模块标记 |

返回对象字段：

| 字段 | 类型 | 描述 |
|------|------|------|
| url | string \| null | 远程基础地址 |
| remote | string \| null | 远程容器名 |
| version | string \| null | 远程版本 |
| module.moduleName | string | 主模块名 |
| module.modulePropName | string \| undefined | 主模块属性名 |
| module.subModuleName | string \| undefined | 子模块名 |
| module.subModulePropName | string \| undefined | 子模块属性名 |

#### preset

设置并合并全局配置。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| options | Object | 否 | - | 全局配置项 |

说明：使用深度合并策略（`lodash/merge`）。

#### getGlobal

获取当前全局配置快照。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| - | - | - | - | 无参数 |

返回值：`Object`（深拷贝后的全局配置）。

#### getPublicPath

根据远程容器配置生成公共路径。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| name | string | 是 | - | `remotes` 中的容器键名 |
| options | Object | 否 | - | 覆盖配置 |

返回值：`string`。

#### getStaticPath

按模板生成静态资源路径。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| config.url | string | 是 | - | 远程基础地址 |
| config.remote | string | 是 | - | 远程容器名 |
| config.version | string | 否 | - | 版本号 |
| config.tpl | string | 否 | `{{url}}/{{remote}}/{{version}}` | 路径模板 |

返回值：`string`（以 `/` 结尾）。

#### getOrLoadRemote

获取或加载远程容器实例。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| remote | string | 是 | - | 远程容器全局名称 |
| shareScope | string \| Object | 否 | - | 共享作用域 |
| remoteFallbackUrl | string | 否 | - | 远程容器回退地址 |

返回值：`Promise<any>`。

#### loadComponent

创建远程组件加载器。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| remote | string | 是 | - | 远程容器全局名称 |
| sharedScope | string \| Object | 否 | - | 共享作用域 |
| module | string | 是 | - | 模块名（如 `./Layout`） |
| url | string | 否 | - | `remoteEntry` 地址 |

返回值：`() => Promise<any>`。

