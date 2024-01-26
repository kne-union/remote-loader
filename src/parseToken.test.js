import parseToken from './parseToken';

test('解析完整要素token', () => {
    expect(parseToken('http://static.example.com/ui_component/1.0:Layout@Page.Header')).toEqual({
        url: 'http://static.example.com', remote: 'ui_component', version: '1.0', module: {
            moduleName: 'Layout', subModuleName: 'Page', subModulePropName: 'Header'
        }
    });
});

test('解析无address的token', () => {
    expect(parseToken('ui_component/1.0:Layout@Page.Header')).toEqual({
        url: null, version: '1.0', remote: 'ui_component', module: {
            moduleName: 'Layout', subModuleName: 'Page', subModulePropName: 'Header'
        }
    });
});

test('解析无version的token', () => {
    expect(parseToken('http://static.example.com/ui_component:Layout@Page.Header')).toEqual({
        url: 'http://static.example.com', version: null, remote: 'ui_component', module: {
            moduleName: 'Layout', subModuleName: 'Page', subModulePropName: 'Header'
        }
    });
});

test('解析无address无version的token', () => {
    expect(parseToken('ui_component:Layout@Page.Header')).toEqual({
        url: null, version: null, remote: 'ui_component', module: {
            moduleName: 'Layout', subModuleName: 'Page', subModulePropName: 'Header'
        }
    });
});

test('解析最简单token', () => {
    expect(parseToken('http://static.example.com/ui_component/1.0:Layout')).toEqual({
        url: 'http://static.example.com', remote: 'ui_component', version: '1.0', module: {
            moduleName: 'Layout'
        }
    });
});

test('解析只带有子模块token', () => {
    expect(parseToken('http://static.example.com/ui_component/1.0:Layout@Page')).toEqual({
        url: 'http://static.example.com', remote: 'ui_component', version: '1.0', module: {
            moduleName: 'Layout', subModuleName: 'Page'
        }
    });
});

test('解析缺省地址token', () => {
    expect(parseToken('Layout@Page.Header')).toEqual({
        url: null, remote: null, version: null, module: {
            moduleName: 'Layout', subModuleName: 'Page', subModulePropName: 'Header'
        }
    });
});

test('解析主模块属性token', () => {
    expect(parseToken('Layout.Header')).toEqual({
        url: null, remote: null, version: null, module: {
            moduleName: 'Layout', modulePropName: 'Header'
        }
    });
});
