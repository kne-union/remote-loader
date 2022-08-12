
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
const { default: Remote } = remoteLoader;
const { BrowserRouter } = reactRouter;
const {range} = _;

const BaseExample = () => {
  return <BrowserRouter>
    <Remote remoteLoader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "Navigation"
    }} />
    <Remote remoteLoader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "TablePage"
    }} columns={[
      {
        title: '职位名称',
        key: 'positionName',
        fixed: 'left',
        dataIndex: 'positionName'
      }, {
        title: '客户名称',
        key: 'clientName',
        dataIndex: 'clientName'
      }, {
        title: '工作地点',
        key: 'city',
        dataIndex: 'city'
      }, {
        title: '职位开始时间',
        key: 'startTime',
        dataIndex: 'startTime'
      }
    ]} data={{currentPage: 1, perPage: 20}} loader={({data})=>{
      return {
        data:{
          pageData: range(data.perPage).map((index) => ({
            id: index + (data.currentPage - 1) * data.perPage + 1,
            positionName: "市场运营总监" + (index + (data.currentPage - 1) * data.perPage + 1),
            clientName: "大众",
            city: "北京",
            startTime: "2020-01-10"
          })),
          totalCount: 100
        }
      }
    }}/>
  </BrowserRouter>;
};

render(<BaseExample />);

```

- 加载一个子模块
- 加载一个子模块
- remoteLoader(@kne/remote-loader),reactRouter(react-router-dom)

```jsx
const { default: Remote } = remoteLoader;
const { BrowserRouter } = reactRouter;

const BaseExample = () => {
  return <BrowserRouter>
    <Remote remoteLoader={{
      remote: "ui_components",
      url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js",
      module: "Account@OuterContainer"
    }}>
      <Remote remoteLoader={{
        remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "Account@Login"
      }} />
    </Remote>
  </BrowserRouter>;
};

render(<BaseExample />);

```


### API

| 属性名          | 说明                                                                                   |类型| 默认值  |
|--------------|--------------------------------------------------------------------------------------| --- |------|
| remoteLoader | 加载参数{remote,url,module}remote:远程module的name,url:远程入口文件的地址,module:远程模块名，格式为【模块名@子模块名】 |object| -    |
| fallback     | 组件加载时渲染的loading组件                                                                    |jsx| null |
| remoteError  | 组件加载失败时渲染的组件                                                                         |jsx|null|
| module       | 等同于loader里传入module，为了更方便使用而设置。如果loader中存在module参数优先取loader的module                    |string|-|

其他属性将传给远程组件

#### preset

可以设置预置参数 preset({remote,url,fallback,error});

