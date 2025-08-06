
# remote-loader


### 描述

加载一个webpack5生成的邦联模块


### 安装

```shell
npm i --save @kne/remote-loader
```


### 概述

remote-loader 是一个用于 React 应用程序的远程模块加载库，它基于 Webpack 5 的 Module Federation 功能，使开发者能够轻松地在应用程序中动态加载和使用远程模块。

### 主要功能

- **动态加载远程模块**：支持在运行时动态加载远程模块，无需预先打包
- **多种加载方式**：提供组件、高阶组件和钩子三种方式加载远程模块
- **灵活的配置**：支持全局配置和模块级配置
- **错误处理**：内置错误处理和回退机制
- **版本控制**：支持指定远程模块的版本
- **路径生成**：支持自定义公共路径和静态路径的生成

### 架构概述

remote-loader 的核心架构包括以下几个部分：

#### 核心组件

- **RemoteLoader**：主要的 React 组件，用于加载远程模块
- **withRemoteLoader**：高阶组件，用于包装其他组件并提供远程模块加载功能
- **useLoader**：React 钩子，用于在函数组件中加载远程模块

#### 核心功能

- **loadModule**：核心函数，处理模块加载逻辑
- **parseToken**：解析模块标记，支持复杂的模块引用格式
- **preset**：全局配置管理
- **getPublicPath**：生成公共路径
- **getStaticPath**：生成静态路径

### 使用场景

remote-loader 适用于以下场景：

- **微前端架构**：在微前端架构中，不同团队开发的模块可以通过 remote-loader 进行集成
- **动态功能加载**：根据用户权限或其他条件动态加载功能模块
- **代码分割**：将应用程序分割成多个小块，按需加载，提高性能
- **A/B 测试**：动态加载不同版本的模块进行 A/B 测试
- **渐进式升级**：在不影响现有功能的情况下，逐步升级应用程序的部分模块

### 技术依赖

- **React**：基于 React 的组件和钩子
- **Webpack 5**：利用 Webpack 5 的 Module Federation 功能
- **Lodash**：使用 Lodash 的模板功能生成路径

### 工作流程

1. 配置远程容器和入口文件
2. 使用 RemoteLoader 组件、withRemoteLoader 高阶组件或 useLoader 钩子加载远程模块
3. remote-loader 解析模块标记，确定远程容器、模块名称和版本
4. 加载远程模块并处理加载状态和错误
5. 将加载的模块渲染到应用程序中


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
                    valueOf: () => ({ type: "success", text: "审核通过" }),
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
                    valueOf: () => ({ gender: "F" }),
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
                    render: ({ target }) => {
                        return target.count === 5 ? { hover: true } : { hover: false };
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


### API

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

