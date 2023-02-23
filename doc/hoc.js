const {createWithRemoteLoader, preset} = remoteLoader;
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
