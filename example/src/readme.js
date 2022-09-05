import * as component_71 from '@kne/remote-loader';
import * as component_72 from 'react-router-dom';
import * as component_73 from 'lodash';
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
<td>加载参数{remote,url,module}remote:远程module的name,url:远程入口文件的地址,module:远程模块名，格式为【模块名@子模块名.属性模块名】</td>
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
<tr>
<td>onLoadComplete</td>
<td>当组件加载完成并且mount完毕的时候调用该方法</td>
<td>function</td>
<td>-</td>
</tr>
</tbody>
</table>
<p>其他属性将传给远程组件</p>
<h4>withRemoteLoader</h4>
<p>withRemoteLoader(WrappedComponent)</p>
<table>
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
<td>加载参数{remote,url,module}remote:远程module的name,url:远程入口文件的地址,module:远程模块名，格式为【模块名@子模块名.属性模块名】</td>
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
<td>modules</td>
<td>注意这里的参数和RemoteLoader有所不同，这里参数为数组可以并发加载多个组件，加载完成后render传入WrappedComponent组件。该方法可以用来批量加载组件或者加载非React Component的模块</td>
<td>array</td>
<td>-</td>
</tr>
</tbody>
</table>
<h4>createWithRemoteLoader</h4>
<p>withRemoteLoader的高阶函数，可以将部分参数提前传入，不必在调用withRemoteLoader(WrappedComponent) 时再传入参数</p>
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
const { range } = _;
const { useRef } = React;

const BaseExample = () => {
  const ref = useRef(null);
  return <BrowserRouter>
    <Remote remoteLoader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "Navigation"
    }} isFixed={false}/>
    <Remote ref={ref} remoteLoader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "TablePage"
    }} onLoadComplete={()=>{
      console.log(ref);
    }} columns={[
      {
        title: "职位名称",
        key: "positionName",
        fixed: "left",
        dataIndex: "positionName"
      }, {
        title: "客户名称",
        key: "clientName",
        dataIndex: "clientName"
      }, {
        title: "工作地点",
        key: "city",
        dataIndex: "city"
      }, {
        title: "职位开始时间",
        key: "startTime",
        dataIndex: "startTime"
      }
    ]} data={{ currentPage: 1, perPage: 20 }} loader={({ data }) => {
      return {
        pageData: range(data.perPage).map((index) => ({
          id: index + (data.currentPage - 1) * data.perPage + 1,
          positionName: "市场运营总监" + (index + (data.currentPage - 1) * data.perPage + 1),
          clientName: "大众",
          city: "北京",
          startTime: "2020-01-10"
        })),
        totalCount: 100
      };
    }} />
  </BrowserRouter>;
};

render(<BaseExample />);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_71
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_72
},{
    name: "_",
    packageName: "lodash",
    component: component_73
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
    component: component_71
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_72
}]
},{
    title: `高阶组件批量加载组件`,
    description: `高阶组件批量加载组件`,
    code: `const { createWithRemoteLoader } = remoteLoader;
const { BrowserRouter } = reactRouter;

const BaseExample = createWithRemoteLoader({
  remoteLoader: { remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js" },
  modules: ["Account@OuterContainer", "Account@Login"]
})(({ remoteModules }) => {
  const [OuterContainer, Login] = remoteModules;
  return <BrowserRouter>
    <OuterContainer>
      <Login />
    </OuterContainer>
  </BrowserRouter>;
});

render(<BaseExample />);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_71
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_72
}]
},{
    title: `加载一个属性模块`,
    description: `加载一个属性模块`,
    code: `const { default: Remote } = remoteLoader;

const BaseExample = () => {
  return <Remote remoteLoader={{
      remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "InfoPage"
    }}>
      <Remote remoteLoader={{
        remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "InfoPage.Part"
      }} title="退票信息">
        <Remote remoteLoader={{
          remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "TableInfo"
        }} dataSource={[
          [{ label: "客户名称", content: "腾讯" }, { label: "发票抬头", content: "腾讯科技公司" }],
          [{ label: "发票类型", content: "增值税专用发票" }, { label: "发票开具日期", content: "2022-08-15" }],
          [{ label: "退票金额", content: "22000.00元" }],
          [{
            label: "发票号", content: <div>
              <div>00384895992774</div>
              <div>00384895992774</div>
              <div>00384895992774</div>
              <div>00384895992774</div>
            </div>
          }],
          [{ label: "是否需要重开发票", content: "否" }, { label: "是否涉及金融变动", content: "否" }],
          [{ label: "是否造成实质损失", content: "否" }, { label: "责任归属", content: "客户原因" }],
          [{ label: "退票原因", content: "退票原因的描述退票原因的描述退票原因的描" }],
          [{ label: "附件", content: "附件名称" }],
          [{ label: "操作时间", content: "2022-08-01 16:32" }, { label: "操作人", content: "西西歪" }]
        ]}></Remote>
      </Remote>
    </Remote>;
};

render(<BaseExample />);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_71
}]
}]
    }
};
export default readmeConfig;
