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
