| 属性名    | 说明                                                                                   |类型| 默认值  |
|--------|--------------------------------------------------------------------------------------| --- |------|
| loader | 加载参数{remote,url,module}remote:远程module的name,url:远程入口文件的地址,module:远程模块名，格式为【模块名@子模块名】 |object| -    |
|fallback|组件加载时渲染的loading组件|jsx| null |
|error|组件加载失败时渲染的组件|jsx|null|

其他属性将传给远程组件

#### preset

可以设置预置参数 preset({remote,url,fallback,error});
