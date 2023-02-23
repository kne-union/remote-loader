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

