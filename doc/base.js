const { default: Remote } = remoteLoader;
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
