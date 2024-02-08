const {default: Remote, preset} = remoteLoader;
const {range} = _;

const BaseExample = () => {
    return <div>
        <Remote module="components-core:Content"
                list={[{label: '标题', content: '内容'}, {label: '标题标题', content: '内容内容'}, {
                    label: '标题标', content: '内容内容内容内容内容内容内容内容内容内容'
                }, {
                    label: '标题标题标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                }]}/>
        <Remote module="components-core:Table"
            name="test-table" dataSource={[
                {
                    id: 0,
                    date: "2021-07-21",
                    datetime: "2023-07-22 09:00:00",
                    serialNumber: "SX00192932323434",
                    serialNumberShort: "SH0023",
                    userName: "林珊珊",
                    title: "我是主要字段",
                    tagEnum: null,
                    enUserName: "Lin Shanshan",
                    phoneNumber: "+86 18792877372",
                    email: "a@a.com",
                    count: 4,
                    description:
                        "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                    description2:
                        "我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述",
                    other: "其他信息",
                },
                {
                    id: 1,
                    date: "",
                    datetime: "2023-07-22 09:00:00",
                    serialNumber: "SX00192932323434",
                    serialNumberShort: "SH0023",
                    userName: "林珊珊1",
                    title: "我是主要字段",
                    tagEnum: "Y",
                    enUserName: "Lin Shanshan",
                    phoneNumber: null,
                    email: "a@a.com",
                    count: 5,
                    description: "我是一段描述",
                    description2: "我是一段描述",
                    other: "其他信息",
                },
            ]}
            columns={[
                {
                    name: "date",
                    title: "日期",
                    type: "date",
                    hover: true,
                },
                {
                    name: "datetime",
                    title: "日期时间",
                    type: "datetime",
                    hideSecond: true,
                },
                {
                    name: "serialNumber",
                    title: "编号",
                    type: "serialNumber",
                    primary: true,
                    onClick: async (item) => {
                        console.log(item);
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(true);
                            }, 10000);
                        });
                    },
                },
                {
                    name: "serialNumberShort",
                    title: "短编号",
                    type: "serialNumberShort",
                },
                {
                    name: "title",
                    title: "主要信息",
                    type: "mainInfo",
                },
                {
                    name: "tag",
                    title: "状态标签",
                    type: "tag",
                    valueOf: () => ({ type: "success", text: "审核通过" }),
                },
                {
                    name: "tagEnum",
                    title: "标签枚举",
                    type: "tag",
                    valueOf: (item) =>
                        item.tagEnum && {
                            type: "success",
                            isEnum: true,
                            moduleName: "marital",
                            name: item.tagEnum,
                        },
                },
                {
                    name: "avatar",
                    title: "头像",
                    type: "avatar",
                    valueOf: () => ({ gender: "F" }),
                },
                {
                    name: "user",
                    title: "用户",
                    type: "user",
                    valueOf: (item) => `${item.enUserName} ${item.userName}`,
                },
                {
                    name: "hideInfo",
                    title: "隐藏字段",
                    type: "hideInfo",
                    valueOf: (item) =>
                        item["phoneNumber"] && {
                            loader: () => {
                                return item["phoneNumber"] + "-" + item["id"];
                            },
                        },
                },
                {
                    name: "userName",
                    title: "用户名",
                    type: "userName",
                },
                {
                    name: "contacts",
                    title: "联系人",
                    type: "contacts",
                    valueOf: (item) => `${item.userName} ${item.phoneNumber}`,
                },
                {
                    name: "count",
                    title: "数量",
                    type: "singleRow",
                    render: ({ target }) => {
                        return target.count === 5 ? { hover: true } : { hover: false };
                    },
                },
                {
                    name: "description",
                    title: "描述",
                    type: "description",
                },
                {
                    name: "description2",
                    title: "描述(省略)",
                    type: "description",
                    ellipsis: true,
                },
                {
                    name: "other",
                    title: "其他",
                    type: "other",
                    hover: true,
                },
                {
                    name: "options",
                    title: "操作",
                    type: "options",
                    valueOf: (item) => [
                        {
                            onClick: () => {
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });
                            },
                            children: "分配Program及教练",
                        }
                    ],
                },
            ]}
        />
    </div>;
};

render(<BaseExample/>);
