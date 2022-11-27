const { createWithRemoteLoader } = remoteLoader;
const { BrowserRouter } = reactRouter;
const { useState, useEffect } = React;

const BaseExample = createWithRemoteLoader({
  remoteLoader: { remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js" },
  modules: ["Account@OuterContainer", "Account@Login"]
})(({ remoteModules, testProps }) => {
  const [OuterContainer, Login] = remoteModules;
  useEffect(()=>{
    console.log('mount');
  },[]);
  console.log(testProps);
  return <BrowserRouter>
    <OuterContainer>
      <Login />
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
    <BaseExample testProps={value} />
  </div>;
};

render(<Outer />);
