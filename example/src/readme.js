import * as component_91 from '@kne/remote-loader';
import * as component_92 from 'react-router-dom';
import * as component_93 from 'lodash';
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
    code: `const {default: Remote, preset} = remoteLoader;
const {range} = _;

const BaseExample = () => {
    return <Remote module="http://ued.dev.fatalent.cn/ui_components:Global">
        <Remote module="Content"
                list={[{label: '标题', content: '内容'}, {label: '标题标题', content: '内容内容'}, {
                    label: '标题标', content: '内容内容内容内容内容内容内容内容内容内容'
                }, {
                    label: '标题标题标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                }]}/>
        <Remote module="http://ued.dev.fatalent.cn/ui_components:TablePage" columns={[{
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
    component: component_91
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_92
},{
    name: "_",
    packageName: "lodash",
    component: component_93
}]
},{
    title: `高阶组件批量加载组件`,
    description: `高阶组件批量加载组件`,
    code: `const {createWithRemoteLoader, preset} = remoteLoader;
const {BrowserRouter} = reactRouter;
const {useState, useEffect} = React;

preset({
    remotes: {
        default: {
            url: 'http://ued.dev.fatalent.cn', remote: 'ui_components'
        }
    }
});

const BaseExample = createWithRemoteLoader({
    modules: ["Account@OuterContainer", "Account@Login"]
})(({remoteModules, testProps}) => {
    const [OuterContainer, Login] = remoteModules;
    useEffect(() => {
        console.log('mount');
    }, []);
    console.log(testProps);
    return <BrowserRouter>
        <OuterContainer>
            <Login/>
        </OuterContainer>
    </BrowserRouter>;
});

const Outer = () => {
    const [value, setValue] = useState(false);
    return <div>
        <button onClick={() => {
            setValue(!value);
        }}>按钮
        </button>
        <BaseExample testProps={value}/>
    </div>;
};

render(<Outer/>);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_91
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_92
}]
},{
    title: `加载一个子模块`,
    description: `加载一个子模块`,
    code: `const {default: Remote, preset} = remoteLoader;
const {BrowserRouter} = reactRouter;

preset({
    remotes: {
        default: {
            url: 'http://ued.dev.fatalent.cn', remote: 'ui_components'
        }
    }
});

const BaseExample = () => {
    return <BrowserRouter>
        <Remote module="Account@OuterContainer">
            <Remote module="Account@Login"/>
        </Remote>
    </BrowserRouter>;
};

render(<BaseExample/>);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_91
},{
    name: "reactRouter",
    packageName: "react-router-dom",
    component: component_92
}]
},{
    title: `加载一个属性模块`,
    description: `加载一个属性模块`,
    code: `const {default: Remote, preset} = remoteLoader;

preset({
    remotes: {
        default: {
            url: 'http://ued.dev.fatalent.cn', remote: 'ui_components'
        }
    }
});

const BaseExample = () => {
    return <Remote module="InfoPage">
        <Remote module="InfoPage.Part" title="退票信息">
            <Remote module="TableInfo"
                    dataSource={[[{label: "客户名称", content: "腾讯"}, {
                        label: "发票抬头",
                        content: "腾讯科技公司"
                    }], [{label: "发票类型", content: "增值税专用发票"}, {
                        label: "发票开具日期",
                        content: "2022-08-15"
                    }], [{label: "退票金额", content: "22000.00元"}], [{
                        label: "发票号", content: <div>
                            <div>00384895992774</div>
                            <div>00384895992774</div>
                            <div>00384895992774</div>
                            <div>00384895992774</div>
                        </div>
                    }], [{label: "是否需要重开发票", content: "否"}, {
                        label: "是否涉及金融变动",
                        content: "否"
                    }], [{label: "是否造成实质损失", content: "否"}, {
                        label: "责任归属",
                        content: "客户原因"
                    }], [{label: "退票原因", content: "退票原因的描述退票原因的描述退票原因的描"}], [{
                        label: "附件",
                        content: "附件名称"
                    }], [{label: "操作时间", content: "2022-08-01 16:32"}, {label: "操作人", content: "西西歪"}]]}/>
        </Remote>
    </Remote>;
};

render(<BaseExample/>);

`,
    scope: [{
    name: "remoteLoader",
    packageName: "@kne/remote-loader",
    component: component_91
}]
}]
    }
};
export default readmeConfig;
