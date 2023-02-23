const {default: Remote, preset} = remoteLoader;
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
