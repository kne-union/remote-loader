(self.webpackChunk_kne_components_remote_loader=self.webpackChunk_kne_components_remote_loader||[]).push([[712],{60232:(n,t,e)=>{"use strict";e.d(t,{c:()=>a});var r=e(2788),i=e(48428),s=e(96312);const a={name:"remote-loader",summary:"<p>\u52a0\u8f7d\u4e00\u4e2awebpack5\u751f\u6210\u7684\u90a6\u8054\u6a21\u5757</p>\n<ul>\n<li>\u652f\u6301\u81ea\u5b9a\u4e49\u52a0\u8f7durl</li>\n<li>\u652f\u6301\u5b50\u6a21\u5757\u52a0\u8f7d</li>\n</ul>",description:"\u52a0\u8f7d\u4e00\u4e2awebpack5\u751f\u6210\u7684\u90a6\u8054\u6a21\u5757",packageName:"@kne/remote-loader",api:"<table>\n<thead>\n<tr>\n<th>\u5c5e\u6027\u540d</th>\n<th>\u8bf4\u660e</th>\n<th>\u7c7b\u578b</th>\n<th>\u9ed8\u8ba4\u503c</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>fallback</td>\n<td>\u7ec4\u4ef6\u52a0\u8f7d\u65f6\u6e32\u67d3\u7684loading\u7ec4\u4ef6</td>\n<td>jsx</td>\n<td>null</td>\n</tr>\n<tr>\n<td>remoteError</td>\n<td>\u7ec4\u4ef6\u52a0\u8f7d\u5931\u8d25\u65f6\u6e32\u67d3\u7684\u7ec4\u4ef6</td>\n<td>jsx</td>\n<td>null</td>\n</tr>\n<tr>\n<td>module</td>\n<td>[\u6a21\u5757\u5730\u5740/remote/version:]\u6a21\u5757\u540d[@\u5b50\u6a21\u5757][.\u6a21\u5757\u5c5e\u6027]</td>\n<td>string</td>\n<td>-</td>\n</tr>\n<tr>\n<td>onLoadComplete</td>\n<td>\u5f53\u7ec4\u4ef6\u52a0\u8f7d\u5b8c\u6210\u5e76\u4e14mount\u5b8c\u6bd5\u7684\u65f6\u5019\u8c03\u7528\u8be5\u65b9\u6cd5</td>\n<td>function</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<p>\u5176\u4ed6\u5c5e\u6027\u5c06\u4f20\u7ed9\u8fdc\u7a0b\u7ec4\u4ef6</p>\n<h4>withRemoteLoader</h4>\n<p>\u6ce8\u610f: \u63a8\u8350\u4f7f\u7528createWithRemoteLoader\uff0c\u5982\u679c\u5fc5\u987b\u4f7f\u7528\u8be5\u9ad8\u9636\u7ec4\u4ef6\u8bf7\u5c06modules\u53c2\u6570\u5305\u88f9\u5728useMemo\u91cc\u9762\u6216\u8005\u653e\u5728\u7ec4\u4ef6\u5916\u8fb9\uff0c\u9632\u6b62\u7531\u4e8e\u5176\u7236\u7ec4\u4ef6render\u5bfc\u81f4\u5176\u5f15\u7528\u5730\u5740\u53d1\u751f\u53d8\u5316\u89e6\u53d1\u4e0d\u5fc5\u8981\u7684render</p>\n<p>withRemoteLoader(WrappedComponent)</p>\n<table>\n<thead>\n<tr>\n<th>\u5c5e\u6027\u540d</th>\n<th>\u8bf4\u660e</th>\n<th>\u7c7b\u578b</th>\n<th>\u9ed8\u8ba4\u503c</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>fallback</td>\n<td>\u7ec4\u4ef6\u52a0\u8f7d\u65f6\u6e32\u67d3\u7684loading\u7ec4\u4ef6</td>\n<td>jsx</td>\n<td>null</td>\n</tr>\n<tr>\n<td>remoteError</td>\n<td>\u7ec4\u4ef6\u52a0\u8f7d\u5931\u8d25\u65f6\u6e32\u67d3\u7684\u7ec4\u4ef6</td>\n<td>jsx</td>\n<td>null</td>\n</tr>\n<tr>\n<td>modules</td>\n<td>\u4e00\u4e2a\u6a21\u5757token\u6570\u7ec4\uff0c\u6a21\u5757token\u7684\u683c\u5f0f\u4e3a\uff1a[\u6a21\u5757\u5730\u5740/remote/version:]\u6a21\u5757\u540d[@\u5b50\u6a21\u5757][.\u6a21\u5757\u5c5e\u6027]</td>\n<td>array</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h4>createWithRemoteLoader</h4>\n<p>withRemoteLoader\u7684\u9ad8\u9636\u51fd\u6570\uff0c\u53ef\u4ee5\u5c06\u90e8\u5206\u53c2\u6570\u63d0\u524d\u4f20\u5165\uff0c\u4e0d\u5fc5\u5728\u8c03\u7528withRemoteLoader(WrappedComponent) \u65f6\u518d\u4f20\u5165\u53c2\u6570</p>\n<h4>preset</h4>\n<p>\u53ef\u4ee5\u8bbe\u7f6e\u9884\u7f6e\u53c2\u6570 preset({remotes,fallback,error});</p>",example:{isFull:!0,className:"remote_loader_4f65d",style:".remote_loader_4f65d .ant-space-vertical {\n  width: 100%; }\n\n.remote_loader_4f65d .container {\n  background: #FFF; }\n",list:[{title:"\u52a0\u8f7d\u4e00\u4e2a\u6a21\u5757",description:"\u52a0\u8f7d\u4e00\u4e2a\u6a21\u5757",code:'const {default: Remote, preset} = remoteLoader;\nconst {range} = _;\n\nconst BaseExample = () => {\n    return <div>\n        <Remote module="components-core:Content"\n                list={[{label: \'\u6807\u9898\', content: \'\u5185\u5bb9\'}, {label: \'\u6807\u9898\u6807\u9898\', content: \'\u5185\u5bb9\u5185\u5bb9\'}, {\n                    label: \'\u6807\u9898\u6807\', content: \'\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\'\n                }, {\n                    label: \'\u6807\u9898\u6807\u9898\u6807\u9898\',\n                    content: \'\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\u5185\u5bb9\'\n                }]}/>\n        <Remote module="components-core:Table"\n            name="test-table" dataSource={[\n                {\n                    id: 0,\n                    date: "2021-07-21",\n                    datetime: "2023-07-22 09:00:00",\n                    serialNumber: "SX00192932323434",\n                    serialNumberShort: "SH0023",\n                    userName: "\u6797\u73ca\u73ca",\n                    title: "\u6211\u662f\u4e3b\u8981\u5b57\u6bb5",\n                    tagEnum: null,\n                    enUserName: "Lin Shanshan",\n                    phoneNumber: "+86 18792877372",\n                    email: "a@a.com",\n                    count: 4,\n                    description:\n                        "\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0",\n                    description2:\n                        "\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0",\n                    other: "\u5176\u4ed6\u4fe1\u606f",\n                },\n                {\n                    id: 1,\n                    date: "",\n                    datetime: "2023-07-22 09:00:00",\n                    serialNumber: "SX00192932323434",\n                    serialNumberShort: "SH0023",\n                    userName: "\u6797\u73ca\u73ca1",\n                    title: "\u6211\u662f\u4e3b\u8981\u5b57\u6bb5",\n                    tagEnum: "Y",\n                    enUserName: "Lin Shanshan",\n                    phoneNumber: null,\n                    email: "a@a.com",\n                    count: 5,\n                    description: "\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0",\n                    description2: "\u6211\u662f\u4e00\u6bb5\u63cf\u8ff0",\n                    other: "\u5176\u4ed6\u4fe1\u606f",\n                },\n            ]}\n            columns={[\n                {\n                    name: "date",\n                    title: "\u65e5\u671f",\n                    type: "date",\n                    hover: true,\n                },\n                {\n                    name: "datetime",\n                    title: "\u65e5\u671f\u65f6\u95f4",\n                    type: "datetime",\n                    hideSecond: true,\n                },\n                {\n                    name: "serialNumber",\n                    title: "\u7f16\u53f7",\n                    type: "serialNumber",\n                    primary: true,\n                    onClick: async (item) => {\n                        console.log(item);\n                        return new Promise((resolve) => {\n                            setTimeout(() => {\n                                resolve(true);\n                            }, 10000);\n                        });\n                    },\n                },\n                {\n                    name: "serialNumberShort",\n                    title: "\u77ed\u7f16\u53f7",\n                    type: "serialNumberShort",\n                },\n                {\n                    name: "title",\n                    title: "\u4e3b\u8981\u4fe1\u606f",\n                    type: "mainInfo",\n                },\n                {\n                    name: "tag",\n                    title: "\u72b6\u6001\u6807\u7b7e",\n                    type: "tag",\n                    valueOf: () => ({ type: "success", text: "\u5ba1\u6838\u901a\u8fc7" }),\n                },\n                {\n                    name: "tagEnum",\n                    title: "\u6807\u7b7e\u679a\u4e3e",\n                    type: "tag",\n                    valueOf: (item) =>\n                        item.tagEnum && {\n                            type: "success",\n                            isEnum: true,\n                            moduleName: "marital",\n                            name: item.tagEnum,\n                        },\n                },\n                {\n                    name: "avatar",\n                    title: "\u5934\u50cf",\n                    type: "avatar",\n                    valueOf: () => ({ gender: "F" }),\n                },\n                {\n                    name: "user",\n                    title: "\u7528\u6237",\n                    type: "user",\n                    valueOf: (item) => `${item.enUserName} ${item.userName}`,\n                },\n                {\n                    name: "hideInfo",\n                    title: "\u9690\u85cf\u5b57\u6bb5",\n                    type: "hideInfo",\n                    valueOf: (item) =>\n                        item["phoneNumber"] && {\n                            loader: () => {\n                                return item["phoneNumber"] + "-" + item["id"];\n                            },\n                        },\n                },\n                {\n                    name: "userName",\n                    title: "\u7528\u6237\u540d",\n                    type: "userName",\n                },\n                {\n                    name: "contacts",\n                    title: "\u8054\u7cfb\u4eba",\n                    type: "contacts",\n                    valueOf: (item) => `${item.userName} ${item.phoneNumber}`,\n                },\n                {\n                    name: "count",\n                    title: "\u6570\u91cf",\n                    type: "singleRow",\n                    render: ({ target }) => {\n                        return target.count === 5 ? { hover: true } : { hover: false };\n                    },\n                },\n                {\n                    name: "description",\n                    title: "\u63cf\u8ff0",\n                    type: "description",\n                },\n                {\n                    name: "description2",\n                    title: "\u63cf\u8ff0(\u7701\u7565)",\n                    type: "description",\n                    ellipsis: true,\n                },\n                {\n                    name: "other",\n                    title: "\u5176\u4ed6",\n                    type: "other",\n                    hover: true,\n                },\n                {\n                    name: "options",\n                    title: "\u64cd\u4f5c",\n                    type: "options",\n                    valueOf: (item) => [\n                        {\n                            onClick: () => {\n                                return new Promise((resolve) => {\n                                    setTimeout(() => {\n                                        resolve();\n                                    }, 1000);\n                                });\n                            },\n                            children: "\u5206\u914dProgram\u53ca\u6559\u7ec3",\n                        }\n                    ],\n                },\n            ]}\n        />\n    </div>;\n};\n\nrender(<BaseExample/>);\n\n',scope:[{name:"remoteLoader",packageName:"@kne/remote-loader",component:r},{name:"reactRouter",packageName:"react-router-dom",component:i},{name:"_",packageName:"lodash",component:s}]},{title:"\u52a0\u8f7d\u4e00\u4e2a\u5c5e\u6027\u6a21\u5757",description:"\u52a0\u8f7d\u4e00\u4e2a\u5c5e\u6027\u6a21\u5757",code:'const {default: Remote} = remoteLoader;\nconst BaseExample = () => {\n    return <Remote module="InfoPage">\n        <Remote module="InfoPage.Part" title="\u9000\u7968\u4fe1\u606f">\n            <Remote module="Descriptions"\n                    dataSource={[[{label: "\u5ba2\u6237\u540d\u79f0", content: "\u817e\u8baf"}, {\n                        label: "\u53d1\u7968\u62ac\u5934", content: "\u817e\u8baf\u79d1\u6280\u516c\u53f8"\n                    }], [{label: "\u53d1\u7968\u7c7b\u578b", content: "\u589e\u503c\u7a0e\u4e13\u7528\u53d1\u7968"}, {\n                        label: "\u53d1\u7968\u5f00\u5177\u65e5\u671f", content: "2022-08-15"\n                    }], [{label: "\u9000\u7968\u91d1\u989d", content: "22000.00\u5143"}], [{\n                        label: "\u53d1\u7968\u53f7", content: <div>\n                            <div>00384895992774</div>\n                            <div>00384895992774</div>\n                            <div>00384895992774</div>\n                            <div>00384895992774</div>\n                        </div>\n                    }], [{label: "\u662f\u5426\u9700\u8981\u91cd\u5f00\u53d1\u7968", content: "\u5426"}, {\n                        label: "\u662f\u5426\u6d89\u53ca\u91d1\u878d\u53d8\u52a8", content: "\u5426"\n                    }], [{label: "\u662f\u5426\u9020\u6210\u5b9e\u8d28\u635f\u5931", content: "\u5426"}, {\n                        label: "\u8d23\u4efb\u5f52\u5c5e", content: "\u5ba2\u6237\u539f\u56e0"\n                    }], [{label: "\u9000\u7968\u539f\u56e0", content: "\u9000\u7968\u539f\u56e0\u7684\u63cf\u8ff0\u9000\u7968\u539f\u56e0\u7684\u63cf\u8ff0\u9000\u7968\u539f\u56e0\u7684\u63cf"}], [{\n                        label: "\u9644\u4ef6", content: "\u9644\u4ef6\u540d\u79f0"\n                    }], [{label: "\u64cd\u4f5c\u65f6\u95f4", content: "2022-08-01 16:32"}, {label: "\u64cd\u4f5c\u4eba", content: "\u897f\u897f\u6b6a"}]]}/>\n        </Remote>\n    </Remote>;\n};\n\nrender(<BaseExample/>);\n\n',scope:[{name:"remoteLoader",packageName:"@kne/remote-loader",component:r}]}]}}},89624:(n,t,e)=>{"use strict";e.r(t);var r=e(49256),i=e.n(r),s=e(84768),a=e(96164),o=e(97244),p=e.n(o),c=e(2788),_=e(64015);window.PUBLIC_URL="/remote-loader";const j={remote:"components-core",url:"https://registry.npmmirror.com",tpl:"{{url}}/@kne-components%2f{{remote}}/{{version}}/files/build",defaultVersion:"0.1.10"};(0,c.preset)({remotes:{default:j,"components-core":j,"components-iconfont":{remote:"components-iconfont",url:"https://registry.npmmirror.com",tpl:"{{url}}/@kne-components%2f{{remote}}/{{version}}/files/build",defaultVersion:"0.1.3"}}});const S=p().create({validateStatus:function(){return!0}});(0,s.preset)({ajax:S,loading:(0,_.jsx)(a.Spin,{delay:500,style:{position:"absolute",left:"50%",padding:"10px",transform:"translateX(-50%)"}}),error:null,empty:(0,_.jsx)(a.Empty,{}),transformResponse:n=>{const{data:t}=n;return n.data={code:0===t.code?200:t.code,msg:t.msg,results:t.data},n}});var l=e(9812),d=e(48428),m=e(7520),y=e.n(m),u=(e(29140),e(94908));const h=y().ExampleRoutes,E=n=>{let{preset:t,themeToken:e,...r}=n;return(0,_.jsx)(d.HashRouter,{children:(0,_.jsx)(h,{...r,paths:[{key:"components",path:"/",title:"\u9996\u9875"}],preset:t,themeToken:e,readme:u.default,pageProps:{menu:null}})})};l.createRoot(document.getElementById("root")).render((0,_.jsx)(i().StrictMode,{children:(0,_.jsx)(E,{preset:{ajax:S},themeToken:{colorPrimary:"#4F185A"}})}))},54456:(n,t,e)=>{var r={"./Binary_Property/ASCII.js":3612,"./Binary_Property/ASCII_Hex_Digit.js":27800,"./Binary_Property/Alphabetic.js":64488,"./Binary_Property/Any.js":34107,"./Binary_Property/Assigned.js":27296,"./Binary_Property/Bidi_Control.js":5960,"./Binary_Property/Bidi_Mirrored.js":35584,"./Binary_Property/Case_Ignorable.js":94952,"./Binary_Property/Cased.js":49984,"./Binary_Property/Changes_When_Casefolded.js":9420,"./Binary_Property/Changes_When_Casemapped.js":19684,"./Binary_Property/Changes_When_Lowercased.js":86980,"./Binary_Property/Changes_When_NFKC_Casefolded.js":41840,"./Binary_Property/Changes_When_Titlecased.js":27996,"./Binary_Property/Changes_When_Uppercased.js":9552,"./Binary_Property/Dash.js":80064,"./Binary_Property/Default_Ignorable_Code_Point.js":36116,"./Binary_Property/Deprecated.js":95388,"./Binary_Property/Diacritic.js":23980,"./Binary_Property/Emoji.js":10716,"./Binary_Property/Emoji_Component.js":30840,"./Binary_Property/Emoji_Modifier.js":59112,"./Binary_Property/Emoji_Modifier_Base.js":32616,"./Binary_Property/Emoji_Presentation.js":31355,"./Binary_Property/Extended_Pictographic.js":35964,"./Binary_Property/Extender.js":44684,"./Binary_Property/Grapheme_Base.js":37892,"./Binary_Property/Grapheme_Extend.js":90024,"./Binary_Property/Hex_Digit.js":66440,"./Binary_Property/IDS_Binary_Operator.js":71464,"./Binary_Property/IDS_Trinary_Operator.js":1328,"./Binary_Property/ID_Continue.js":54932,"./Binary_Property/ID_Start.js":84808,"./Binary_Property/Ideographic.js":40568,"./Binary_Property/Join_Control.js":58368,"./Binary_Property/Logical_Order_Exception.js":19776,"./Binary_Property/Lowercase.js":94364,"./Binary_Property/Math.js":84704,"./Binary_Property/Noncharacter_Code_Point.js":86400,"./Binary_Property/Pattern_Syntax.js":42616,"./Binary_Property/Pattern_White_Space.js":59088,"./Binary_Property/Quotation_Mark.js":37008,"./Binary_Property/Radical.js":83744,"./Binary_Property/Regional_Indicator.js":15708,"./Binary_Property/Sentence_Terminal.js":67472,"./Binary_Property/Soft_Dotted.js":29460,"./Binary_Property/Terminal_Punctuation.js":3184,"./Binary_Property/Unified_Ideograph.js":49200,"./Binary_Property/Uppercase.js":5488,"./Binary_Property/Variation_Selector.js":92840,"./Binary_Property/White_Space.js":7160,"./Binary_Property/XID_Continue.js":62760,"./Binary_Property/XID_Start.js":77392,"./General_Category/Cased_Letter.js":64952,"./General_Category/Close_Punctuation.js":42173,"./General_Category/Connector_Punctuation.js":9388,"./General_Category/Control.js":96092,"./General_Category/Currency_Symbol.js":9912,"./General_Category/Dash_Punctuation.js":20804,"./General_Category/Decimal_Number.js":25496,"./General_Category/Enclosing_Mark.js":86524,"./General_Category/Final_Punctuation.js":55996,"./General_Category/Format.js":784,"./General_Category/Initial_Punctuation.js":8909,"./General_Category/Letter.js":36616,"./General_Category/Letter_Number.js":61576,"./General_Category/Line_Separator.js":97193,"./General_Category/Lowercase_Letter.js":80088,"./General_Category/Mark.js":60187,"./General_Category/Math_Symbol.js":47432,"./General_Category/Modifier_Letter.js":17584,"./General_Category/Modifier_Symbol.js":27752,"./General_Category/Nonspacing_Mark.js":29588,"./General_Category/Number.js":89792,"./General_Category/Open_Punctuation.js":23164,"./General_Category/Other.js":17288,"./General_Category/Other_Letter.js":83912,"./General_Category/Other_Number.js":7512,"./General_Category/Other_Punctuation.js":84960,"./General_Category/Other_Symbol.js":91728,"./General_Category/Paragraph_Separator.js":65044,"./General_Category/Private_Use.js":89800,"./General_Category/Punctuation.js":28531,"./General_Category/Separator.js":19352,"./General_Category/Space_Separator.js":69896,"./General_Category/Spacing_Mark.js":40776,"./General_Category/Surrogate.js":76300,"./General_Category/Symbol.js":47768,"./General_Category/Titlecase_Letter.js":66656,"./General_Category/Unassigned.js":38373,"./General_Category/Uppercase_Letter.js":94264,"./Property_of_Strings/Basic_Emoji.js":46676,"./Property_of_Strings/Emoji_Keycap_Sequence.js":80272,"./Property_of_Strings/RGI_Emoji.js":51732,"./Property_of_Strings/RGI_Emoji_Flag_Sequence.js":72397,"./Property_of_Strings/RGI_Emoji_Modifier_Sequence.js":43984,"./Property_of_Strings/RGI_Emoji_Tag_Sequence.js":59528,"./Property_of_Strings/RGI_Emoji_ZWJ_Sequence.js":7984,"./Script/Adlam.js":8220,"./Script/Ahom.js":76708,"./Script/Anatolian_Hieroglyphs.js":59144,"./Script/Arabic.js":54780,"./Script/Armenian.js":18200,"./Script/Avestan.js":73960,"./Script/Balinese.js":73924,"./Script/Bamum.js":55328,"./Script/Bassa_Vah.js":97392,"./Script/Batak.js":72068,"./Script/Bengali.js":60784,"./Script/Bhaiksuki.js":65616,"./Script/Bopomofo.js":80892,"./Script/Brahmi.js":94104,"./Script/Braille.js":3455,"./Script/Buginese.js":41601,"./Script/Buhid.js":78844,"./Script/Canadian_Aboriginal.js":70995,"./Script/Carian.js":70396,"./Script/Caucasian_Albanian.js":61472,"./Script/Chakma.js":60148,"./Script/Cham.js":23155,"./Script/Cherokee.js":64008,"./Script/Chorasmian.js":66572,"./Script/Common.js":60448,"./Script/Coptic.js":87388,"./Script/Cuneiform.js":56624,"./Script/Cypriot.js":16076,"./Script/Cypro_Minoan.js":29124,"./Script/Cyrillic.js":42600,"./Script/Deseret.js":98436,"./Script/Devanagari.js":64036,"./Script/Dives_Akuru.js":84152,"./Script/Dogra.js":180,"./Script/Duployan.js":53336,"./Script/Egyptian_Hieroglyphs.js":68328,"./Script/Elbasan.js":34704,"./Script/Elymaic.js":40452,"./Script/Ethiopic.js":53683,"./Script/Georgian.js":73504,"./Script/Glagolitic.js":28764,"./Script/Gothic.js":5728,"./Script/Grantha.js":96888,"./Script/Greek.js":468,"./Script/Gujarati.js":5624,"./Script/Gunjala_Gondi.js":72076,"./Script/Gurmukhi.js":31796,"./Script/Han.js":46956,"./Script/Hangul.js":48420,"./Script/Hanifi_Rohingya.js":21288,"./Script/Hanunoo.js":53856,"./Script/Hatran.js":55284,"./Script/Hebrew.js":35244,"./Script/Hiragana.js":2952,"./Script/Imperial_Aramaic.js":15200,"./Script/Inherited.js":64428,"./Script/Inscriptional_Pahlavi.js":54432,"./Script/Inscriptional_Parthian.js":52584,"./Script/Javanese.js":34712,"./Script/Kaithi.js":66228,"./Script/Kannada.js":55272,"./Script/Katakana.js":36872,"./Script/Kawi.js":33860,"./Script/Kayah_Li.js":53272,"./Script/Kharoshthi.js":25424,"./Script/Khitan_Small_Script.js":7888,"./Script/Khmer.js":78192,"./Script/Khojki.js":74656,"./Script/Khudawadi.js":32648,"./Script/Lao.js":64128,"./Script/Latin.js":39232,"./Script/Lepcha.js":36384,"./Script/Limbu.js":86480,"./Script/Linear_A.js":53044,"./Script/Linear_B.js":80200,"./Script/Lisu.js":86828,"./Script/Lycian.js":34232,"./Script/Lydian.js":75276,"./Script/Mahajani.js":53932,"./Script/Makasar.js":18296,"./Script/Malayalam.js":69211,"./Script/Mandaic.js":61864,"./Script/Manichaean.js":27272,"./Script/Marchen.js":75576,"./Script/Masaram_Gondi.js":1916,"./Script/Medefaidrin.js":43552,"./Script/Meetei_Mayek.js":18328,"./Script/Mende_Kikakui.js":24564,"./Script/Meroitic_Cursive.js":30212,"./Script/Meroitic_Hieroglyphs.js":36739,"./Script/Miao.js":1464,"./Script/Modi.js":41072,"./Script/Mongolian.js":65912,"./Script/Mro.js":44408,"./Script/Multani.js":21976,"./Script/Myanmar.js":65700,"./Script/Nabataean.js":61640,"./Script/Nag_Mundari.js":57296,"./Script/Nandinagari.js":21984,"./Script/New_Tai_Lue.js":83920,"./Script/Newa.js":28664,"./Script/Nko.js":42328,"./Script/Nushu.js":76196,"./Script/Nyiakeng_Puachue_Hmong.js":62032,"./Script/Ogham.js":46312,"./Script/Ol_Chiki.js":91504,"./Script/Old_Hungarian.js":33648,"./Script/Old_Italic.js":11132,"./Script/Old_North_Arabian.js":14416,"./Script/Old_Permic.js":72044,"./Script/Old_Persian.js":80232,"./Script/Old_Sogdian.js":83600,"./Script/Old_South_Arabian.js":1520,"./Script/Old_Turkic.js":71508,"./Script/Old_Uyghur.js":69368,"./Script/Oriya.js":51380,"./Script/Osage.js":6248,"./Script/Osmanya.js":26136,"./Script/Pahawh_Hmong.js":21836,"./Script/Palmyrene.js":66768,"./Script/Pau_Cin_Hau.js":65884,"./Script/Phags_Pa.js":31504,"./Script/Phoenician.js":24968,"./Script/Psalter_Pahlavi.js":47976,"./Script/Rejang.js":74988,"./Script/Runic.js":71868,"./Script/Samaritan.js":28404,"./Script/Saurashtra.js":30744,"./Script/Sharada.js":92504,"./Script/Shavian.js":56920,"./Script/Siddham.js":87919,"./Script/SignWriting.js":23920,"./Script/Sinhala.js":40616,"./Script/Sogdian.js":15060,"./Script/Sora_Sompeng.js":64996,"./Script/Soyombo.js":192,"./Script/Sundanese.js":75552,"./Script/Syloti_Nagri.js":94660,"./Script/Syriac.js":36896,"./Script/Tagalog.js":2732,"./Script/Tagbanwa.js":12024,"./Script/Tai_Le.js":29924,"./Script/Tai_Tham.js":46400,"./Script/Tai_Viet.js":40068,"./Script/Takri.js":33256,"./Script/Tamil.js":97744,"./Script/Tangsa.js":4960,"./Script/Tangut.js":57112,"./Script/Telugu.js":28944,"./Script/Thaana.js":64776,"./Script/Thai.js":18364,"./Script/Tibetan.js":44592,"./Script/Tifinagh.js":88,"./Script/Tirhuta.js":49456,"./Script/Toto.js":84256,"./Script/Ugaritic.js":14760,"./Script/Vai.js":34656,"./Script/Vithkuqi.js":55244,"./Script/Wancho.js":5712,"./Script/Warang_Citi.js":77404,"./Script/Yezidi.js":10876,"./Script/Yi.js":7885,"./Script/Zanabazar_Square.js":296,"./Script_Extensions/Adlam.js":7008,"./Script_Extensions/Ahom.js":13104,"./Script_Extensions/Anatolian_Hieroglyphs.js":58968,"./Script_Extensions/Arabic.js":50144,"./Script_Extensions/Armenian.js":1072,"./Script_Extensions/Avestan.js":29752,"./Script_Extensions/Balinese.js":36156,"./Script_Extensions/Bamum.js":31012,"./Script_Extensions/Bassa_Vah.js":75300,"./Script_Extensions/Batak.js":64992,"./Script_Extensions/Bengali.js":57184,"./Script_Extensions/Bhaiksuki.js":96232,"./Script_Extensions/Bopomofo.js":17136,"./Script_Extensions/Brahmi.js":21008,"./Script_Extensions/Braille.js":39012,"./Script_Extensions/Buginese.js":12432,"./Script_Extensions/Buhid.js":21292,"./Script_Extensions/Canadian_Aboriginal.js":81012,"./Script_Extensions/Carian.js":17528,"./Script_Extensions/Caucasian_Albanian.js":63480,"./Script_Extensions/Chakma.js":61776,"./Script_Extensions/Cham.js":9548,"./Script_Extensions/Cherokee.js":70416,"./Script_Extensions/Chorasmian.js":15104,"./Script_Extensions/Common.js":14904,"./Script_Extensions/Coptic.js":61944,"./Script_Extensions/Cuneiform.js":15124,"./Script_Extensions/Cypriot.js":14928,"./Script_Extensions/Cypro_Minoan.js":50064,"./Script_Extensions/Cyrillic.js":7779,"./Script_Extensions/Deseret.js":59427,"./Script_Extensions/Devanagari.js":26408,"./Script_Extensions/Dives_Akuru.js":50088,"./Script_Extensions/Dogra.js":17852,"./Script_Extensions/Duployan.js":64344,"./Script_Extensions/Egyptian_Hieroglyphs.js":53348,"./Script_Extensions/Elbasan.js":83580,"./Script_Extensions/Elymaic.js":84572,"./Script_Extensions/Ethiopic.js":48804,"./Script_Extensions/Georgian.js":31595,"./Script_Extensions/Glagolitic.js":51920,"./Script_Extensions/Gothic.js":88904,"./Script_Extensions/Grantha.js":70572,"./Script_Extensions/Greek.js":73024,"./Script_Extensions/Gujarati.js":96480,"./Script_Extensions/Gunjala_Gondi.js":7364,"./Script_Extensions/Gurmukhi.js":52347,"./Script_Extensions/Han.js":10008,"./Script_Extensions/Hangul.js":81348,"./Script_Extensions/Hanifi_Rohingya.js":84492,"./Script_Extensions/Hanunoo.js":37516,"./Script_Extensions/Hatran.js":69404,"./Script_Extensions/Hebrew.js":72536,"./Script_Extensions/Hiragana.js":41212,"./Script_Extensions/Imperial_Aramaic.js":13860,"./Script_Extensions/Inherited.js":52e3,"./Script_Extensions/Inscriptional_Pahlavi.js":37852,"./Script_Extensions/Inscriptional_Parthian.js":13776,"./Script_Extensions/Javanese.js":6888,"./Script_Extensions/Kaithi.js":6368,"./Script_Extensions/Kannada.js":39928,"./Script_Extensions/Katakana.js":97840,"./Script_Extensions/Kawi.js":38548,"./Script_Extensions/Kayah_Li.js":97488,"./Script_Extensions/Kharoshthi.js":48384,"./Script_Extensions/Khitan_Small_Script.js":82275,"./Script_Extensions/Khmer.js":92864,"./Script_Extensions/Khojki.js":86704,"./Script_Extensions/Khudawadi.js":87316,"./Script_Extensions/Lao.js":10144,"./Script_Extensions/Latin.js":82252,"./Script_Extensions/Lepcha.js":8568,"./Script_Extensions/Limbu.js":6340,"./Script_Extensions/Linear_A.js":88624,"./Script_Extensions/Linear_B.js":616,"./Script_Extensions/Lisu.js":81332,"./Script_Extensions/Lycian.js":68264,"./Script_Extensions/Lydian.js":56032,"./Script_Extensions/Mahajani.js":83720,"./Script_Extensions/Makasar.js":43112,"./Script_Extensions/Malayalam.js":76132,"./Script_Extensions/Mandaic.js":31220,"./Script_Extensions/Manichaean.js":12296,"./Script_Extensions/Marchen.js":20920,"./Script_Extensions/Masaram_Gondi.js":41600,"./Script_Extensions/Medefaidrin.js":66904,"./Script_Extensions/Meetei_Mayek.js":40413,"./Script_Extensions/Mende_Kikakui.js":16188,"./Script_Extensions/Meroitic_Cursive.js":28028,"./Script_Extensions/Meroitic_Hieroglyphs.js":36168,"./Script_Extensions/Miao.js":90484,"./Script_Extensions/Modi.js":89136,"./Script_Extensions/Mongolian.js":45964,"./Script_Extensions/Mro.js":90460,"./Script_Extensions/Multani.js":29584,"./Script_Extensions/Myanmar.js":45556,"./Script_Extensions/Nabataean.js":92656,"./Script_Extensions/Nag_Mundari.js":21048,"./Script_Extensions/Nandinagari.js":57640,"./Script_Extensions/New_Tai_Lue.js":53672,"./Script_Extensions/Newa.js":35256,"./Script_Extensions/Nko.js":1400,"./Script_Extensions/Nushu.js":83736,"./Script_Extensions/Nyiakeng_Puachue_Hmong.js":12496,"./Script_Extensions/Ogham.js":87608,"./Script_Extensions/Ol_Chiki.js":3492,"./Script_Extensions/Old_Hungarian.js":82216,"./Script_Extensions/Old_Italic.js":56080,"./Script_Extensions/Old_North_Arabian.js":87731,"./Script_Extensions/Old_Permic.js":9268,"./Script_Extensions/Old_Persian.js":61560,"./Script_Extensions/Old_Sogdian.js":29499,"./Script_Extensions/Old_South_Arabian.js":70832,"./Script_Extensions/Old_Turkic.js":86128,"./Script_Extensions/Old_Uyghur.js":10592,"./Script_Extensions/Oriya.js":22744,"./Script_Extensions/Osage.js":78092,"./Script_Extensions/Osmanya.js":89468,"./Script_Extensions/Pahawh_Hmong.js":4940,"./Script_Extensions/Palmyrene.js":73936,"./Script_Extensions/Pau_Cin_Hau.js":54120,"./Script_Extensions/Phags_Pa.js":61744,"./Script_Extensions/Phoenician.js":30288,"./Script_Extensions/Psalter_Pahlavi.js":69525,"./Script_Extensions/Rejang.js":88328,"./Script_Extensions/Runic.js":67216,"./Script_Extensions/Samaritan.js":57444,"./Script_Extensions/Saurashtra.js":43132,"./Script_Extensions/Sharada.js":48856,"./Script_Extensions/Shavian.js":29836,"./Script_Extensions/Siddham.js":46408,"./Script_Extensions/SignWriting.js":48240,"./Script_Extensions/Sinhala.js":96652,"./Script_Extensions/Sogdian.js":75888,"./Script_Extensions/Sora_Sompeng.js":736,"./Script_Extensions/Soyombo.js":81300,"./Script_Extensions/Sundanese.js":46336,"./Script_Extensions/Syloti_Nagri.js":21248,"./Script_Extensions/Syriac.js":82660,"./Script_Extensions/Tagalog.js":83508,"./Script_Extensions/Tagbanwa.js":43332,"./Script_Extensions/Tai_Le.js":95472,"./Script_Extensions/Tai_Tham.js":51060,"./Script_Extensions/Tai_Viet.js":81056,"./Script_Extensions/Takri.js":37256,"./Script_Extensions/Tamil.js":78916,"./Script_Extensions/Tangsa.js":34280,"./Script_Extensions/Tangut.js":60304,"./Script_Extensions/Telugu.js":8272,"./Script_Extensions/Thaana.js":54632,"./Script_Extensions/Thai.js":14948,"./Script_Extensions/Tibetan.js":15296,"./Script_Extensions/Tifinagh.js":45076,"./Script_Extensions/Tirhuta.js":89515,"./Script_Extensions/Toto.js":70304,"./Script_Extensions/Ugaritic.js":28196,"./Script_Extensions/Vai.js":18484,"./Script_Extensions/Vithkuqi.js":59036,"./Script_Extensions/Wancho.js":35320,"./Script_Extensions/Warang_Citi.js":88912,"./Script_Extensions/Yezidi.js":43360,"./Script_Extensions/Yi.js":51160,"./Script_Extensions/Zanabazar_Square.js":15504,"./index.js":19292,"./unicode-version.js":87877};function i(n){var t=s(n);return e(t)}function s(n){if(!e.o(r,n)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return r[n]}i.keys=function(){return Object.keys(r)},i.resolve=s,n.exports=i,i.id=54456}}]);
//# sourceMappingURL=712.3163dd46.chunk.js.map