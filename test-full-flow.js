// 完整流程测试

// 模拟 parseToken
const parseToken = (token) => {
  // 简化版本，假设 token 是 "components-core:Global"
  return {
    url: null,
    remote: 'components-core',
    version: null,
    module: {
      moduleName: 'Global',
      modulePropName: null,
      subModuleName: null,
      subModulePropName: null
    }
  };
};

// 模拟配置
const remotes = {
  'default': {
    url: 'https://npm-1253674045.cos.ap-shanghai.myqcloud.com',
    tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build',
    remote: 'components-core',
    defaultVersion: '0.4.64'
  },
  'components-core': {
    url: 'https://npm-1253674045.cos.ap-shanghai.myqcloud.com',
    tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build',
    remote: 'components-core',
    defaultVersion: '0.4.64'
  }
};

const token = 'components-core:Global';
const tokenObject = parseToken(token);

console.log('=== Token 解析 ===');
console.log('输入 token:', token);
console.log('解析结果:', tokenObject);
console.log('');

// 获取配置
const remoteConfig = tokenObject.remote ? remotes[tokenObject.remote] : null;
console.log('=== 配置查找 ===');
console.log('查找 key:', tokenObject.remote);
console.log('找到配置:', remoteConfig);
console.log('');

// 构建选项
const options = {
  url: remoteConfig.url,
  remote: remoteConfig.remote,
  version: remoteConfig.defaultVersion,
  tpl: remoteConfig.tpl
};

console.log('=== 最终选项 ===');
console.log(options);
console.log('');

// 生成 URL
const template = (str, data) => {
  return str.replace(/{{([\s\S]+?)}}/g, (match, key) => {
    const value = data[key.trim()];
    console.log(`  替换 {{${key.trim()}}} => ${value}`);
    return value || '';
  });
};

console.log('=== URL 生成 ===');
const url = template(options.tpl, {
  url: options.url,
  remote: options.remote,
  version: options.version
});
console.log('最终 URL:', url);
console.log('');

// 检查是否有任何地方会错误地修改 remote
console.log('=== 检查 remote 值 ===');
console.log('options.remote:', options.remote);
console.log('remoteConfig.remote:', remoteConfig.remote);
console.log('tokenObject.remote:', tokenObject.remote);
