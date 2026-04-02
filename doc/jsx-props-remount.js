const {createWithRemoteLoader} = remoteLoader;
const {useEffect, useMemo, useState} = React;

const LogNode = ({label}) => {
    useEffect(() => {
        console.log(`[mount] ${label}`);
        return () => {
            console.log(`[unmount] ${label}`);
        };
    }, [label]);

    return <span>{label}</span>;
};

const RemoteContent = createWithRemoteLoader({
    modules: ["components-core:Content"]
})(({remoteModules, titleSlot, list}) => {
    const [Content] = remoteModules;
    return <Content title={titleSlot} list={list}/>;
});

const BaseExample = () => {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTick((current) => current + 1);
        }, 1200);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const stableTitleSlot = useMemo(() => {
        return <LogNode label="stable-title-slot"/>;
    }, []);

    const unstableTitleSlot = <LogNode label={`unstable-title-slot-${tick}`}/>;

    return <div>
        <RemoteContent
            titleSlot={unstableTitleSlot}
            list={[
                {
                    label: "动态 JSX（可能触发异常重建）",
                    content: <LogNode label={`unstable-content-${tick}`}/>
                }
            ]}
        />

        <RemoteContent
            titleSlot={stableTitleSlot}
            list={[
                {
                    label: "稳定 JSX（用于对照）",
                    content: <LogNode label="stable-content"/>
                }
            ]}
        />
    </div>;
};

render(<BaseExample/>);
