| 属性名          | 说明                                                                                         |类型| 默认值  |
|--------------|--------------------------------------------------------------------------------------------| --- |------|
| remoteLoader | 加载参数{remote,url,module}remote:远程module的name,url:远程入口文件的地址,module:远程模块名，格式为【模块名@子模块名.属性模块名】 |object| -    |
| fallback     | 组件加载时渲染的loading组件                                                                          |jsx| null |
| remoteError  | 组件加载失败时渲染的组件                                                                               |jsx|null|
| module       | 等同于loader里传入module，为了更方便使用而设置。如果loader中存在module参数优先取loader的module                          |string|-|
| onLoadComplete| 当组件加载完成并且mount完毕的时候调用该方法                                                                   |function|-|

其他属性将传给远程组件

#### withRemoteLoader

注意: 推荐使用createWithRemoteLoader，如果必须使用该高阶组件请将modules参数包裹在useMemo里面或者放在组件外边，防止由于其父组件render导致其引用地址发生变化触发不必要的render

withRemoteLoader(WrappedComponent)

| 属性名            | 说明                                                                                                              | 类型     | 默认值  |
|----------------|-----------------------------------------------------------------------------------------------------------------|--------|------|
| remoteLoader   | 加载参数{remote,url,module}remote:远程module的name,url:远程入口文件的地址,module:远程模块名，格式为【模块名@子模块名.属性模块名】                      | object | -    |
| fallback       | 组件加载时渲染的loading组件                                                                                               | jsx    | null |
| remoteError    | 组件加载失败时渲染的组件                                                                                                    | jsx    |null|
| modules        | 注意这里的参数和RemoteLoader有所不同，这里参数为数组可以并发加载多个组件，加载完成后render传入WrappedComponent组件。该方法可以用来批量加载组件或者加载非React Component的模块 | array  |-|

#### createWithRemoteLoader

withRemoteLoader的高阶函数，可以将部分参数提前传入，不必在调用withRemoteLoader(WrappedComponent) 时再传入参数

#### preset

可以设置预置参数 preset({remote,url,fallback,error});

