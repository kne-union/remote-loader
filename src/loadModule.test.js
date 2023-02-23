test('加载完整要素token', () => {
    jest.resetModules();
    jest.mock('./loadComponent.js', () => {
        return {
            loadComponent: (remote, sharedScope, module, url) => {
                expect(remote).toBe('ui_component');
                expect(module).toBe('./Layout');
                expect(url).toBe('http://static.example.com/ui_component/1.0/remoteEntry.js');
                return () => {
                    return Promise.resolve({
                        Page: {
                            Header: 'Header Component'
                        }
                    });
                }
            }
        };
    });

    jest.mock('./parseToken.js', () => {
        return () => {
            return {
                url: 'http://static.example.com/ui_component/1.0', version: '1.0', remote: 'ui_component', module: {
                    moduleName: 'Layout', subModuleName: 'Page', subModulePropName: 'Header'
                }
            };
        };
    });

    const loadModule = require("./loadModule");
    loadModule.default().then((Module) => {
        expect(Module.default).toBe('Header Component');
    });
});

test('加载最简单token', () => {
    jest.resetModules();
    jest.mock('../src/loadComponent.js', () => {
        return {
            loadComponent: () => {
                return () => {
                    return Promise.resolve({
                        default: 'Layout Component'
                    });
                }
            }
        };
    });

    jest.mock('../src/parseToken.js', () => {
        return () => {
            return {
                url: 'http://static.example.com/ui_component/1.0', version: '1.0', remote: 'ui_component', module: {
                    moduleName: 'Layout'
                }
            };
        };
    });

    const loadModule = require("../src/loadModule");
    loadModule.default().then((Module) => {
        expect(Module.default).toBe('Layout Component');
    });
});

test('加载子模块token', () => {
    jest.resetModules();
    jest.mock('./loadComponent.js', () => {
        return {
            loadComponent: () => {
                return () => {
                    return Promise.resolve({
                        Page: 'Page Component'
                    });
                }
            }
        };
    });

    jest.mock('./parseToken.js', () => {
        return () => {
            return {
                url: 'http://static.example.com/ui_component', remote: 'ui_component', module: {
                    moduleName: 'Layout', subModuleName: 'Page'
                }
            };
        };
    });

    const loadModule = require("./loadModule");
    loadModule.default().then((Module) => {
        expect(Module.default).toBe('Page Component');
    });
});

test('加载模块属性token', () => {
    jest.resetModules();
    jest.mock('./loadComponent.js', () => {
        return {
            loadComponent: () => {
                const Component = () => {
                };
                Component.Header = 'Header Component';
                return () => {
                    return Promise.resolve({
                        default: Component
                    });
                }
            }
        };
    });

    jest.mock('./parseToken.js', () => {
        return () => {
            return {
                url: 'http://static.example.com/ui_component', remote: 'ui_component', module: {
                    moduleName: 'Layout', modulePropName: 'Header'
                }
            };
        };
    });

    const loadModule = require("./loadModule");
    loadModule.default().then((Module) => {
        expect(Module.default).toBe('Header Component');
    });
});

test('获取preset中默认设置', () => {
    jest.resetModules();
    const preset = require('./preset').default;

    preset({
        remotes: {
            default: {
                url: 'http://static.example.com', remote: 'ui_component',
            }
        }
    });
    jest.mock('./loadComponent.js', () => {
        return {
            loadComponent: (remote, sharedScope, module, url) => {
                expect(remote).toBe('ui_component');
                expect(module).toBe('./Layout');
                expect(url).toBe('http://static.example.com/ui_component/remoteEntry.js');
                return () => {
                    return Promise.resolve({});
                }
            }
        };
    });

    jest.mock('./parseToken.js', () => {
        return () => {
            return {
                module: {
                    moduleName: 'Layout'
                }
            };
        };
    });

    const loadModule = require("../src/loadModule");
    loadModule.default();
});

test('获取preset中默认设置补充url信息', () => {
    jest.resetModules();
    const preset = require('./preset').default;

    preset({
        remotes: {
            'ui_component': {
                url: 'http://static.example.com', remote: 'ui_component', defaultVersion: '1.0'
            }
        }
    });
    jest.mock('./loadComponent.js', () => {
        return {
            loadComponent: (remote, sharedScope, module, url) => {
                expect(remote).toBe('ui_component');
                expect(module).toBe('./Layout');
                expect(url).toBe('http://static.example.com/ui_component/1.2/remoteEntry.js');
                return () => {
                    return Promise.resolve({});
                }
            }
        };
    });

    jest.mock('./parseToken.js', () => {
        return () => {
            return {
                remote: 'ui_component', version: '1.2', module: {
                    moduleName: 'Layout'
                }
            };
        };
    });

    const loadModule = require("../src/loadModule");
    loadModule.default();
});

test('获取preset中默认设置带有defaultVersion', () => {
    jest.resetModules();
    const preset = require('./preset').default;

    preset({
        remotes: {
            default: {
                url: 'http://static.example.com', remote: 'ui_component', defaultVersion: '1.0'
            }
        }
    });
    jest.mock('./loadComponent.js', () => {
        return {
            loadComponent: (remote, sharedScope, module, url) => {
                expect(remote).toBe('ui_component');
                expect(module).toBe('./Layout');
                expect(url).toBe('http://static.example.com/ui_component/1.0/remoteEntry.js');
                return () => {
                    return Promise.resolve({});
                }
            }
        };
    });

    jest.mock('./parseToken.js', () => {
        return () => {
            return {
                module: {
                    moduleName: 'Layout'
                }
            };
        };
    });

    const loadModule = require("../src/loadModule");
    loadModule.default();
});

test('获取preset中其他模块设置', () => {
    jest.resetModules();
    const preset = require('./preset').default;
    preset({
        remotes: {
            default: {
                url: 'http://static.example.com', remote: 'ui_component'
            }, componentCore: {
                url: 'http://static.example.com', remote: 'component_core'
            }
        }
    });
    jest.mock('./loadComponent.js', () => {
        return {
            loadComponent: (remote, sharedScope, module, url) => {
                expect(remote).toBe('component_core');
                expect(module).toBe('./Layout');
                expect(url).toBe('http://static.example.com/component_core/remoteEntry.js');
                return () => {
                    return Promise.resolve({});
                }
            }
        };
    });

    jest.mock('./parseToken.js', () => {
        return () => {
            return {
                remote: 'componentCore', module: {
                    moduleName: 'Layout'
                }
            };
        };
    });

    const loadModule = require("./loadModule");
    loadModule.default();
});

test('获取preset中其他模块设置带有defaultVersion', () => {
    jest.resetModules();
    const preset = require('./preset').default;
    preset({
        remotes: {
            default: {
                url: 'http://static.example.com', remote: 'ui_component', defaultVersion: '1.0'
            }, componentCore: {
                url: 'http://static.example.com', remote: 'component_core', defaultVersion: '1.1'
            }
        }
    });
    jest.mock('./loadComponent.js', () => {
        return {
            loadComponent: (remote, sharedScope, module, url) => {
                expect(remote).toBe('component_core');
                expect(module).toBe('./Layout');
                expect(url).toBe('http://static.example.com/component_core/1.1/remoteEntry.js');
                return () => {
                    return Promise.resolve({});
                }
            }
        };
    });

    jest.mock('./parseToken.js', () => {
        return () => {
            return {
                remote: 'componentCore', module: {
                    moduleName: 'Layout'
                }
            };
        };
    });

    const loadModule = require("./loadModule");
    loadModule.default();
});