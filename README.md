
# remote-loader


### 描述

加载一个webpack5生成的邦联模块


### 安装

```shell
npm i --save @kne/remote-loader
```


### 概述

remote-loader 是一个用于 React 应用程序的远程模块加载库，它基于 Webpack 5 的 Module Federation 功能，使开发者能够轻松地在应用程序中动态加载和使用远程模块。

这个库特别适合构建微前端架构，允许不同团队独立开发和部署各自的模块，然后在运行时动态集成。通过 remote-loader，你可以实现真正的模块化开发，每个模块都可以独立构建、版本控制和更新，而无需重新部署整个应用。

### 核心特性

remote-loader 提供了三种灵活的加载方式来满足不同的开发场景：

- **RemoteLoader 组件**：声明式组件方式，简单直观，适合大多数场景
- **withRemoteLoader 高阶组件**：函数式编程方式，适合需要批量加载多个模块的场景
- **useLoader 钩子**：Hook 方式，适合在函数组件中进行细粒度控制

### 灵活的模块标记

支持丰富的模块标记格式，可以指定远程地址、版本、子模块等：

- 简单格式：`module-name`
- 带远程：`remoteName:module-name`
- 带版本：`remoteName:module-name@version`
- 带子模块：`remoteName:module-name@sub-module`
- 带属性访问：`remoteName:module-name.property`
- 完整格式：`http://example.com/remoteName/version:module-name@sub-module.property`

### 全局配置与缓存

通过 `preset` 函数可以设置全局配置，包括远程容器地址、默认版本、加载状态组件和错误处理等。内置的缓存机制确保同一模块只会被加载一次，提升性能。

### 完善的错误处理

提供了多层次的错误处理机制，包括全局错误回退、组件级错误回退和错误回调函数，确保应用在模块加载失败时仍然能够优雅降级。


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

- 加载一个模块
- 加载一个模块
- remoteLoader(@kne/remote-loader),reactRouter(react-router-dom),_(lodash)

```jsx
const {default: Remote, preset} = remoteLoader;
const {range} = _;

const BaseExample = () => {
    return <div>
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

- 加载一个属性模块
- 加载一个属性模块
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

- JSX props 更新与重建排查
- module 固定为字符串，传入 JSX props，观察是否发生异常重建
- remoteLoader(@kne/remote-loader)

```jsx
const {createWithRemoteLoader} = remoteLoader;
const {useEffect, useMemo, useState} = React;

const LogNode = ({label}) => {
    useEffect(() => {
        console.log(`[mount] ${label}`);
        return () => {
            console.log(`[unmount] ${label}`);
        };
    }, [label]);

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

