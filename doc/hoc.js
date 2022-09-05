const { createWithRemoteLoader } = remoteLoader;
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
