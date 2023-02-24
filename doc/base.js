const {default: Remote, preset} = remoteLoader;
const {range} = _;

const BaseExample = () => {
    return <Remote module="http://ued.dev.fatalent.cn/ui_components:Global">
        <Remote module="http://ued.dev.fatalent.cn/ui_components:Content"
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
