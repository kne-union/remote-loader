const { default: Remote } = remoteLoader;
const { BrowserRouter } = reactRouter;

const BaseExample = () => {
  return <BrowserRouter>
    <Remote loader={{
      remote: "ui_components",
      url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js",
      module: "Account@OuterContainer"
    }}>
      <Remote loader={{
        remote: "ui_components", url: "http://ued.dev.fatalent.cn/ui_components/remoteEntry.js", module: "Account@Login"
      }} />
    </Remote>
  </BrowserRouter>;
};

render(<BaseExample />);
