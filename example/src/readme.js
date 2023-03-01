import * as component_1 from '@kne/remote-loader';
import * as component_2 from 'react-router-dom';
import * as component_3 from 'lodash';
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
<td>[模块地址/remote/version:]模块名[@子模块][.模块属性]</td>
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
<p>注意: 推荐使用createWithRemoteLoader，如果必须使用该高阶组件请将modules参数包裹在useMemo里面或者放在组件外边，防止由于其父组件render导致其引用地址发生变化触发不必要的render</p>
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
<td>一个模块token数组，模块token的格式为：[模块地址/remote/version:]模块名[@子模块][.模块属性]</td>
<td>array</td>
<td>-</td>
</tr>
</tbody>
</table>
<h4>createWithRemoteLoader</h4>
<p>withRemoteLoader的高阶函数，可以将部分参数提前传入，不必在调用withRemoteLoader(WrappedComponent) 时再传入参数</p>
<h4>preset</h4>
<p>可以设置预置参数 preset({remotes,fallback,error});</p>`,
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
    code: `const {default: Remote, loadModule, preset} = remoteLoader;
const {range} = _;

preset({
    remotes: {
        default: {
            url: 'http://ued.dev.fatalent.cn', remote: 'ui_components'
        }, exceed_components: {
            url: 'http://ued.dev.fatalent.cn/ui_components', remote: 'exceed_components', defaultVersion: '1.0.0'
        }
    }
});

loadModule('http://localhost:3001/ui_components/components-core/0.1.0:components').then((module)=>{
    console.log(module);
});

const BaseExample = () => {
    return <Remote module="Global">
        <Remote module="exceed_components:Content"
                list={[{label: '标题', content: '内容'}, {label: '标题标题', content: '内容内容'}, {
                    label: '标题标', content: '内容内容内容内容内容内容内容内容内容内容'
                }, {
                    label: '标题标题标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                }]}/>
        <Remote module="exceed_components/1.0.0:TablePage" columns={[{
            title: '职位名称', key: 'positionName', fixed: 'left', dataIndex: 'positionName'
        }, {
            title: '客户名称', key: 'clientName', dataIndex: 'clientName'
        }, {
            title: '工作地点', key: 'city', dataIndex: 'city'
        }, {
            title: '职位开始时间', key: 'startTime', dataIndex: 'startTime'
        }, {
            title: '职位结束时间', key: 'endTime', dataIndex: 'endTime'
        }]} data={{currentPage: 1, perPage: 10}} loader={({data}) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        pageData: range(data.perPage).map((index) => ({
                            id: index + (data.currentPage - 1) * data.perPage + 1,
                            positionName: "市场运营总监" + (index + (data.currentPage - 1) * data.perPage + 1),
                            clientName: "大众",
                            city: "北京",
                            startTime: "2020-01-10",
                            endTime: "2020-02-10"
                        })), totalCount: 48
                    });
                }, 1000);
            });
        }}/>
    </Remote>;
};

render(<BaseExample/>);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_1
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_2
},{
    name: "_",
    packageName: "lodash",
    component: component_3
}]
}]
    }
};
export default readmeConfig;
