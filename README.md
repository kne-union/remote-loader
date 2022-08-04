
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
- remoteLoader(@kne/remote-loader),reactRouter(react-router-dom)

```jsx
const { default: Remote } = remoteLoader;
const {BrowserRouter} = reactRouter;

const BaseExample = () => {
  return <BrowserRouter>
    <Remote loader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "Navigation"
    }} />
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
    <Remote loader={{
      remote: "ui_components",
      url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js",
      module: "Account@OuterContainer"
    }}>
      <Remote loader={{
        remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "Account@Login"
      }} />
    </Remote>
  </BrowserRouter>;
};

render(<BaseExample />);

```


### API

| 属性名    | 说明                                                                                   |类型| 默认值  |
|--------|--------------------------------------------------------------------------------------| --- |------|
| loader | 加载参数{remote,url,module}remote:远程module的name,url:远程入口文件的地址,module:远程模块名，格式为【模块名@子模块名】 |object| -    |
|fallback|组件加载时渲染的loading组件|jsx| null |
|error|组件加载失败时渲染的组件|jsx|null|

其他属性将传给远程组件

#### preset

可以设置预置参数 preset({remote,url,fallback,error});

