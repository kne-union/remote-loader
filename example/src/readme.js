import * as component_21 from '@kne/remote-loader';
import * as component_22 from 'react-router-dom';
const readmeConfig = {
    name: `@kne/remote-loader`,
    description: `加载一个webpack5生成的邦联模块`,
    summary: `<p>加载一个webpack5生成的邦联模块</p>
<ul>
<li>支持自定义加载url</li>
<li>支持子模块加载</li>
</ul>`,
    api: `<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>loader</td>
<td>加载参数{remote,url,module}remote:远程module的name,url:远程入口文件的地址,module:远程模块名，格式为【模块名@子模块名】</td>
<td>object</td>
<td>-</td>
</tr>
<tr>
<td>fallback</td>
<td>组件加载时渲染的loading组件</td>
<td>jsx</td>
<td>null</td>
</tr>
<tr>
<td>error</td>
<td>组件加载失败时渲染的组件</td>
<td>jsx</td>
<td>null</td>
</tr>
</tbody>
</table>
<p>其他属性将传给远程组件</p>
<h4>preset</h4>
<p>可以设置预置参数 preset({remote,url,fallback,error});</p>`,
    example: {
        isFull: true,
        className: `remote_loader_4f65d`,
        style: `.remote_loader_4f65d .ant-space-vertical {
  width: 100%; }

.remote_loader_4f65d .container {
  background: #FFF; }
`,
        list: [{
    title: `加载一个模块`,
    description: `加载一个模块`,
    code: `const { default: Remote } = remoteLoader;
const {BrowserRouter} = reactRouter;

const BaseExample = () => {
  return <BrowserRouter>
    <Remote loader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "Navigation"
    }} />
  </BrowserRouter>;
};

render(<BaseExample />);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_21
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_22
}]
},{
    title: `加载一个子模块`,
    description: `加载一个子模块`,
    code: `const { default: Remote } = remoteLoader;
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

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_21
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_22
}]
}]
    }
};
export default readmeConfig;
