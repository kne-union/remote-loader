
# remote-loader


### 描述

加载一个webpack5生成的邦联模块


### 安装

```shell
npm i --save @kne/remote-loader
```


### 概述

加载一个webpack5生成的邦联模块

* 支持自定义加载url
* 支持子模块加载


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

| 属性名          | 说明                                     |类型| 默认值  |
|--------------|----------------------------------------| --- |------|
| fallback     | 组件加载时渲染的loading组件                      |jsx| null |
| remoteError  | 组件加载失败时渲染的组件                           |jsx|null|
| module       | [模块地址/remote/version:]模块名[@子模块][.模块属性] |string|-|
| onLoadComplete| 当组件加载完成并且mount完毕的时候调用该方法               |function|-|

其他属性将传给远程组件

#### withRemoteLoader

注意: 推荐使用createWithRemoteLoader，如果必须使用该高阶组件请将modules参数包裹在useMemo里面或者放在组件外边，防止由于其父组件render导致其引用地址发生变化触发不必要的render

withRemoteLoader(WrappedComponent)

| 属性名            | 说明                       | 类型     | 默认值  |
|----------------|--------------------------|--------|------|
| fallback       | 组件加载时渲染的loading组件        | jsx    | null |
| remoteError    | 组件加载失败时渲染的组件             | jsx    |null|
| modules        | 一个模块token数组，模块token的格式为：[模块地址/remote/version:]模块名[@子模块][.模块属性] | array  |-|

#### createWithRemoteLoader

withRemoteLoader的高阶函数，可以将部分参数提前传入，不必在调用withRemoteLoader(WrappedComponent) 时再传入参数

#### preset

可以设置预置参数 preset({remotes,fallback,error});


