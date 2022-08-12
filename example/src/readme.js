import * as component_13 from '@kne/remote-loader';
import * as component_14 from 'react-router-dom';
import * as component_15 from 'lodash';
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
<td>remoteLoader</td>
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
<td>remoteError</td>
<td>组件加载失败时渲染的组件</td>
<td>jsx</td>
<td>null</td>
</tr>
<tr>
<td>module</td>
<td>等同于loader里传入module，为了更方便使用而设置。如果loader中存在module参数优先取loader的module</td>
<td>string</td>
<td>-</td>
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
const { BrowserRouter } = reactRouter;
const {range} = _;

const BaseExample = () => {
  return <BrowserRouter>
    <Remote remoteLoader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "Navigation"
    }} />
    <Remote remoteLoader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "TablePage"
    }} columns={[
      {
        title: '职位名称',
        key: 'positionName',
        fixed: 'left',
        dataIndex: 'positionName'
      }, {
        title: '客户名称',
        key: 'clientName',
        dataIndex: 'clientName'
      }, {
        title: '工作地点',
        key: 'city',
        dataIndex: 'city'
      }, {
        title: '职位开始时间',
        key: 'startTime',
        dataIndex: 'startTime'
      }
    ]} data={{currentPage: 1, perPage: 20}} loader={({data})=>{
      return {
        data:{
          pageData: range(data.perPage).map((index) => ({
            id: index + (data.currentPage - 1) * data.perPage + 1,
            positionName: "市场运营总监" + (index + (data.currentPage - 1) * data.perPage + 1),
            clientName: "大众",
            city: "北京",
            startTime: "2020-01-10"
          })),
          totalCount: 100
        }
      }
    }}/>
  </BrowserRouter>;
};

render(<BaseExample />);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_13
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_14
},{
    name: "_",
    packageName: "lodash",
    component: component_15
}]
},{
    title: `加载一个子模块`,
    description: `加载一个子模块`,
    code: `const { default: Remote } = remoteLoader;
const { BrowserRouter } = reactRouter;

const BaseExample = () => {
  return <BrowserRouter>
    <Remote remoteLoader={{
      remote: "ui_components",
      url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js",
      module: "Account@OuterContainer"
    }}>
      <Remote remoteLoader={{
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
    component: component_13
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_14
}]
}]
    }
};
export default readmeConfig;
