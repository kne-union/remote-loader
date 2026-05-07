// 测试 1.4.6 版本的 bug

const resolveOptions = (options) => {
  return {
    url: options.url,
    remote: options.remote,
    version: options.version,
    tpl: options.tpl
  };
};

const getRemoteWithVersion = (options) => {
  const resolved = resolveOptions(options);
  return resolved.version ? `${resolved.remote}_${resolved.version}` : resolved.remote;
};

const getStaticPath = ({url, remote, version, tpl}) => {
  const template = (str, data) => {
    return str.replace(/{{([\s\S]+?)}}/g, (match, key) => {
      return data[key.trim()] || '';
    });
  };
  const compiled = template(tpl || '{{url}}/{{remote}}/{{version}}', {
    url: url || '',
    remote: remote || '',
    version: version || ''
  });
  return compiled;
};

// 测试配置
const config = {
  url: 'https://npm-1253674045.cos.ap-shanghai.myqcloud.com',
  remote: 'components-core',
  version: '0.4.64',
  tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build'
};

console.log('=== 测试 1.4.6 版本的逻辑 ===');
console.log('输入配置:', config);
console.log('');

const remoteWithVersion = getRemoteWithVersion(config);
console.log('getRemoteWithVersion 结果:', remoteWithVersion);
// 预期: components-core_0.4.64

const staticPath = getStaticPath(config);
console.log('getStaticPath 结果:', staticPath);
// 预期: https://npm-1253674045.cos.ap-shanghai.myqcloud.com/packages/@kne-components/components-core/0.4.64/build

console.log('');
console.log('=== 问题分析 ===');
console.log('formatRemote 会将 remote 转换为:', remoteWithVersion.replace(/[-/.@]/g, '_'));
// components_core_0_4_64

console.log('');
console.log('=== 结论 ===');
console.log('URL 路径使用的是:', config.remote, '(正确)');
console.log('window 全局变量使用的是:', remoteWithVersion.replace(/[-/.@]/g, '_'), '(正确)');
console.log('');
console.log('问题可能不在这里，让我检查其他地方...');
